import {
  DoorOpen,
  Home,
  Building2,
  Wrench,
  Shield,
  Lock,
  Hammer,
  Package,
  Settings,
  AlertTriangle,
} from "lucide-react";

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  icon: typeof DoorOpen;
  tagline: string;
  description: string;
  bullets: string[];
  intent: "emergency" | "service" | "trust";
  keywords: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "residential-door-installation",
    name: "Residential Door Installation",
    shortName: "Residential",
    icon: Home,
    tagline: "Elevate your home's entry with expert residential door installation in Manhattan and Brooklyn.",
    description:
      "First impressions matter. Our precise residential door installation enhances curb appeal, security, and energy efficiency for your Manhattan or Brooklyn home. We ensure a perfect fit and seamless operation for every entrance.",
    bullets: [
      "Entry & Interior Doors",
      "Patio & French Doors",
      "Energy-Efficient Options",
      "Soundproofing Solutions",
      "Professional, Clean Installation",
    ],
    intent: "service",
    keywords: [
      "residential door installer manhattan",
      "house door installation brooklyn",
      "home entry door service nyc",
      "new door installation manhattan",
      "exterior door replacement brooklyn",
      "local door company nyc",
    ],
  },
  {
    slug: "commercial-door-installation",
    name: "Commercial Door Installation",
    shortName: "Commercial",
    icon: Building2,
    tagline: "Secure and professional commercial door installation for businesses across Manhattan and Brooklyn.",
    description:
      "Protect your business with durable and compliant commercial door installations. We provide robust solutions tailored to the unique demands of your Manhattan or Brooklyn commercial property, ensuring long-term reliability and security.",
    bullets: [
      "Steel & Aluminum Doors",
      "Fire-Rated Commercial Doors",
      "Security Entry Systems",
      "Automatic & ADA Compliant",
      "High-Traffic Durability",
    ],
    intent: "service",
    keywords: [
      "commercial door installer manhattan",
      "business door installation brooklyn",
      "storefront door nyc",
      "office door replacement manhattan",
      "industrial door service brooklyn",
      "commercial entry door nyc",
    ],
  },
  {
    slug: "custom-door-fabrication",
    name: "Custom Door Fabrication",
    shortName: "Custom",
    icon: Settings,
    tagline: "Bespoke door fabrication: unique designs, precise craftsmanship for your distinct vision.",
    description:
      "When off-the-shelf won't do, our custom door fabrication brings your architectural vision to life. We craft unique doors with meticulous attention to detail, perfectly matching your aesthetic and functional requirements.",
    bullets: [
      "Unique Design Consultation",
      "Specialty Wood & Metal Doors",
      "Historic Replication",
      "Oversized & Irregular Shapes",
      "Hand-Finished Details",
    ],
    intent: "service",
    keywords: [
      "custom door maker nyc",
      "bespoke doors manhattan",
      "unique door fabrication brooklyn",
      "architectural doors nyc",
      "custom wood doors manhattan",
      "specialty door design brooklyn",
    ],
  },
  {
    slug: "door-hardware-supply",
    name: "Door Hardware Supply",
    shortName: "Hardware",
    icon: Package,
    tagline: "Premium door hardware supply: trusted brands for security, functionality, and style.",
    description:
      "Complete your door system with our extensive selection of high-quality door hardware. From essential components to advanced security features, we supply durable and stylish hardware for every application.",
    bullets: [
      "Locks & Security Systems",
      "Hinges & Pivots",
      "Closers & Panic Bars",
      "Handles & Knobs",
      "Access Control Hardware",
    ],
    intent: "service",
    keywords: [
      "door hardware supplier nyc",
      "door locks manhattan",
      "commercial door hardware brooklyn",
      "door closer repair nyc",
      "panic bar installation manhattan",
      "door handle replacement brooklyn",
    ],
  },
  {
    slug: "structural-door-repair",
    name: "Structural Door Repair",
    shortName: "Structural",
    icon: Hammer,
    tagline: "Expert structural door repair for lasting stability and renewed security.",
    description:
      "Don't replace, repair! Our structural door repair service addresses underlying issues, restoring integrity and function to damaged doors and frames. We diagnose and fix problems to extend your door's lifespan.",
    bullets: [
      "Frame & Jamb Repair",
      "Rot & Water Damage",
      "Impact Damage Restoration",
      "Re-alignment & Re-squaring",
      "Reinforcement & Strengthening",
    ],
    intent: "service",
    keywords: [
      "structural door repair nyc",
      "door frame repair manhattan",
      "damaged door repair brooklyn",
      "door integrity restoration nyc",
      "door reinforcement manhattan",
      "wood door repair brooklyn",
    ],
  },
  {
    slug: "fire-rated-doors",
    name: "Fire-Rated Doors",
    shortName: "Fire-Rated",
    icon: Shield,
    tagline: "Certified fire-rated door installation and repair for critical safety compliance.",
    description:
      "Ensure occupant safety and meet stringent building codes with our fire-rated door services. We install and repair compliant fire doors, providing essential protection against the spread of fire and smoke.",
    bullets: [
      "Code-Compliant Installation",
      "UL-Rated Doors",
      "Automatic Closing Systems",
      "Smoke & Fire Barriers",
      "Inspection & Maintenance",
    ],
    intent: "service",
    keywords: [
      "fire rated door installation nyc",
      "fire door repair manhattan",
      "commercial fire doors brooklyn",
      "fire safety doors nyc",
      "ul rated door service manhattan",
      "smoke barrier doors brooklyn",
    ],
  },
  {
    slug: "storefront-glass-doors",
    name: "Storefront & Glass Doors",
    shortName: "Storefront",
    icon: DoorOpen,
    tagline: "Modern storefront and glass door solutions to enhance your business appeal.",
    description:
      "Create an inviting and secure entrance with our storefront and glass door services. From sleek modern designs to robust security glass, we elevate your commercial facade in Manhattan and Brooklyn.",
    bullets: [
      "Aluminum Storefront Systems",
      "Tempered Glass Doors",
      "Automatic Sliding Doors",
      "Security Glass Options",
      "Emergency Glass Replacement",
    ],
    intent: "service",
    keywords: [
      "storefront glass door nyc",
      "commercial glass doors manhattan",
      "aluminum storefront brooklyn",
      "glass entrance door nyc",
      "storefront repair manhattan",
      "automatic glass door brooklyn",
    ],
  },
  {
    slug: "emergency-door-repair",
    name: "Emergency Door Repair",
    shortName: "Emergency",
    icon: AlertTriangle,
    tagline: "Rapid 24/7 emergency door repair: securing your property when you need it most.",
    description:
      "Unexpected damage shouldn't compromise your security. Our 24/7 emergency door repair service responds swiftly to secure your property in Manhattan or Brooklyn. We address urgent issues like break-ins or severe damage, based out of our East Village HQ at 99 Loisaida Ave.",
    bullets: [
      "Break-in & Vandalism Repair",
      "Board-Up Services",
      "Urgent Lock & Hinge Repair",
      "Emergency Glass Replacement",
      "Immediate Security Solutions",
    ],
    intent: "emergency",
    keywords: [
      "emergency door repair nyc",
      "24 hour door service manhattan",
      "door break-in repair brooklyn",
      "urgent door repair nyc",
      "after hours door service manhattan",
      "door security emergency brooklyn",
    ],
  },
  {
    slug: "door-frame-jamb-repair",
    name: "Door Frame & Jamb Repair",
    shortName: "Frames",
    icon: Wrench,
    tagline: "Specialized door frame and jamb repair for structural integrity and smooth operation.",
    description:
      "Compromised door frames and jambs undermine security and functionality. We expertly repair or replace damaged frames and jambs, ensuring your door operates correctly and provides optimal protection.",
    bullets: [
      "Wood & Metal Frame Repair",
      "Jamb Replacement",
      "Rot & Water Damage Repair",
      "Strike Plate Reinforcement",
      "Frame Re-alignment",
    ],
    intent: "service",
    keywords: [
      "door frame repair nyc",
      "door jamb replacement manhattan",
      "damaged door frame brooklyn",
      "wood door frame repair nyc",
      "metal door frame service manhattan",
      "door casing repair brooklyn",
    ],
  },
  {
    slug: "security-access-doors",
    name: "Security & Access Doors",
    shortName: "Security",
    icon: Lock,
    tagline: "Advanced security and access doors for ultimate protection and control.",
    description:
      "Upgrade your property's defenses with our high-security and access control door solutions. We provide robust doors integrated with advanced systems to safeguard your assets and control entry.",
    bullets: [
      "High-Security Steel Doors",
      "Access Control Integration",
      "Bullet Resistant Options",
      "Reinforced Locking Systems",
      "Electronic Keypad Entry",
    ],
    intent: "trust",
    keywords: [
      "security door installation nyc",
      "access control doors manhattan",
      "high security doors brooklyn",
      "bulletproof doors nyc",
      "electronic access door manhattan",
      "reinforced entry doors brooklyn",
    ],
  },
];

export const SERVICES_BY_SLUG: Record<string, Service> = Object.fromEntries(
  SERVICES.map((service) => [service.slug, service])
);
