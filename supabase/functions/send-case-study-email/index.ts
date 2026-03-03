import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface EmailRequest {
  name: string;
  email: string;
  caseStudyName: string;
  downloadUrl: string;
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
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY environment variable is not set");
    }

    const emailSubject = `Your ${data.caseStudyName} Case Study Download`;
    const emailHtml = `
      <p>Hi ${data.name},</p>

      <p>Thank you for your interest in our ${data.caseStudyName} case study!</p>

      <p><strong>Click here to download your case study:</strong><br>
      <a href="${data.downloadUrl}" style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 6px; margin: 16px 0;">Download Case Study</a></p>

      <p>This case study shows how we helped Groundtech UK:</p>
      <ul>
        <li>Reduce order processing time from 17 minutes to 4 minutes</li>
        <li>Increase monthly revenue from £90K to £173K</li>
        <li>Achieve 4x capacity increase without hiring</li>
      </ul>

      <p>If you'd like to discuss how we can help your business achieve similar results, feel free to reply to this email or speak to George directly on WhatsApp via our website.</p>

      <p>Best regards,<br>
      George<br>
      ETA Digital<br>
      <a href="mailto:george@etadigital.co.uk">george@etadigital.co.uk</a></p>
    `;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "George from ETA Digital <george@etadigital.co.uk>",
        to: [data.email],
        reply_to: "george@etadigital.co.uk",
        subject: emailSubject,
        html: emailHtml,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error("Resend API error:", errorData);
      throw new Error(`Failed to send email: ${emailResponse.status} - ${errorData}`);
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