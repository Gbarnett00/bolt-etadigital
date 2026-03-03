export interface QuizQuestion {
  id: number;
  category: string;
  categoryId: string;
  question: string;
  description: string;
  answers: {
    value: number;
    label: string;
    description: string;
  }[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    category: "Tool Soup",
    categoryId: "tool-soup",
    question: "To what extent does switching between systems and tools create friction in your business?",
    description: "When work is spread across too many systems",
    answers: [
      { value: 1, label: "Seamless", description: "Our tools feel integrated and easy to move between." },
      { value: 2, label: "Minor Interruptions", description: "Some switching, but it doesn't slow us significantly." },
      { value: 3, label: "Noticeable Friction", description: "Switching tools regularly disrupts focus and flow." },
      { value: 4, label: "Frequent Bottlenecks", description: "Tasks slow down because information is spread across systems." },
      { value: 5, label: "Constant Disruption", description: "System switching causes errors, delays, and wasted time." }
    ]
  },
  {
    id: 2,
    category: "Spreadsheet Glue",
    categoryId: "spreadsheet-glue",
    question: "To what extent do spreadsheets act as core operational systems in your business?",
    description: "For example: tracking orders, projects, reporting, customer data, inventory, workflows.",
    answers: [
      { value: 1, label: "Rarely Used", description: "Spreadsheets are occasional tools, not part of core operations." },
      { value: 2, label: "Supporting Role", description: "We use spreadsheets for some tracking, but structured systems manage key processes." },
      { value: 3, label: "Important Tool", description: "Spreadsheets play a regular role in running parts of the business." },
      { value: 4, label: "Operationally Risky", description: "Key processes rely on spreadsheets being manually updated and error-free." },
      { value: 5, label: "Single Point of Failure", description: "If a spreadsheet breaks, gets corrupted, or isn't updated, operations would stall." }
    ]
  },
  {
    id: 3,
    category: "Key-Person Ops",
    categoryId: "key-person-ops",
    question: "How dependent is your business on a small number of \"indispensable\" people who understand critical processes?",
    description: "When the business runs on a few indispensable people",
    answers: [
      { value: 1, label: "Fully Systemised", description: "Processes are documented and transferable. No single person is critical to daily operations." },
      { value: 2, label: "Mostly Distributed", description: "Knowledge is shared across the team with minor reliance on key individuals." },
      { value: 3, label: "Some Key Dependencies", description: "A few people hold important operational knowledge." },
      { value: 4, label: "High Reliance", description: "Certain team members are essential for processes to function correctly." },
      { value: 5, label: "Operationally Vulnerable", description: "If one or two key people were unavailable, operations would significantly struggle or stall." }
    ]
  },
  {
    id: 4,
    category: "Onboarding Drag",
    categoryId: "onboarding-drag",
    question: "How structured and scalable is your onboarding process for new hires?",
    description: "When new hires can't follow a clear system",
    answers: [
      { value: 1, label: "Fully Systemised", description: "Onboarding is documented, structured, and repeatable. New hires ramp up quickly." },
      { value: 2, label: "Mostly Structured", description: "Clear process in place, with some manual guidance required." },
      { value: 3, label: "Partially Documented", description: "Some materials exist, but much training relies on informal support." },
      { value: 4, label: "Inconsistent & Manual", description: "Training varies depending on who delivers it. Productivity takes time." },
      { value: 5, label: "Ad Hoc & Dependent", description: "There's no structured onboarding. Knowledge transfer is reactive and person-dependent." }
    ]
  },
  {
    id: 5,
    category: "Manual Coordination",
    categoryId: "manual-coordination",
    question: "How often do managers need to chase updates to find out the status of work?",
    description: "When work only moves after someone chases it",
    answers: [
      { value: 1, label: "Rarely Needed", description: "Work progress is visible and tracked clearly in real time." },
      { value: 2, label: "Occasional Check-Ins", description: "Managers check in sometimes, but workflows are mostly transparent." },
      { value: 3, label: "Regular Follow-Ups", description: "Status updates often require direct messages or manual checks." },
      { value: 4, label: "Frequent Chasing", description: "Managers regularly interrupt work to ask for updates." },
      { value: 5, label: "Constant Firefighting", description: "There's little visibility. Work frequently stalls without manual follow-up." }
    ]
  },
  {
    id: 6,
    category: "Ad Hoc Reporting",
    categoryId: "ad-hoc-reporting",
    question: "How streamlined is the process of preparing client or leadership updates?",
    description: "When client updates are manual and painful",
    answers: [
      { value: 1, label: "Automated & Instant", description: "Data is centralised and reports can be generated quickly with minimal manual input." },
      { value: 2, label: "Mostly Efficient", description: "Information is easy to access, with minor manual compiling required." },
      { value: 3, label: "Some Manual Work", description: "Data must be gathered from multiple sources before updates are shared." },
      { value: 4, label: "Time-Consuming", description: "Reports require significant manual pulling, checking, and formatting." },
      { value: 5, label: "Fragmented & Reactive", description: "Information is scattered. Updates are stressful, manual, and prone to error." }
    ]
  },
  {
    id: 7,
    category: "Approval Maze",
    categoryId: "approval-maze",
    question: "How often does work stall while waiting for approvals or sign-offs?",
    description: "When work stalls waiting for the green light",
    answers: [
      { value: 1, label: "Rarely Stalls", description: "Approvals are structured and happen quickly within clear timelines." },
      { value: 2, label: "Minor Delays", description: "Occasional slow responses, but work usually progresses smoothly." },
      { value: 3, label: "Regular Hold-Ups", description: "Approvals sometimes delay projects or tasks." },
      { value: 4, label: "Frequent Bottlenecks", description: "Work often pauses while waiting for decisions or sign-offs." },
      { value: 5, label: "Chronic Gridlock", description: "Approvals regularly stall momentum and impact delivery timelines." }
    ]
  },
  {
    id: 8,
    category: "Blind Spot Ops",
    categoryId: "blind-spot-ops",
    question: "How visible is it to see the real-time status of work without needing to ask someone directly?",
    description: "When you can't see where work is really up to",
    answers: [
      { value: 1, label: "Instantly Visible", description: "Status is clear at a glance through dashboards or tracking systems." },
      { value: 2, label: "Easy to Check", description: "Progress is mostly visible, with occasional clarification needed." },
      { value: 3, label: "Requires Some Checking", description: "You can find the status, but it takes effort across multiple tools." },
      { value: 4, label: "Requires Direct Updates", description: "You often need to message or ask people to understand progress." },
      { value: 5, label: "No Clear Visibility", description: "There's no reliable way to see status without interrupting someone." }
    ]
  },
  {
    id: 9,
    category: "Undefined Ownership",
    categoryId: "undefined-ownership",
    question: "How often do tasks fall through the cracks because ownership of the next step wasn't clearly defined?",
    description: "When no one is automatically told to take the next step",
    answers: [
      { value: 1, label: "Never", description: "Clear ownership is assigned to every task or next step." },
      { value: 2, label: "Rarely", description: "Occasional oversight, but processes usually prevent gaps." },
      { value: 3, label: "Sometimes", description: "Tasks are occasionally missed due to unclear responsibility." },
      { value: 4, label: "Frequently", description: "Work regularly slips because next steps aren't clearly assigned." },
      { value: 5, label: "Constantly", description: "Missed tasks and unclear ownership are an ongoing operational issue." }
    ]
  },
  {
    id: 10,
    category: "Ghost Work",
    categoryId: "ghost-work",
    question: "How often does your team feel stuck in \"invisible work\"—the searching, fixing, and chasing stuff that slows everything down?",
    description: "When invisible busywork drains team capacity",
    answers: [
      { value: 1, label: "Almost none", description: "Our team spends almost all our time on work that directly moves projects forward." },
      { value: 2, label: "A little", description: "Some invisible work happens, but it's usually quick and doesn't get in the way." },
      { value: 3, label: "Moderate", description: "Invisible work takes a noticeable chunk of our day—1–2 hours per person on average." },
      { value: 4, label: "A lot", description: "Much of our time is spent on these hidden tasks, and it often slows us down." },
      { value: 5, label: "Constantly", description: "Invisible work dominates our workflow; we're always chasing, clarifying, or fixing things." }
    ]
  },
  {
    id: 11,
    category: "Version Confusion",
    categoryId: "version-confusion",
    question: "To what extent are there multiple versions of the same process in your organization?",
    description: "When no one knows which process is the right one",
    answers: [
      { value: 1, label: "Not at all", description: "Everyone follows the same process." },
      { value: 2, label: "A little", description: "Only minor differences exist." },
      { value: 3, label: "Somewhat", description: "Some tasks are handled differently by different people." },
      { value: 4, label: "Quite a bit", description: "Many tasks have multiple ways of being done." },
      { value: 5, label: "A great deal", description: "Almost every process has several versions. Things feel inconsistent." }
    ]
  },
  {
    id: 12,
    category: "Policy in Docs, Not Systems",
    categoryId: "policy-in-docs",
    question: "How much do your key processes rely on systems versus people remembering to follow them?",
    description: "When processes are written down but not enforced",
    answers: [
      { value: 1, label: "Almost entirely system-driven", description: "Processes are enforced by tools or automation—people rarely have to remember." },
      { value: 2, label: "Mostly system-driven", description: "Most steps are built into tools, with minor reliance on people." },
      { value: 3, label: "Balanced", description: "Some processes are system-enforced, others depend on people remembering." },
      { value: 4, label: "Mostly people-driven", description: "Processes largely rely on individuals to remember steps." },
      { value: 5, label: "Almost entirely people-driven", description: "Everything depends on people remembering—very little is systemized." }
    ]
  },
  {
    id: 13,
    category: "Firefighting-First Culture",
    categoryId: "firefighting-culture",
    question: "To what extent does your time go toward fixing today's problems versus improving systems for the future?",
    description: "When fixing today's problems leaves no time to fix the system",
    answers: [
      { value: 1, label: "Almost entirely improving systems", description: "Nearly all our time is spent on building better processes." },
      { value: 2, label: "Mostly improving systems", description: "Most of our time goes to improvements, with some firefighting." },
      { value: 3, label: "About half and half", description: "Our time is split fairly evenly between fixing problems and improving systems." },
      { value: 4, label: "Mostly fixing problems", description: "We spend most of our time reacting to immediate issues." },
      { value: 5, label: "Almost entirely fixing problems", description: "Nearly all our time is spent putting out fires, with almost no improvement work." }
    ]
  },
  {
    id: 14,
    category: "Change Shock",
    categoryId: "change-shock",
    question: "How difficult do you feel it is to implement even small changes to your processes?",
    description: "When even small changes are hard to implement",
    answers: [
      { value: 1, label: "Not at all difficult", description: "Small changes are quick and simple to make." },
      { value: 2, label: "Slightly difficult", description: "Minor changes take some effort, but are manageable." },
      { value: 3, label: "Moderately difficult", description: "Small changes require noticeable effort and coordination." },
      { value: 4, label: "Quite difficult", description: "Even minor updates involve significant work or approvals." },
      { value: 5, label: "Extremely difficult", description: "Small changes are very hard or nearly impossible to implement." }
    ]
  }
];

export interface CategoryScore {
  categoryId: string;
  category: string;
  score: number;
  maxScore: 5;
}

export interface QuizResult {
  overallScore: number;
  maxScore: 70;
  categoryScores: CategoryScore[];
  topThreeWeaknesses: CategoryScore[];
  recommendations: Record<string, string>;
}

export const categoryRecommendations: Record<string, string> = {
  "tool-soup": "Your team is losing significant time switching between systems. Consider implementing a unified workflow platform or consolidating tools. Start by mapping where data currently lives and identifying where it can be collated.",
  "spreadsheet-glue": "Spreadsheets are slowing you down. Evaluate purpose-built tools for your core operations (project management, inventory, CRM). Even a simple database would reduce errors and improve visibility.",
  "key-person-ops": "Your business is too dependent on a few people. Document critical processes immediately, then systemise them. This is your highest leverage improvement - it unlocks scaling and reduces risk.",
  "onboarding-drag": "New hires take too long to become independent. Create a single source of truth for each process, then enforce it with tools. This reduces reliance on senior staff and improves consistency.",
  "manual-coordination": "Managers are spending their time chasing work instead of improving it. Implement workflow automation or clearer ownership rules so work moves without constant nudging.",
  "ad-hoc-reporting": "Reporting is burning payroll. Automate status updates with dashboards or integrated reporting. This frees senior staff and gives you real-time visibility.",
  "approval-maze": "Approvals are bottlenecking progress. Define clear approval rules and automate them where possible. Reduce the number of approval steps and empower teams to own decisions.",
  "blind-spot-ops": "You lack visibility into real progress. Implement a system where status is visible without asking. This is foundational for everything else - you can't improve what you can't see.",
  "undefined-ownership": "Work is getting missed because task ownership is unclear. Define explicit ownership rules and enforce them with workflows. Clear ownership prevents blame and excuses.",
  "ghost-work": "Invisible work is draining capacity. Audit where time actually goes (Tool Soup, Ghost Work, Manual Coordination). Fix the top friction points to reclaim 10-20% of capacity.",
  "version-confusion": "Multiple process versions create confusion and rework. Establish a single source of truth for each process and collate in a single location.",
  "policy-in-docs": "Written policies aren't being followed. Stop relying on documentation alone - enforce policies with systems and workflows. Rules in tools beat rules in documents.",
  "firefighting-culture": "You're stuck in reactive mode. Dedicate time to fixing systems, not just symptoms. Start with your highest-impact inefficiency and systematise it. This will free up more time to work on the rest.",
  "change-shock": "Changes are hard to implement. This usually stems from unclear ownership, multiple tool versions, or weak enforcement. Fix the underlying systems first, then changes become easier to enforce."
};
