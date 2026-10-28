import type { Faq } from "./services";

export const home = {
  seo: {
    title: "AI & Custom Software Development Company | Bizpedia Tech",
    description:
      "Explore AI automation, machine learning, custom software, SaaS and web development services built around your business goals.",
  },
  hero: {
    lead: "We build AI-powered solutions, custom software and intelligent automation that turn business ideas into real results.",
    primary: "Discuss Your Project",
    secondary: "Explore Our Services",
  },
  about: {
    title: "Technology Built Around Your Business",
    text: "Every business works differently. We design and develop digital solutions around your goals, people and processes—whether you want to automate repetitive work, replace disconnected systems or launch a new product. We start by understanding the problem, then build technology that fits.",
    button: "Learn About Bizpedia Tech",
  },
  process: {
    title: "From Idea to Impact",
    text: "Good technology starts with a clear understanding of what you want to achieve. Our process takes your idea from an early conversation to a practical solution your team can use.",
    steps: [
      { title: "Discover Your Goals", text: "We learn about your business, users, challenges and priorities." },
      { title: "Design the Solution", text: "We map the experience, technical approach and integrations." },
      { title: "Build & Integrate", text: "We develop the product in stages and connect the systems it needs." },
      { title: "Test & Improve", text: "We check quality, usability, performance and reliability." },
      { title: "Launch & Grow", text: "We deploy your solution and plan improvements as your needs evolve." },
    ],
    button: "See How We Work",
  },
  services: {
    title: "AI, Automation & Software Solutions Built for Your Business",
    text: "From everyday automation to intelligent applications and custom software, we help you work smarter, save time and create long-term value.",
    button: "Explore All Services",
  },
  industries: {
    title: "Technology That Works for Your Industry",
    text: "Different industries face different challenges. We build solutions around the way your organization works, with careful attention to its users, data and operational needs.",
    list: [
      "Financial Services",
      "Healthcare Administration",
      "Education",
      "Retail & E-commerce",
      "Real Estate",
      "Logistics",
      "Professional Services",
      "Emerging Technology",
    ],
    button: "Explore Industries",
  },
  work: {
    title: "Real Problems. Intelligent Solutions.",
    text: "Explore practical demonstrations of how software, AI and automation can improve business processes. These are illustrative demonstrations, not claims of completed client deployments.",
    items: [
      { id: "documents", title: "Document Processing Demo", text: "See how invoices or business documents can be read, checked and prepared for review." },
      { id: "knowledge", title: "AI Knowledge Assistant Demo", text: "Explore how teams can ask questions about approved company documents and review supporting sources." },
      { id: "leads", title: "Lead Workflow Automation Demo", text: "See how enquiries can be captured, organized and routed for timely follow-up." },
    ],
    button: "Explore Our Demonstrations",
  },
  why: {
    title: "More Than a Development Partner",
    text: "We combine business understanding, thoughtful design and practical engineering to build solutions that are useful today and easier to improve tomorrow.",
    items: [
      { title: "Business-focused", text: "Solutions shaped around your needs, not generic templates." },
      { title: "End-to-end development", text: "From discovery and design to development and deployment." },
      { title: "Practical AI", text: "Technology chosen for real use cases, not hype." },
      { title: "Clear collaboration", text: "Defined milestones, reviews and communication." },
      { title: "Built to evolve", text: "Maintainable software with optional ongoing support." },
    ],
  },
  cta: {
    title: "Have a Business Challenge Worth Solving?",
    text: "Tell us what you want to build, improve or automate. We will help you explore a practical way forward.",
    primary: "Start a Conversation",
    secondary: "Explore Our Capabilities",
  },
};

export const about = {
  seo: {
    title: "About Bizpedia Tech | AI & Software Development Company",
    description:
      "Learn about Bizpedia Tech and our approach to AI, automation, custom software and practical digital product development.",
  },
  h1: "Technology Built for Real Business Needs",
  paragraphs: [
    "Bizpedia Tech Private Limited is a technology solutions company focused on artificial intelligence, intelligent automation, custom software and digital product development. We help businesses turn ideas and operational challenges into practical technology solutions.",
    "Our work brings together business understanding, product design, software engineering and data science. We believe the best solution is not always the most complex one—it is the one that solves the right problem and can be maintained over time.",
  ],
  mission: "To help businesses turn ideas and challenges into useful, scalable digital solutions.",
  vision: "To become a trusted technology partner for organizations building smarter products and more efficient operations.",
  valuesTitle: "What Guides Our Work",
  values: [
    { title: "Business First", text: "We begin with the problem and the people who will use the solution." },
    { title: "Practical Innovation", text: "We choose technology for the value it can create." },
    { title: "Clear Collaboration", text: "We value transparency, defined expectations and regular feedback." },
    { title: "Responsible AI", text: "We consider data privacy, reliability, security and human oversight." },
    { title: "Long-Term Thinking", text: "We aim for software that is maintainable and able to improve over time." },
  ],
  finalCta: "Work With Bizpedia Tech",
};

export const howWeWork = {
  seo: {
    title: "Our Software & AI Development Process | Bizpedia Tech",
    description:
      "Explore our step-by-step process from discovery and design to development, testing, deployment and support.",
  },
  h1: "A Clear Process From Your Idea to a Working Solution",
  intro:
    "Good software starts with good questions. We work collaboratively to understand your goals, define what needs to be built and move through development with clear milestones and regular reviews.",
  steps: [
    { n: "01", title: "Discover", text: "We understand your goals, users, existing processes, challenges and constraints." },
    { n: "02", title: "Plan", text: "We define the project scope, priorities, timeline, responsibilities and success criteria." },
    { n: "03", title: "Design", text: "We create user journeys, interfaces, architecture and integration plans." },
    { n: "04", title: "Develop", text: "We build the solution in manageable stages and review progress with you." },
    { n: "05", title: "Test", text: "We validate functionality, usability, performance and relevant security requirements." },
    { n: "06", title: "Deploy", text: "We prepare the production environment, launch the solution and provide appropriate handover." },
    { n: "07", title: "Improve", text: "We can support updates, maintenance and enhancements under agreed arrangements." },
  ],
  closing: {
    title: "Built Around Your Project",
    text: "The exact delivery approach depends on the size, complexity and requirements of your project. We agree on the scope and working model before development begins.",
  },
  finalCta: "Tell Us What You Want to Build",
};

export const industries = {
  seo: {
    title: "Industry AI, Automation & Software Solutions | Bizpedia Tech",
    description:
      "Explore business software, AI and automation applications across finance, healthcare administration, education, retail and more.",
  },
  h1: "Technology That Works for Your Industry",
  intro:
    "Every industry has its own workflows, customers and operating challenges. We build technology around those differences rather than forcing the same solution everywhere.",
  items: [
    { id: "financial-services", title: "Financial Services", text: "Explore document workflows, reporting, internal knowledge tools and operational software with suitable privacy and security controls." },
    { id: "healthcare-administration", title: "Healthcare Administration", text: "Support scheduling, records workflows, administrative reporting and information access with care for sensitive data." },
    { id: "education", title: "Education", text: "Develop student portals, learning administration tools, knowledge assistants and operational applications." },
    { id: "retail-ecommerce", title: "Retail & E-commerce", text: "Connect online sales, inventory, customer communication, reporting and demand planning." },
    { id: "real-estate", title: "Real Estate", text: "Support property listings, enquiries, client follow-ups, portals and internal operations." },
    { id: "logistics-operations", title: "Logistics & Operations", text: "Improve status tracking, document handling, reporting and coordination across teams." },
    { id: "professional-services", title: "Professional Services", text: "Build client portals, document workflows, knowledge tools and business management applications." },
    { id: "startups-emerging-technology", title: "Startups & Emerging Technology", text: "Plan MVPs, launch digital platforms and evolve products as customers and requirements grow." },
  ],
  closing: {
    title: "Solutions Designed Around Your Requirements",
    text: "Industry examples describe possible applications, not prebuilt products or completed customer deployments. Every project starts with understanding the actual need.",
  },
  finalCta: "Discuss Your Industry Challenge",
};

export const ourWork = {
  seo: {
    title: "AI, Software & Automation Demonstrations | Bizpedia Tech",
    description:
      "Explore reference demonstrations of document processing, AI knowledge assistants and business workflow automation.",
  },
  h1: "Real Problems. Intelligent Solutions.",
  intro:
    "See how AI, software and automation can come together in practical business workflows. The examples below are reference demonstrations designed to show what may be possible for a tailored project.",
  demos: [
    { id: "document-intelligence", title: "Document Intelligence", lead: "Turn document information into structured data.", text: "A sample invoice is uploaded, important details are extracted, uncertain fields are flagged and results are prepared for review or export." },
    { id: "knowledge-assistant", title: "Enterprise Knowledge Assistant", lead: "Find useful answers across approved documents.", text: "A user asks a question, the assistant searches sample company knowledge and provides an answer with supporting passages for verification." },
    { id: "lead-management", title: "AI Lead Management Workflow", lead: "Organize enquiries and support faster follow-up.", text: "A new enquiry is captured, important details are identified and the next action is suggested or routed to a team member." },
  ],
  closing: {
    title: "Looking for Something Similar?",
    text: "Tell us about the problem you want to solve. We can explore how a related approach might fit your data, systems and workflow.",
  },
  finalCta: "Discuss a Similar Solution",
};

export const engagement = {
  seo: {
    title: "Software Development Engagement Models | Bizpedia Tech",
    description:
      "Choose a project model for fixed-scope delivery, prototypes, dedicated development or ongoing maintenance.",
  },
  h1: "Flexible Ways to Build Your Next Technology Project",
  intro:
    "Some projects have clear requirements from day one. Others need exploration and iteration. We help define a working arrangement based on your goals, scope and level of ongoing support.",
  models: [
    { title: "Fixed-Scope Development", text: "A defined project with agreed deliverables, milestones and acceptance criteria." },
    { title: "Discovery & Prototype", text: "An initial engagement to clarify requirements, test feasibility or plan an MVP." },
    { title: "Dedicated Development Team", text: "Ongoing development support for a product with changing priorities and a regular backlog." },
    { title: "Maintenance & Enhancements", text: "Continued bug fixes, updates, monitoring and new features under an agreed support arrangement." },
  ],
  closing: {
    title: "Clear Expectations From the Start",
    text: "Project timelines, pricing, deliverables, ownership, responsibilities and support terms are discussed and confirmed for each engagement.",
  },
  finalCta: "Find the Right Engagement Model",
};

export const contact = {
  seo: {
    title: "Contact Bizpedia Tech | Start Your Software or AI Project",
    description:
      "Tell Bizpedia Tech about your AI, automation, software or SaaS project and explore the next steps.",
  },
  h1: "Have a Business Challenge Worth Solving?",
  intro:
    "Whether you need custom software, an AI application, a SaaS product or a workflow that runs more smoothly, we would like to understand your goals. Share a few details and let us explore the right next step.",
  formTitle: "Tell Us About Your Project",
  helper:
    "Briefly describe what you want to build, improve or automate. Please do not submit confidential or sensitive information through this form.",
  submit: "Send Project Enquiry",
  confirmation:
    "Thank you for reaching out. Your enquiry has been submitted. Our team will review the details and respond through the contact information you provided.",
  detailsTitle: "Contact Details",
};

export const faq: { seo: { title: string; description: string }; items: Faq[] } = {
  seo: {
    title: "Frequently Asked Questions | Bizpedia Tech",
    description:
      "Answers about AI development, custom software, SaaS products, workflow automation, integrations and project delivery.",
  },
  items: [
    { q: "What does Bizpedia Tech do?", a: "We design and develop AI applications, business automation workflows, custom software, SaaS products, websites, mobile apps and data solutions." },
    { q: "Can you automate processes in our existing business?", a: "We can assess your workflow and the systems you use, then recommend suitable automation and integration options." },
    { q: "Do we need AI or regular software?", a: "It depends on the problem. We recommend AI only where it adds useful capabilities; many business needs are best solved with reliable software and simple automation." },
    { q: "What is the difference between custom software and SaaS development?", a: "Custom software typically solves a specific organization’s needs. SaaS development focuses on building a product intended to serve multiple customers, often through subscriptions." },
    { q: "Can you build an MVP from an idea?", a: "Yes. We can help define the essential features and develop an initial version to test with users." },
    { q: "Can you connect with our current software?", a: "Integration depends on the APIs, permissions, data formats and technical limits of your existing systems." },
    { q: "How long does a project take?", a: "Timelines depend on scope, complexity, integrations and the review process. We discuss estimates after understanding the requirements." },
    { q: "Do you provide support after launch?", a: "Maintenance and enhancements can be arranged under agreed support terms." },
    { q: "How do we get started?", a: "Share your goals and a short description of the challenge through our contact form. We can then discuss possible next steps." },
  ],
};

export const insights = {
  seo: {
    title: "Insights on AI, Software & Automation | Bizpedia Tech",
    description:
      "Practical articles on AI adoption, workflow automation, SaaS development, business software and analytics.",
  },
  h1: "Practical Insights for Smarter Digital Decisions",
  intro:
    "Explore ideas, guides and explanations that help businesses understand technology choices and plan better digital projects.",
  categories: [
    "AI for Business",
    "Automation & Workflows",
    "Custom Software",
    "SaaS & Startups",
    "Data & Analytics",
    "Website & App Development",
  ],
  cta: "Discuss a Project",
};
