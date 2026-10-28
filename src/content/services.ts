export type ServiceSlug =
  | "ai-automation"
  | "ai-machine-learning"
  | "custom-software-development"
  | "saas-product-development"
  | "web-mobile-development"
  | "data-analytics-business-intelligence"
  | "ai-video-creative";

export type Faq = { q: string; a: string };
export type Offering = { title: string; text: string };

export type Service = {
  slug: ServiceSlug;
  /** Name used in navigation and the services dropdown */
  name: string;
  /** Shorter name used in the footer */
  footerName: string;
  /** Homepage summary card copy (where provided) */
  summary: string;
  seo: { title: string; description: string };
  h1: string;
  intro: string;
  button?: string;
  offeringsTitle: string;
  offerings: Offering[];
  /** Offerings presented as a plain list (AI Video) */
  offeringsAsList?: boolean;
  approach: { title: string; text: string };
  extra?: { title: string; text: string };
  faqs: Faq[];
  finalCta: string;
  accent: string;
};

export const services: Service[] = [
  {
    slug: "ai-automation",
    name: "AI Automation & Workflows",
    footerName: "AI Automation & Workflows",
    summary:
      "Automate repetitive tasks, customer enquiries, follow-ups and connected business processes using AI assistants and workflow tools.",
    seo: {
      title: "AI Automation & Workflow Automation Services | Bizpedia Tech",
      description:
        "Automate enquiries, follow-ups, approvals and repetitive processes with AI agents, chatbots and connected business workflows.",
    },
    h1: "Automate Repetitive Work. Keep Your Business Moving.",
    intro:
      "Your team should spend less time copying information, chasing updates and answering the same questions. Bizpedia Tech builds AI automation and workflow solutions that connect the tools you use and help everyday work move faster—with people in control when decisions need review.",
    button: "Discuss an Automation Project",
    offeringsTitle: "What We Can Automate",
    offerings: [
      { title: "Customer Enquiries & Chatbots", text: "Respond to common questions, collect details and route complex requests to the right person." },
      { title: "WhatsApp Business Workflows", text: "Support enquiry handling, notifications, follow-ups and approved customer communication." },
      { title: "Lead Capture & Follow-ups", text: "Capture new leads, organize information, update your CRM and trigger the next step." },
      { title: "Document & Approval Workflows", text: "Move information from invoices, forms and other documents into review and approval processes." },
      { title: "Internal Operations", text: "Connect routine tasks across your business applications, from status updates to notifications." },
      { title: "AI Agents with Human Oversight", text: "Use AI to interpret requests and recommend or perform approved actions, with escalation where needed." },
    ],
    approach: {
      title: "How It Works",
      text: "We map your existing process, identify repetitive steps, check what your systems can connect to, build the workflow and test it using realistic cases. Where an action is sensitive or uncertain, we include human review.",
    },
    extra: {
      title: "Why It Matters",
      text: "Less manual work, more consistent follow-ups, fewer missed handoffs and clearer visibility into your operations. The right automation depends on your existing tools and business rules.",
    },
    faqs: [
      { q: "Does every workflow need artificial intelligence?", a: "No. Some tasks are better handled with simple rules and integrations. We use AI where understanding language or unstructured information adds value." },
      { q: "Can you connect automation with our existing CRM?", a: "Often, yes. We first assess available APIs, access permissions and technical limitations." },
      { q: "Will our team remain in control?", a: "We can design approval steps, exception handling and human handoff for workflows that require oversight." },
    ],
    finalCta: "Find Your Automation Opportunities",
    accent: "#3b82f6",
  },
  {
    slug: "ai-machine-learning",
    name: "AI & Machine Learning Solutions",
    footerName: "AI & Machine Learning",
    summary:
      "Build applications that understand information, analyze data, make predictions and support smarter decisions.",
    seo: {
      title: "AI Development & Machine Learning Services | Bizpedia Tech",
      description:
        "Build generative AI applications, knowledge assistants, document intelligence and predictive analytics solutions for your business.",
    },
    h1: "Build AI That Solves Real Business Problems",
    intro:
      "Artificial intelligence is most valuable when it helps people complete a real task. We design AI and machine learning solutions that make information easier to use, reveal useful patterns and support better decisions—based on your data, systems and goals.",
    button: "Explore an AI Use Case",
    offeringsTitle: "Our AI Development Services",
    offerings: [
      { title: "Generative AI Applications", text: "Create applications that help users search, summarize, draft and work with business information." },
      { title: "Company Knowledge Assistants", text: "Help teams find answers in approved documents, with source references and access controls where appropriate." },
      { title: "Intelligent Document Processing", text: "Extract information from invoices, forms and reports, then flag uncertain results for review." },
      { title: "Predictive Analytics & Machine Learning", text: "Develop forecasting, classification, anomaly detection and recommendation models where the data supports them." },
      { title: "AI Agents & Business Integrations", text: "Connect AI capabilities to approved tools and workflows, with clear boundaries and human oversight." },
      { title: "AI Consulting & Prototyping", text: "Assess use cases, test feasibility, compare technical approaches and plan a responsible rollout." },
    ],
    approach: {
      title: "Our Approach to Responsible AI",
      text: "We begin with the business question, review data quality and privacy needs, choose appropriate models, test outputs and failure cases, and plan monitoring after deployment. We do not treat AI-generated answers as automatically correct.",
    },
    faqs: [
      { q: "Do we need a large dataset to get started?", a: "Not always. Requirements depend on the use case. Some applications use existing AI models with company information; others require suitable training data." },
      { q: "Can AI work with our existing applications?", a: "Potentially. We assess the APIs, permissions, security and reliability requirements before proposing an integration." },
    ],
    finalCta: "Discuss Your AI Project",
    accent: "#6366f1",
  },
  {
    slug: "custom-software-development",
    name: "Custom Software Development",
    footerName: "Custom Software",
    summary:
      "Create software tailored to your business, including CRM, ERP-style tools, dashboards and internal systems.",
    seo: {
      title: "Custom Software Development Company | Bizpedia Tech",
      description:
        "Build tailored CRM, ERP-style systems, business dashboards, internal tools and integrated enterprise applications.",
    },
    h1: "Software Built Around the Way Your Business Works",
    intro:
      "When spreadsheets, disconnected tools and manual processes slow your team down, custom software can bring everything together. We build applications around your actual workflows instead of asking your business to fit a generic product.",
    button: "Discuss Your Software Requirements",
    offeringsTitle: "What We Develop",
    offerings: [
      { title: "Business Management Systems", text: "Bring key operations, records and everyday tasks into one connected application." },
      { title: "CRM & Customer Portals", text: "Manage enquiries, customers, communication and self-service experiences." },
      { title: "ERP-Style & Operations Software", text: "Connect inventory, orders, billing, people and operational processes where required." },
      { title: "Dashboards & Internal Tools", text: "Give teams a clearer view of work, reports and business performance." },
      { title: "APIs & System Integrations", text: "Help existing applications share data and work together." },
      { title: "Modernization & Enhancements", text: "Improve an existing application’s usability, architecture, performance or features." },
    ],
    approach: {
      title: "Built for Your Team, Not a Template",
      text: "We understand your users and requirements, define the scope, design the interface, build in stages, test carefully and prepare the application for launch. The result is software intended to be practical, maintainable and ready to evolve.",
    },
    faqs: [
      { q: "How is custom software different from SaaS?", a: "Custom software is usually built around one organization’s specific needs. SaaS product development typically focuses on a product intended for multiple customers. A solution can be both custom-built and SaaS." },
      { q: "Can you replace spreadsheets with an application?", a: "We can assess your current process and determine whether a tailored application would make it more reliable and easier to manage." },
    ],
    finalCta: "Plan Your Custom Software",
    accent: "#0ea5e9",
  },
  {
    slug: "saas-product-development",
    name: "SaaS & Product Development",
    footerName: "SaaS & Product Development",
    summary:
      "Turn a product idea into a working platform, from an early MVP to a product designed to grow.",
    seo: {
      title: "SaaS & MVP Product Development Services | Bizpedia Tech",
      description:
        "Turn your software idea into an MVP or SaaS product with product planning, UX design, development and cloud deployment.",
    },
    h1: "Turn Your Software Idea Into a Product People Can Use",
    intro:
      "Have an idea for a digital platform? We help founders and businesses turn concepts into working products—from defining the first features to developing a scalable SaaS application and improving it based on real feedback.",
    button: "Build Your Product",
    offeringsTitle: "From Idea to Launch",
    offerings: [
      { title: "Product Discovery", text: "Clarify your users, the problem, the key features and what success should look like." },
      { title: "MVP Development", text: "Build a focused first version so you can test the idea without unnecessary complexity." },
      { title: "SaaS Platform Engineering", text: "Develop account management, user roles, subscriptions, dashboards and other product capabilities." },
      { title: "Product Design & User Experience", text: "Create intuitive journeys, interfaces and reusable design components." },
      { title: "Integrations & Cloud Deployment", text: "Connect required services and prepare the product for reliable releases." },
      { title: "Product Improvements", text: "Use feedback and product usage to prioritize enhancements and support growth." },
    ],
    approach: {
      title: "Start Focused. Build for Growth.",
      text: "We recommend beginning with the features that matter most. As you learn what users need, the product can evolve with clearer priorities and better-informed investment decisions.",
    },
    faqs: [
      { q: "What is an MVP?", a: "A minimum viable product is an early usable version focused on the most important features needed to test an idea with real users." },
      { q: "Can you help with an existing SaaS product?", a: "Yes. We can review the product, understand its technical challenges and plan new features or improvements." },
    ],
    finalCta: "Discuss Your SaaS Idea",
    accent: "#8b5cf6",
  },
  {
    slug: "web-mobile-development",
    name: "Website & Mobile App Development",
    footerName: "Website & Mobile Apps",
    summary:
      "Build modern websites, customer portals, e-commerce experiences and mobile apps that are easy to use.",
    seo: {
      title: "Website & Mobile App Development Services | Bizpedia Tech",
      description:
        "Create business websites, web applications, customer portals and Android or iOS apps built for usability and performance.",
    },
    h1: "Digital Experiences That Look Great and Work Better",
    intro:
      "Your website or app is often the first experience customers have with your business. We create clear, modern digital experiences that make it easier for people to find information, use your services and take action.",
    button: "Plan Your Website or App",
    offeringsTitle: "What We Build",
    offerings: [
      { title: "Business & Corporate Websites", text: "Present your company, services and value clearly with responsive, search-friendly pages." },
      { title: "Web Applications & Portals", text: "Build secure customer, employee or partner experiences connected to your business systems." },
      { title: "E-commerce Experiences", text: "Create online shopping and order experiences suited to your products and processes." },
      { title: "Mobile Applications", text: "Develop Android, iOS or cross-platform applications for customers and internal teams." },
      { title: "UI/UX Design", text: "Design user journeys, wireframes, prototypes and interfaces that are easy to understand." },
      { title: "Website & App Improvements", text: "Refresh existing experiences and improve usability, performance and maintainability." },
    ],
    approach: {
      title: "Designed for People. Engineered for Performance.",
      text: "We combine thoughtful design with reliable engineering, responsive layouts, accessibility considerations, testing and an appropriate content or application architecture.",
    },
    faqs: [
      { q: "Will my website work on mobile?", a: "Responsive layouts are part of our website development approach, with testing across relevant screen sizes." },
      { q: "Can you develop both a website and a mobile app?", a: "Yes. We can plan connected experiences where a business needs both." },
    ],
    finalCta: "Start Your Digital Project",
    accent: "#06b6d4",
  },
  {
    slug: "data-analytics-business-intelligence",
    name: "Data Analytics & Business Intelligence",
    footerName: "Data Analytics & Business Intelligence",
    summary:
      "Connect your data, track business performance and make decisions with clear reports, dashboards and forecasts.",
    seo: {
      title: "Data Analytics & Business Intelligence Services | Bizpedia Tech",
      description:
        "Connect data, build BI dashboards, automate reporting and explore forecasting to support better business decisions.",
    },
    h1: "Turn Business Data Into Decisions You Can Act On",
    intro:
      "Business data is useful when people can understand and trust it. We help connect information from different systems, organize it into clear reports and build analytics tools that make performance easier to track.",
    button: "Discuss Your Data Project",
    offeringsTitle: "Our Data Services",
    offerings: [
      { title: "Data Integration & Pipelines", text: "Bring information from multiple systems into a more consistent and usable flow." },
      { title: "Dashboards & Reporting", text: "Track the numbers that matter with visual dashboards and automated reports." },
      { title: "Business Performance Analytics", text: "Understand sales, operations, customers and other business activity." },
      { title: "Forecasting & Predictive Analytics", text: "Explore future trends and likely outcomes where the data supports meaningful models." },
      { title: "Data Quality & Preparation", text: "Identify missing, inconsistent or duplicated information before analysis." },
      { title: "Decision-Support Applications", text: "Bring useful analytics directly into the tools your team uses." },
    ],
    approach: {
      title: "Clear Data. Useful Insights.",
      text: "We start with the questions your team needs answered, review the available data, select suitable methods and present findings in a form that supports practical action.",
    },
    faqs: [
      { q: "Can you combine data from different software systems?", a: "Often, yes. We assess available exports, APIs, data formats and access requirements." },
      { q: "Can you predict our future sales?", a: "Forecasting may be possible when suitable historical data exists. We evaluate model quality and explain uncertainty rather than promise exact predictions." },
    ],
    finalCta: "Make Better Use of Your Data",
    accent: "#2563eb",
  },
  {
    slug: "ai-video-creative",
    name: "AI Video & Creative Technology",
    footerName: "AI Video & Creative Technology",
    summary: "",
    seo: {
      title: "AI Video & Creative Content Services | Bizpedia Tech",
      description:
        "Explore AI-assisted explainer videos, product demos, brand videos, avatars and multilingual creative content.",
    },
    h1: "Bring Your Ideas to Life With AI-Assisted Content",
    intro:
      "Explain a product, introduce your brand or communicate a message with engaging digital content. We combine creative planning with suitable AI tools to produce visuals and videos aligned with your audience and brand.",
    offeringsTitle: "What We Create",
    offeringsAsList: true,
    offerings: [
      { title: "Product demonstrations and explainer videos", text: "" },
      { title: "Company introductions and promotional videos", text: "" },
      { title: "AI avatars and virtual presenters", text: "" },
      { title: "Voiceovers and multilingual adaptations", text: "" },
      { title: "Social media visuals and campaign assets", text: "" },
      { title: "Product imagery and creative variations", text: "" },
    ],
    approach: {
      title: "From Brief to Final Content",
      text: "We clarify your message, audience, style and distribution needs, develop a creative direction, prepare content for review and refine it for the intended channel.",
    },
    faqs: [],
    finalCta: "Discuss Your Creative Project",
    accent: "#a855f7",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const homeServices = services.filter((s) => s.summary);
