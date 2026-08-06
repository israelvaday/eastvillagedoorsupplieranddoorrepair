export type FAQ = { q: string; a: string };

export type FAQSection = {
  id: string;
  title: string;
  emoji: string;
  description: string;
  items: FAQ[];
};

export const FAQ_HERO_IMAGE = "/photos/branding-generated--hero-east-village-door-nyc.png";
export const FAQ_HERO_ALT =
  "East Village Door Supplier technician installing a premium entry door in a Manhattan walk-up";

export const FAQ_SECTIONS: FAQSection[] = [
  {
    id: "pricing",
    title: "Pricing & Estimates",
    emoji: "💰",
    description: "Understand our transparent pricing structure and how to get an accurate estimate for your door projects.",
    items: [
      {
        q: "How do you determine the cost of door installation in NYC?",
        a: "The cost of door installation in NYC depends on several factors, including the type of door (e.g., commercial, residential, fire-rated), material, hardware, and complexity of the installation. We offer competitive pricing for all our door services in Manhattan and Brooklyn, ensuring value for your investment.",
      },
      {
        q: "Do you offer free estimates for door repair in the East Village?",
        a: "Yes, we provide free, no-obligation estimates for all door repair and installation services, including those in the East Village. Contact us to schedule a visit, and our experts will assess your needs and provide a detailed quote.",
      },
      {
        q: "Are there different price points for residential versus commercial door replacements?",
        a: "Generally, commercial door replacements can have different price points due to varying security requirements, material durability, and compliance with specific building codes. Residential door replacements, while also diverse, often focus on aesthetics and home security. We cater to both with tailored solutions.",
      },
      {
        q: "What factors might increase the final cost of a door project?",
        a: "Factors that might increase the final cost include custom door sizes, specialized hardware (e.g., high-security locks, access control systems), extensive frame repairs, or the need for expedited service. We always discuss any potential additional costs upfront during the estimation process.",
      },
    ],
  },
  {
    id: "process",
    title: "Our Service Process",
    emoji: "🛠️",
    description: "Learn about our efficient and professional process for door repair and installation services.",
    items: [
      {
        q: "What is the typical timeline for a door installation project?",
        a: "The timeline for a door installation project can vary based on the door type and complexity. Standard residential door installations might take a few hours, while commercial or custom projects could span a day or more. We strive for efficient service with minimal disruption to your daily operations.",
      },
      {
        q: "How quickly can you respond to an emergency door repair in Manhattan?",
        a: "We understand the urgency of emergency door repairs in Manhattan and aim to respond as quickly as possible. Our team is often able to provide same-day service for critical issues to secure your property. Contact us immediately for emergency assistance.",
      },
      {
        q: "What steps are involved in your door repair service?",
        a: "Our door repair service typically involves an initial assessment of the damage, diagnosis of the issue, and then the necessary repairs using quality parts and techniques. We ensure your door is fully functional and secure before completing the job. We specialize in East Village door repair.",
      },
      {
        q: "Do I need to be present during the door installation or repair?",
        a: "While it's not always strictly necessary for you to be present for the entire duration, we do recommend being available at the beginning for consultation and at the end for final inspection and payment. For commercial projects, a designated contact person is usually sufficient.",
      },
    ],
  },
  {
    id: "products",
    title: "Our Door Products",
    emoji: "🚪",
    description: "Explore the diverse range of high-quality doors we supply and install for various needs.",
    items: [
      {
        q: "What types of doors do you supply and install for businesses in Brooklyn?",
        a: "For businesses in Brooklyn, we supply and install a wide variety of doors, including commercial storefront doors, heavy-duty steel doors, fire-rated doors, and access control system compatible doors. We ensure compliance with all local regulations and security requirements.",
      },
      {
        q: "Can you install fire-rated doors in Manhattan properties?",
        a: "Absolutely, we are experts in installing fire-rated doors in Manhattan properties, ensuring they meet all safety codes and regulations. These doors are crucial for fire containment and occupant safety, and we offer various ratings to suit your specific building requirements.",
      },
      {
        q: "Do you offer custom door solutions for unique architectural designs?",
        a: "Yes, we pride ourselves on offering custom door solutions to match unique architectural designs or specific aesthetic preferences. Whether it's an unusual size, material, or finish, we can work with you to create and install the perfect custom door.",
      },
      {
        q: "What kind of hardware options are available for your doors?",
        a: "We offer a comprehensive range of hardware options, including high-security locks, panic bars, closers, hinges, and access control systems. Our selection ensures both functionality and aesthetics, providing durable and reliable components for every door we install.",
      },
    ],
  },
  {
    id: "preparation",
    title: "Preparation & Maintenance",
    emoji: "🧼",
    description: "Find out how to prepare for your door service and maintain your doors for longevity.",
    items: [
      {
        q: "How should I prepare my property for a new door installation?",
        a: "To prepare for a new door installation, please clear the area around the old door, both inside and out, to allow our technicians ample working space. Remove any wall hangings or furniture that might be in the way. We will handle the removal of the old door.",
      },
      {
        q: "What maintenance is recommended for commercial doors in NYC?",
        a: "For commercial doors in NYC, regular maintenance is key to longevity and security. This includes routine lubrication of moving parts, checking for loose hardware, and ensuring proper alignment. We can also provide scheduled maintenance services to keep your doors in optimal condition.",
      },
      {
        q: "Can you advise on the best way to secure my existing residential door?",
        a: "To best secure your existing residential door, consider upgrading to high-quality deadbolts, reinforcing the door frame, and installing a wide-angle peephole. We can assess your current setup and recommend specific enhancements to improve your home's security.",
      },
      {
        q: "Do you offer ongoing service contracts for businesses in Manhattan?",
        a: "Yes, we offer ongoing service contracts for businesses in Manhattan and Brooklyn. These contracts typically include preventative maintenance, priority scheduling for repairs, and discounts on parts and labor, ensuring your commercial doors remain reliable and secure.",
      },
    ],
  },
  {
    id: "nyc-buildings",
    title: "NYC Building Codes & Compliance",
    emoji: "🏛️",
    description: "Understand our expertise in navigating and adhering to New York City's strict building codes.",
    items: [
      {
        q: "Are your door installations compliant with NYC building codes?",
        a: "All our door installations, especially for commercial properties and multi-family dwellings, are fully compliant with NYC building codes. We stay up-to-date with the latest regulations to ensure every project meets the required safety and structural standards.",
      },
      {
        q: "Do you handle permits for commercial door replacements in NYC?",
        a: "While property owners are ultimately responsible for securing necessary permits, we can guide you through the process and provide all required documentation for commercial door replacements in NYC. Our experience helps streamline the permit application process.",
      },
      {
        q: "What are the specific requirements for fire-rated doors in NYC buildings?",
        a: "Specific requirements for fire-rated doors in NYC buildings include particular fire-resistance ratings (e.g., 20-minute, 90-minute), self-closing mechanisms, and positive latching hardware. We ensure all components and installation methods adhere strictly to these critical safety standards.",
      },
      {
        q: "How do you ensure ADA compliance for commercial door installations?",
        a: "We ensure ADA compliance for commercial door installations by adhering to specific guidelines regarding door width, opening force, hardware height, and clear floor space. Our team is knowledgeable about these requirements to provide accessible and compliant entryways.",
      },
    ],
  },
];
