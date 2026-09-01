import type { BlogPost } from "./blogPosts";

export const realWorldAutomationPosts: BlogPost[] = [
  {
    slug: "ai-will-not-stay-inside-the-screen",
    title: "AI will not stay inside the screen: the move from digital workflows to real-world automation",
    excerpt:
      "AI is already moving beyond chat, documents and dashboards. The next stage is connecting intelligent workflows to drones, rovers, robots, sensors and real-world systems while keeping humans in control.",
    category: "Real-World Automation",
    published: "29 September 2026",
    readTime: "",
    sections: [
      {
        paragraphs: [
          "AI is often discussed as something that sits inside a screen: a chat interface, a document assistant, a dashboard or a workflow tool.",
          "That is only the beginning. As AI systems become more capable, they will increasingly connect to the physical world through drones, rovers, robots, sensors, cameras and automated equipment.",
        ],
      },
      {
        heading: "Digital workflows are the control layer",
        paragraphs: [
          "Before machines move safely in the real world, the workflow around them needs to be designed. What is the task? What data is needed? What are the boundaries? What should the system do automatically, and when should it stop and ask for human approval?",
          "This is why the digital workflow matters. The interface, logs, permissions, alerts and approval points become the control layer for physical automation.",
        ],
      },
      {
        heading: "Drones, rovers and robots extend human reach",
        paragraphs: [
          "Drones can inspect assets, record progress, survey difficult locations and help teams understand what is happening without putting people in unnecessary danger.",
          "Rovers and robotic systems can enter spaces that are repetitive, awkward, hazardous or hard to access. Humanoids and hybrid machines may eventually support tasks that need more flexible movement, but they will still need clear instructions, safe boundaries and human supervision.",
        ],
      },
      {
        heading: "The aim is not to remove the human",
        paragraphs: [
          "The most useful real-world automation will not simply push people out of the process. It will move people into safer and more strategic positions.",
          "Humans can monitor the workflow, review exceptions, approve important actions, set constraints and take control when judgement is required. Automation becomes a way to extend human capability, not erase human responsibility.",
        ],
      },
      {
        heading: "InnoWeb’s role in this shift",
        paragraphs: [
          "For InnoWeb, the opportunity is to design the systems that sit between people, AI and machines. That means dashboards, agentic workflows, alerts, model routing, operational logs, safety boundaries and human approval points.",
          "AI will not stay inside the screen. The businesses that prepare for that shift will need practical systems that make real-world automation visible, controlled and useful.",
        ],
      },
    ],
  },
  {
    slug: "the-future-is-human-centred-automation",
    title: "The future is human-centred automation, not humans replaced by machines",
    excerpt:
      "The most important future for AI and robotics is not a world where humans disappear from work. It is a world where intelligent systems give people more leverage, better control and safer ways to operate.",
    category: "Human-Centred Automation",
    published: "1 October 2026",
    readTime: "",
    sections: [
      {
        paragraphs: [
          "The strongest story about AI is not that machines replace humans. The stronger story is that humans gain leverage when intelligent systems are designed around them.",
          "That leverage can be digital: faster research, clearer reporting, better decision support, automated checks and more capable workflows. It can also become physical: drones, rovers, robots, sensors and machines extending what people can safely see, inspect and manage.",
        ],
      },
      {
        heading: "From hands-on labour to human-led control",
        paragraphs: [
          "Many real-world tasks involve risk, repetition or limited visibility. People work in dangerous environments, inspect difficult locations, travel to collect information, or spend time coordinating work that could be prepared more intelligently.",
          "Human-centred automation changes the position of the person. Instead of being exposed to every task directly, the human can supervise the system, monitor the evidence, approve actions and intervene when judgement matters.",
        ],
      },
      {
        heading: "Control panels will matter",
        paragraphs: [
          "As automation grows, the interface becomes critical. A control panel is not just a screen. It is where the human understands what the system is doing, what it has already done, what needs attention and where decisions must be made.",
          "The better the control layer, the safer and more trusted the automation becomes. Poor automation hides activity. Good automation makes the flow visible.",
        ],
      },
      {
        heading: "AI coordinates, humans decide",
        paragraphs: [
          "AI can help coordinate tasks, process data, route work, recommend next steps and direct specialist tools. Robotics can extend that into the physical world. But not every decision should be hidden inside the machine.",
          "Humans still bring responsibility, values, judgement, domain experience and accountability. The future will depend on systems that respect that role rather than pretending it no longer matters.",
        ],
      },
      {
        heading: "The InnoWeb view",
        paragraphs: [
          "InnoWeb’s view is that the future of automation should remain human-centred. The point is not to build technology that makes people irrelevant. The point is to build systems that make people more capable, better informed and safer.",
          "The next period of technological progress will be shaped by humans who know how to direct intelligent systems. AI and machines will provide leverage. People will still provide purpose, control and responsibility.",
        ],
      },
    ],
  },
];

export function getRealWorldAutomationPost(slug: string) {
  return realWorldAutomationPosts.find((post) => post.slug === slug);
}
