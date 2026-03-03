import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const NOTIFICATION_EMAIL = "george@etadigital.co.uk";
const WEB3FORMS_KEY = "24027b81-14cf-4f0e-a91b-11285cca82d7";

interface EmailRequest {
  name: string;
  email: string;
  company?: string;
  message?: string;
  budget?: string;
  submissionType: "lead_magnet" | "contact_form" | "case_study" | "automation_challenge";
  caseStudyName?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const data: EmailRequest = await req.json();

    let emailSubject = "";
    let emailMessage = "";

    if (data.submissionType === "lead_magnet") {
      emailSubject = `New Lead Magnet Download from ${data.name}`;
      emailMessage = `
New Lead Magnet Download

Name: ${data.name}
Email: ${data.email}
${data.company ? `Company: ${data.company}` : ""}
Time: ${new Date().toLocaleString("en-GB", { timeZone: "Europe/London" })}
      `.trim();
    } else if (data.submissionType === "case_study") {
      emailSubject = `New Case Study Download: ${data.caseStudyName || "Unknown"}`;
      emailMessage = `
New Case Study Download

Case Study: ${data.caseStudyName || "Unknown"}
Name: ${data.name}
Email: ${data.email}
${data.company ? `Company: ${data.company}` : ""}
Time: ${new Date().toLocaleString("en-GB", { timeZone: "Europe/London" })}
      `.trim();
    } else if (data.submissionType === "automation_challenge") {
      emailSubject = `New Automation Challenge Signup from ${data.company}`;
      emailMessage = `
New Automation Challenge Signup

Company: ${data.company}
Email: ${data.email}
Time: ${new Date().toLocaleString("en-GB", { timeZone: "Europe/London" })}
      `.trim();
    } else {
      emailSubject = `New Contact Form Submission from ${data.name}`;
      emailMessage = `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
${data.company ? `Company: ${data.company}` : ""}
${data.message ? `\nMessage:\n${data.message}` : ""}
${data.budget ? `\nBudget: ${data.budget}` : ""}

Time: ${new Date().toLocaleString("en-GB", { timeZone: "Europe/London" })}
      `.trim();
    }

    const formData = new FormData();
    formData.append("access_key", WEB3FORMS_KEY);
    formData.append("subject", emailSubject);
    formData.append("from_name", "ETA Digital Website");
    formData.append("email", NOTIFICATION_EMAIL);
    formData.append("message", emailMessage);
    formData.append("replyto", data.email);

    const emailResponse = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error("Web3Forms API error:", errorData);
      throw new Error(`Failed to send email: ${emailResponse.status}`);
    }

    const result = await emailResponse.json();

    return new Response(
      JSON.stringify({ success: true, result }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});