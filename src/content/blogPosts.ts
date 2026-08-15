export type BlogSection = {
  heading?: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  published: string;
  readTime: string;
  featured?: boolean;
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "useful-ai-starts-with-the-workflow",
    title: "Useful AI starts with the workflow, not the model",
    excerpt:
      "The strongest AI systems are not built by choosing the biggest model first. They start by understanding the work, the people involved and the decisions that matter.",
    category: "Agentic AI",
    published: "15 August 2026",
    readTime: "5 min read",
    featured: true,
    sections: [
      {
        paragraphs: [
          "AI projects often begin with the wrong question: which model should we use? The more useful question is usually: what work are we trying to improve?",
          "At InnoWeb Ventures, we see the model as one component inside a wider operational system. The real value comes from connecting planning, specialist agents, business rules, data, tools, approvals and a clear user interface around a defined workflow.",
        ],
      },
      {
        heading: "Start with the work",
        paragraphs: [
          "A good workflow has a clear objective, identifiable inputs and outputs, and points where human judgement still matters. Mapping those elements first makes it much easier to decide what should be automated, what should be assisted and what should remain firmly under human control.",
          "This approach also avoids a common problem with generic AI tools: they can be impressive in isolation but disconnected from the way an organisation actually operates.",
        ],
      },
      {
        heading: "Use different intelligence for different tasks",
        paragraphs: [
          "Not every stage needs the same model. A focused local language model may be entirely suitable for extraction, classification, formatting or a repeatable specialist task. A larger proprietary model can then be reserved for the reasoning steps where its additional capability creates genuine value.",
          "That hybrid approach can improve privacy, reduce latency and control token spend without sacrificing capability where it is genuinely needed.",
        ],
      },
      {
        heading: "Make the agentic flow visible",
        paragraphs: [
          "Automation should not mean hiding the process from the user. A well-designed agentic system should make important actions understandable: what the system is doing, what stage it has reached, where an exception has occurred and where approval is required.",
          "The interface can stay simple while the orchestration behind it remains sophisticated. That is an important distinction. Complexity belongs in the system architecture, not in the user's day-to-day experience.",
        ],
      },
      {
        heading: "Measure quality and cost together",
        paragraphs: [
          "AI usage has an operating cost, so token consumption and model calls should be treated like any other resource. Measuring them against the quality and value of the outcome makes it possible to refine routing, prompts, context and model choice over time.",
          "The aim is not simply to minimise tokens. It is to use the right amount of intelligence for the value of the task.",
        ],
      },
      {
        heading: "One workflow is enough to start",
        paragraphs: [
          "Organisations do not need to transform everything at once. A focused workflow is often the best place to begin: something repetitive, costly, slow, fragmented or dependent on information moving between people and systems.",
          "Build that well, observe how it performs and improve it with real operating evidence. From there, automation can expand naturally rather than becoming another disconnected technology initiative.",
        ],
      },
    ],
  },
  {
    slug: "why-smaller-ai-models-may-matter-more-than-people-think",
    title: "Why smaller AI models may matter more than people think",
    excerpt:
      "Smaller models are not just cheaper substitutes for larger ones. Used well, they can make AI systems faster, more private, easier to control and better aligned to specific workflows.",
    category: "Model Strategy",
    published: "18 August 2026",
    readTime: "6 min read",
    sections: [
      {
        paragraphs: [
          "The current AI conversation often treats model size as a direct measure of capability. Bigger is assumed to be better. In some cases that is true, especially for broad reasoning, unfamiliar tasks and complex synthesis.",
          "But useful business systems are not made from broad capability alone. They are made from reliable steps. Many of those steps do not need the largest model available. They need consistency, speed, privacy, structure and predictable cost.",
        ],
      },
      {
        heading: "Capability should match the task",
        paragraphs: [
          "A specialist workflow contains different kinds of work. Some stages involve reading, classifying, extracting, formatting or checking against a known rule. Others involve judgement, prioritisation or open-ended reasoning. Treating all of those stages as if they require the same model is inefficient.",
          "A smaller model can be very effective when the task is narrow and the context is well prepared. The quality of the surrounding system matters: the prompt, the data, the validation logic, the user interface and the points where a human checks the result.",
        ],
      },
      {
        heading: "Local deployment changes the conversation",
        paragraphs: [
          "Smaller models also open the door to local deployment. For some organisations, that matters because of confidentiality, GDPR, client data, latency or the need to keep sensitive information away from external services.",
          "Local AI is not the right answer for every task. But it becomes very useful when a workflow involves repeatable steps, private data and a clear boundary around what the system is expected to do.",
        ],
      },
      {
        heading: "The future is likely to be hybrid",
        paragraphs: [
          "The point is not that smaller models replace larger ones. The stronger view is that they sit beside them. A good agentic system may use several kinds of intelligence, each chosen for a particular role.",
          "That is where smaller models may matter more than people think. They make AI less like a single expensive brain and more like an engineered system: targeted, measurable, private where needed and efficient by design.",
        ],
      },
    ],
  },
  {
    slug: "agentic-ai-is-not-a-chatbot",
    title: "Agentic AI is not a chatbot: what businesses should actually automate",
    excerpt:
      "A chatbot answers questions. An agentic system moves work forward. The difference matters when businesses are deciding what AI should actually do.",
    category: "Agentic AI",
    published: "20 August 2026",
    readTime: "6 min read",
    sections: [
      {
        paragraphs: [
          "Many organisations first experience AI through a chat window. That is understandable. Chat is familiar, flexible and easy to demonstrate. But it can also create a narrow view of what AI is for.",
          "A chatbot answers. An agentic system acts within a designed workflow. It can plan steps, use tools, prepare information, route work, flag exceptions and ask for approval when human judgement is required.",
        ],
      },
      {
        heading: "The problem with chat-only thinking",
        paragraphs: [
          "Chat is useful when the user knows what to ask and has time to interpret the response. Many business workflows are different. The user may not need another answer. They may need a task moved forward correctly, with the right checks and the right record of what happened.",
          "That is where agentic design becomes more useful. Instead of asking a human to repeatedly prompt the system, the workflow itself can guide the process.",
        ],
      },
      {
        heading: "Automate the movement of work",
        paragraphs: [
          "The best automation candidates are often not dramatic. They are the repeated handovers, checks, summaries, classifications, reconciliations, document preparations and decision-support steps that consume time across an organisation.",
          "Those steps may not remove the need for people. They can reduce the effort required for people to reach a good decision. The system prepares, validates and organises; the human remains responsible for the judgement.",
        ],
      },
      {
        heading: "Keep approvals visible",
        paragraphs: [
          "Agentic AI should not quietly make important decisions in the background. A well-designed system shows what has happened, what evidence was used, where uncertainty exists and what needs approval.",
          "The question for businesses is not whether they need a chatbot. The better question is: which workflow would benefit from intelligent preparation, structured automation and human oversight?",
        ],
      },
    ],
  },
  {
    slug: "when-should-a-business-run-ai-locally",
    title: "When should a business run AI locally instead of in the cloud?",
    excerpt:
      "Cloud AI is powerful and convenient, but local AI can make sense where privacy, cost, latency and control matter. The right answer is often a hybrid architecture.",
    category: "Private AI",
    published: "25 August 2026",
    readTime: "6 min read",
    sections: [
      {
        paragraphs: [
          "Cloud AI has made advanced language models easy to access. Businesses can test ideas quickly, use powerful reasoning capability and avoid managing specialist infrastructure from day one.",
          "But cloud is not always the only answer. Some workflows involve sensitive information, repeated tasks, cost constraints or latency requirements that make local AI worth considering.",
        ],
      },
      {
        heading: "Privacy is the first reason to consider local AI",
        paragraphs: [
          "Where a workflow touches confidential commercial information, client data, personal data or regulated material, organisations often become more cautious about where data travels.",
          "Running a model locally, on an organisational server or dedicated AI PC, can reduce exposure and make the data boundary easier to explain. It does not remove the need for governance, but it can simplify part of the risk conversation.",
        ],
      },
      {
        heading: "Local AI can suit repeatable specialist tasks",
        paragraphs: [
          "Not every AI task needs the broadest possible model. If a process involves repeatable extraction, classification, checking or formatting, a smaller local model may be good enough when the surrounding workflow is well designed.",
          "The key is to measure performance against the actual task. A local model does not need to be generally impressive. It needs to be reliable for the stage of work it has been given.",
        ],
      },
      {
        heading: "The right answer is often hybrid",
        paragraphs: [
          "Larger proprietary models remain useful for complex reasoning, unfamiliar problems and richer synthesis. Local models can handle focused or sensitive steps. The stronger architecture is often the one that uses both deliberately.",
          "The important decision is not ideological. It is architectural: which data can leave the organisation, which steps need the strongest reasoning and where should the user approve the result?",
        ],
      },
    ],
  },
  {
    slug: "the-hidden-cost-of-ai-token-usage",
    title: "The hidden cost of AI: why token usage should be designed into the workflow",
    excerpt:
      "AI cost is not only about the price of a model. It is about how often the system calls it, how much context it sends and whether the output justifies the spend.",
    category: "AI Cost",
    published: "27 August 2026",
    readTime: "6 min read",
    sections: [
      {
        paragraphs: [
          "AI cost is often discussed too late. A prototype works, the output looks useful, and only later does the organisation ask what it will cost to run at scale.",
          "That is the wrong order. Token usage, model calls and routing decisions should be designed into the workflow from the beginning.",
        ],
      },
      {
        heading: "Tokens are part of the operating model",
        paragraphs: [
          "Every model call consumes input and output tokens. The cost of one call may look small, but business systems rarely run once. They run repeatedly, across users, documents, customers, records and exceptions.",
          "When the workflow grows, small inefficiencies can become meaningful. Sending unnecessary context, using a large model for a simple task or repeating calls because the process is poorly structured all add cost.",
        ],
      },
      {
        heading: "Bigger models should earn their place",
        paragraphs: [
          "Large models are powerful, but that does not mean they should be used for every step. A workflow may only need advanced reasoning at specific points.",
          "Other stages may be better handled by rules, retrieval, deterministic code, smaller models or local models. The system should reserve expensive intelligence for the moments where it changes the quality of the outcome.",
        ],
      },
      {
        heading: "Cost control is part of trust",
        paragraphs: [
          "The aim is not simply to reduce token usage. Cheap output that is unreliable is not efficient. The better measure is value per task: did the model call improve speed, quality, accuracy, consistency or decision-making enough to justify the cost?",
          "Designing token usage into the workflow helps AI become an operational capability rather than a novelty. It makes the system measurable, governable and easier to improve.",
        ],
      },
    ],
  },
  {
    slug: "why-ai-projects-fail-when-they-start-with-technology",
    title: "Why AI projects fail when they start with technology instead of the process",
    excerpt:
      "Many AI projects fail because they begin with a tool and then search for a use case. Sustainable value usually comes from starting with the process first.",
    category: "Implementation",
    published: "1 September 2026",
    readTime: "6 min read",
    sections: [
      {
        paragraphs: [
          "AI projects often begin with enthusiasm for a new tool. A model is selected, a demo is built and the organisation looks for somewhere to apply it.",
          "That can produce impressive moments, but it often fails to create lasting value. The reason is simple: technology that is not tied to a real process struggles to become part of everyday work.",
        ],
      },
      {
        heading: "A process has constraints that a demo does not",
        paragraphs: [
          "Real workflows include messy inputs, exceptions, approvals, incomplete data, different users and organisational rules. A generic AI demo rarely reflects all of that.",
          "When a project begins with technology, those constraints are discovered late. The result is often rework, reduced trust or a system that looks impressive but sits outside the actual way people operate.",
        ],
      },
      {
        heading: "Start with the operational pain",
        paragraphs: [
          "A better starting point is the work itself. Where is time being lost? What is being checked repeatedly? Which decisions need better preparation? Where are people copying information between systems? Where do exceptions slow everything down?",
          "Those questions reveal the shape of the system. They also make it easier to measure whether AI is helping.",
        ],
      },
      {
        heading: "The best AI projects become part of operations",
        paragraphs: [
          "Starting with the process does not mean ignoring the technology. Model choice, architecture, data access, security, monitoring and integration all matter. But those decisions should serve the workflow.",
          "When AI starts with the process, it has a much better chance of becoming a useful operational system rather than another technology experiment.",
        ],
      },
    ],
  },
  {
    slug: "human-in-the-loop-is-good-system-design",
    title: "Human-in-the-loop is not a weakness — it is good system design",
    excerpt:
      "Keeping people involved in AI workflows is not a failure of automation. It is often what makes the system trustworthy, useful and operationally safe.",
    category: "Governance",
    published: "3 September 2026",
    readTime: "6 min read",
    sections: [
      {
        paragraphs: [
          "Human-in-the-loop is sometimes described as if it is a temporary limitation. The assumption is that once AI becomes powerful enough, the person can be removed.",
          "That view misses the point. In many business workflows, human involvement is not a weakness. It is part of the control system.",
        ],
      },
      {
        heading: "Not every decision should be automated",
        paragraphs: [
          "Some tasks are suitable for full automation. Others involve judgement, responsibility, commercial risk, safety, compliance or client trust. In those cases, the system should support the human decision rather than quietly replace it.",
          "A good AI workflow can prepare evidence, summarise options, highlight risks, check consistency and recommend next steps. The person still owns the decision.",
        ],
      },
      {
        heading: "Approval points create trust",
        paragraphs: [
          "Trust is easier to build when users can see where the system stops and asks. Approval points make the workflow understandable. They show that the system has boundaries.",
          "That is especially important when AI is introduced into organisations that are cautious, regulated or operationally complex. People need to know what the system is allowed to do and what remains under human control.",
        ],
      },
      {
        heading: "Good automation keeps people responsible",
        paragraphs: [
          "Human review is not only a safeguard. It is a source of learning. When users approve, amend or reject outputs, the organisation gains useful evidence about where the workflow works and where it needs improvement.",
          "That is why human-in-the-loop is good system design. It allows AI to move work forward while preserving judgement, accountability and trust.",
        ],
      },
    ],
  },
  {
    slug: "what-we-are-learning-from-specialist-ai-systems",
    title: "What we are learning from building specialist AI systems for real workflows",
    excerpt:
      "The most useful AI lessons come from building around real tasks. Specialist systems reveal what matters: workflow design, visibility, cost, integration and human control.",
    category: "InnoWeb Lab",
    published: "8 September 2026",
    readTime: "6 min read",
    sections: [
      {
        paragraphs: [
          "Building specialist AI systems teaches different lessons from experimenting with general chat tools. The moment AI is placed inside a real workflow, the important questions change.",
          "It is no longer only about whether the model can produce a good answer. It is about whether the system helps people move work forward reliably, visibly and at a cost that makes sense.",
        ],
      },
      {
        heading: "The workflow defines the system",
        paragraphs: [
          "The first lesson is that the workflow matters more than the model. A specialist system needs to understand the task sequence: what starts the work, what information is needed, what checks are required, where exceptions appear and who approves the outcome.",
          "Once that shape is clear, the AI components can be placed carefully. Without that shape, the system risks becoming another generic assistant.",
        ],
      },
      {
        heading: "Users need visibility, not complexity",
        paragraphs: [
          "Agentic systems can be complex behind the scenes. They may involve planning, tool use, model routing, data retrieval, validation and human approval.",
          "The user does not need to manage all of that manually. But they do need to see enough to trust the process: what the system has done, what it is doing now, what changed and where it needs help.",
        ],
      },
      {
        heading: "Specialist systems improve through use",
        paragraphs: [
          "Many useful AI systems are not standalone. They sit between documents, spreadsheets, databases, emails, portals, operational systems and people. The value often comes from connecting those pieces.",
          "That is why we see specialist AI as an iterative operating capability. Start with one workflow, make it visible, measure the outcome and then improve it with evidence.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
