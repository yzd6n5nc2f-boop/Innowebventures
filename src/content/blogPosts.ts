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
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
