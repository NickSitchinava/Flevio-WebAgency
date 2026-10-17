import type { Locale } from "./config";

export interface PricingCalculatorDictionary {
  heading: string;
  headingLead: string;
  headingFocus: string;
  toolLabel: string;
  subhead: string;
  placeholder: string;
  navigation: { back: string; next: string; viewEstimate: string; review: string };
  steps: {
    projectType: {
      title: string;
      options: Record<"landing" | "website" | "portfolio", { label: string }>;
    };
    size: {
      title: string;
      options: {
        landing: Record<"short" | "standard" | "long", { label: string; description: string }>;
        website: Record<"small" | "medium" | "large", { label: string; description: string }>;
        portfolio: Record<"small" | "medium" | "large", { label: string; description: string }>;
      };
    };
    creativity: {
      title: string;
      options: Record<"standard" | "enhanced" | "creative", { label: string; description: string }>;
    };
    timeline: {
      title: string;
      options: Record<"flexible" | "asap", { label: string }>;
    };
    seo: {
      title: string;
      yes: string;
      no: string;
      yesDescription: string;
      noDescription: string;
    };
    content: {
      title: string;
      options: Record<"client" | "assistance", string>;
    };
  };
  result: {
    timeLabel: string;
    priceLabel: string;
    startingAt: string;
    earlyTimeLabel: string;
    earlyPriceLabel: string;
    weeksUnit: string;
    loadingRate: string;
    ctaButton: string;
  };
}

export interface ServiceItem {
  slug: string;
  title: string;
  description: string;
  details: string;
  features: string[];
}

export interface FooterDictionary {
  giantText: string;
  heading: string;
  marquee: string[];
  primaryCta: string;
  secondaryCta: string;
  nav: {
    about: string;
    services: string;
    projects: string;
    contact: string;
  };
  legal: {
    privacy: string;
    terms: string;
  };
  crafted: string;
  rights: string;
  backToTop: string;
}

export interface ContactChannel {
  label: string;
  value: string;
  href: string;
}

export interface ContactDictionary {
  heading: string;
  text: string;
  whatsappAction: string;
  trust: { brief: string; reply: string };
  process: { label: string; stages: [string, string, string] };
  channels: {
    email: ContactChannel;
    whatsapp: ContactChannel;
    instagram: ContactChannel;
  };
}

export interface ProjectsDeliveryLink {
  title: string;
  description: string;
  region: string;
  duration?: string;
  href?: string;
  previewSrc: string;
  heroSrc: string;
  detailSrc?: string;
  private?: boolean;
}

export interface ProjectsDictionary {
  heading: string;
  intro: string;
  scopeLine: string;
  wheelLabel: string;
  browseHint: string;
  viewProjectLabel: string;
  problemStatement: string;
  problemAttribution: string;
  showreelLabel: string;
  showreelTitle: string;
  showreelDescription: string;
  indexHeading: string;
  indexIntro: string;
  privateLabel: string;
  deliveryLinks: ProjectsDeliveryLink[];
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
    ogDescription: string;
    keywords: string[];
  };
   header: {
    about: string;
    services: string;
    projects: string;
    contact: string;
    estimateCost: string;
    cta: string;
    menuLabel: string;
  };
  hero: {
  ariaLabel: string;
  eyebrow: string;
  headlinePrefix: string;
  headlineEmphasis: string;
  headlineLines: string[];
  subhead: string;
  chips: string[];
  primaryCta: string;
  secondaryCta: string;
  desktopHeadlineLines: [string, string, string];
  desktopSubhead: { before: string; audience: string; after: string };
  desktopPrimaryCta: string;
  desktopSecondaryCta: string;
  desktopCapability: string;
  ctaReassurance: string;
};
  services: {
    heading: string;
    cta: string;
    items: ServiceItem[];
  };
  serviceDetail: {
    backLabel: string;
    featuresHeading: string;
    ctaHeading: string;
    ctaText: string;
    ctaButton: string;
  };
  projects: ProjectsDictionary;
  pricingCalculator: PricingCalculatorDictionary;
  contact: ContactDictionary;
  footer: FooterDictionary;
}

export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    meta: {
      title: "Flevio | Web Design & Development Agency in Tbilisi, Georgia",
      description:
        "Flevio designs and builds custom websites, landing pages, and web applications for businesses in Tbilisi, Georgia and worldwide. Fast, SEO-friendly, built to convert.",
      ogDescription:
        "Flevio — custom websites, landing pages, and web applications, designed and built in Tbilisi, Georgia for clients worldwide.",
      keywords: [
        "Flevio",
        "web design agency Tbilisi",
        "website development Georgia",
        "Tbilisi web developer",
        "custom website design",
        "landing page design services",
        "web development agency",
        "small business website design",
        "web app development",
        "responsive website design",
        "Next.js development agency",
        "Nick Sitchinava",
      ],
    },
     header: {
      about: "About",
      services: "Services",
      projects: "Projects",
      contact: "Contact",
      estimateCost: "Estimate Cost",
      cta: "Start a Project",
      menuLabel: "Menu",
    },
    hero: {
      ariaLabel: "Introduction",
      eyebrow: "Web Design & Development Agency",
      headlinePrefix: "We build ",
      headlineEmphasis: "websites that convert",
      headlineLines: ["We build", "websites that", "convert"],
      subhead:
        "Custom website design, landing pages, and web app development for startups and growing businesses.",
      chips: ["Website Design", "Landing Pages", "Web Applications"],
      primaryCta: "View Our Work",
      secondaryCta: "Start a Project",
      desktopHeadlineLines: ["We build", "Websites", "That convert"],
      desktopSubhead: {
        before: "We build custom websites for ",
        audience: "Service Businesses",
        after: ", designed to earn trust and turn attention into inquiries.",
      },
      desktopPrimaryCta: "Contact Us",
      desktopSecondaryCta: "View Our Work",
      desktopCapability: "Custom design · Hand-coded development",
      ctaReassurance: "A rough idea is enough to start.",
    },
    services: {
      heading: "Services",
      cta: "Start a Project",
      items: [
        {
          slug: "website-development",
          title: "Website Development",
          description: "Custom-built websites, designed and coded from scratch.",
          details:
            "We design and hand-code every site to fit your business, no page builders, no bloated templates. Every layout, animation, and line of code exists for a reason: to load fast, look sharp, and turn visitors into calls.",
          features: [
            "Custom design, no templates",
            "Hand-written, maintainable code",
            "Optimized for speed and SEO from day one",
          ],
        },
        {
          slug: "landing-pages",
          title: "Landing Pages",
          description: "High-converting landing pages built for speed and clarity.",
          details:
            "A landing page has one job: convert. We strip away distractions and structure every section around a single, clear action, so visitors know exactly what to do next.",
          features: [
            "Focused, single-goal layouts",
            "Built for A/B testing",
            "Mobile-first, fast-loading design",
          ],
        },
        {
          slug: "seo-optimization",
          title: "SEO Optimization",
          description: "Clean, search-friendly code structured to rank well.",
          details:
            "Good SEO starts in the code, not after launch. We build every site with semantic markup, structured data, and performance baked in, so search engines and visitors both find what they need.",
          features: [
            "Semantic, accessible markup",
            "Structured data and schema.org",
            "Core Web Vitals optimization",
          ],
        },
      ],
    },
    serviceDetail: {
      backLabel: "Back to Services",
      featuresHeading: "What's included",
      ctaHeading: "Ready to start?",
      ctaText: "Tell us about your project and we'll get back to you with next steps.",
      ctaButton: "Start a Project",
    },
    projects: {
      heading: "Work shaped around the business.",
      intro:
        "Visual craft earns attention. Clear structure, purposeful interactions, and hand-coded performance turn that attention into action.",
      scopeLine: "Web design · development · digital experiences",
      wheelLabel: "Website Design Showcase",
      browseHint: "Scroll to move through the work",
      viewProjectLabel: "Visit site",
      problemStatement:
        "We design and develop custom, conversion-focused websites—distinctive, fast, and built for business growth.",
      problemAttribution: "Web design · Web development · Strategy",
      showreelLabel: "Showreel",
      showreelTitle: "Flevio in motion",
      showreelDescription: "A compact reel of our visual and interaction work.",
      indexHeading: "Explore Project Websites",
      indexIntro: "Open a public project to visit its live website.",
      privateLabel: "Private project",
      deliveryLinks: [
        {
          title: "Nick Sitchinava",
          description: "Personal portfolio site",
          region: "Georgia",
          duration: "1–2 weeks",
          href: "https://nick-sitchinava.vercel.app/",
          previewSrc: "/images/previews/nick-portfolio.webp",
          heroSrc: "/images/projects/nick-portfolio-hero.webp",
          detailSrc: "/images/projects/nick-portfolio-detail.webp",
        },
        {
          title: "George Sitchinava",
          description: "Personal portfolio site",
          region: "Georgia",
          duration: "2–3 weeks",
          href: "https://georgesitchinava.vercel.app/",
          previewSrc: "/images/previews/george-portfolio.webp",
          heroSrc: "/images/projects/george-portfolio-hero.webp",
          detailSrc: "/images/projects/george-portfolio-detail.webp",
        },
        {
          title: "F-Dash",
          description: "Finance dashboard",
          region: "Europe",
          duration: "13–15 weeks",
          href: "https://f-dash.vercel.app/",
          previewSrc: "/images/previews/fdash.webp",
          heroSrc: "/images/projects/fdash-hero.webp",
          detailSrc: "/images/projects/fdash-detail.webp",
        },
        {
          title: "Bike Summer Fest",
          description: "Event landing page",
          region: "Georgia",
          duration: "1–2 weeks",
          href: "https://bike-summer-fest.vercel.app/",
          previewSrc: "/images/previews/bike-summer-fest.webp",
          heroSrc: "/images/projects/bike-summer-fest-hero.webp",
          detailSrc: "/images/projects/bike-summer-fest-detail.webp",
        },
        {
          title: "Company landing page",
          description: "Marketing landing page",
          region: "Private",
          duration: "Under NDA",
          previewSrc: "/images/projects/company-landing-hero.webp",
          heroSrc: "/images/projects/company-landing-hero.webp",
          private: true,
        },
        {
          title: "Alliance Travel Georgia",
          description: "Georgian travel agency",
          region: "Georgia",
          href: "https://www.alliancetravelgeorgia.com/",
          previewSrc: "/images/projects/alliance-travel-georgia-hero.webp",
          heroSrc: "/images/projects/alliance-travel-georgia-hero.webp",
          detailSrc: "/images/projects/alliance-travel-georgia-footer.webp",
        },
      ],
    },
    pricingCalculator: {
      heading: "Estimate your website cost and timeline.",
      headingLead: "Estimate your website",
      headingFocus: "cost and timeline.",
      toolLabel: "Website cost calculator",
      subhead:
        "Most projects will be priced according to your needs, but we can still give a clear idea of timelines and budget.",
      placeholder: "Select an option",
      navigation: { back: "Back", next: "Next", viewEstimate: "View estimate", review: "Review your choices" },
      steps: {
        projectType: {
          title: "What are you building?",
          options: {
            landing: { label: "Landing Page" },
            website: { label: "Website" },
            portfolio: { label: "Portfolio" },
          },
        },
        size: {
          title: "How big is it?",
          options: {
            landing: {
              short: { label: "Short", description: "Up to 4 sections" },
              standard: { label: "Standard", description: "5 to 8 sections" },
              long: { label: "Long", description: "9 to 12 sections" },
            },
            website: {
              small: { label: "Small", description: "1 to 5 page templates" },
              medium: { label: "Medium", description: "6 to 10 page templates" },
              large: { label: "Large", description: "11 to 20 page templates" },
            },
            portfolio: {
              small: { label: "Small", description: "1 to 5 page templates" },
              medium: { label: "Medium", description: "6 to 10 page templates" },
              large: { label: "Large", description: "11 to 20 page templates" },
            },
          },
        },
        creativity: {
          title: "How much creative direction?",
          options: {
            standard: { label: "Standard", description: "Clean and functional" },
            enhanced: { label: "Enhanced", description: "Refined motion and details" },
            creative: {
              label: "Creative",
              description: "Full custom interactive experience",
            },
          },
        },
        timeline: {
          title: "What's your timeline?",
          options: {
            flexible: { label: "Flexible" },
            asap: { label: "ASAP" },
          },
        },
        seo: {
          title: "Do you need SEO/GEO optimization?",
          yes: "Yes",
          no: "No",
          yesDescription: "Include search visibility support",
          noDescription: "Not needed for this project",
        },
        content: {
          title: "Who's providing the content?",
          options: {
            client: "I'll provide content",
            assistance: "I need content assistance",
          },
        },
      },
      result: {
        timeLabel: "Estimated development timeline",
        priceLabel: "Estimated price range",
        startingAt: "Starting at",
        earlyTimeLabel: "Starting timeline",
        earlyPriceLabel: "Starting price",
        weeksUnit: "weeks",
        loadingRate: "Calculating...",
        ctaButton: "Start a Conversation",
      },
    },
    contact: {
      heading: "Your website\nstarts here.",
      text: "A rough idea is enough, even if you're only exploring. Tell us what you have in mind and we'll shape the next step together.",
      whatsappAction: "Start on WhatsApp",
      trust: { brief: "No finished brief needed", reply: "Replies within minutes" },
      process: { label: "After you reach out", stages: ["Share an idea", "We understand it", "Conversation begins"] },
      channels: {
        email: {
          label: "Email",
          value: "contact.devbynick@gmail.com",
          href: "mailto:contact.devbynick@gmail.com",
        },
        whatsapp: {
          label: "WhatsApp",
          value: "+995 551 318 885",
          href: "https://wa.me/+995551318885",
        },
        instagram: {
          label: "Instagram",
          value: "@dev.by.nick",
          href: "https://www.instagram.com/dev.by.nick/",
        },
      },
    },
    footer: {
      giantText: "DESIGN",
      heading: "Let's build something worth finding.",
      marquee: [
        "Custom Websites",
        "Landing Pages",
        "SEO Optimized",
        "Built to Convert",
        "Fast Load Times",
        "Bilingual by Default",
      ],
      primaryCta: "Start a Project",
      secondaryCta: "View Our Work",
      nav: {
        about: "About",
        services: "Services",
        projects: "Projects",
        contact: "Contact",
      },
      legal: {
        privacy: "Privacy Policy",
        terms: "Terms of Service",
      },
      crafted: "Crafted with",
      rights: "All rights reserved.",
      backToTop: "Back to top",
    },
  },
  ka: {
    meta: {
      title: "Flevio | ვებ დიზაინისა და დეველოპმენტის სააგენტო თბილისში",
      description:
        "Flevio ქმნის ვებსაიტებს, ლენდინგ გვერდებსა და ვებ აპლიკაციებს თბილისისა და მთელი მსოფლიოს ბიზნესებისთვის. სწრაფი, SEO-ზე მორგებული და კონვერტაციაზე ორიენტირებული გადაწყვეტილებები.",
      ogDescription:
        "Flevio — ინდივიდუალური ვებსაიტები, ლენდინგ გვერდები და ვებ აპლიკაციები, შექმნილი თბილისში, საქართველოში, მსოფლიოს მასშტაბით მოქმედი კლიენტებისთვის.",
      keywords: [
        "Flevio",
        "ვებ დიზაინი თბილისი",
        "ვებსაიტის დამზადება საქართველო",
        "ვებ დეველოპერი თბილისი",
        "ინდივიდუალური ვებსაიტის დიზაინი",
        "ლენდინგ გვერდის დამზადება",
        "ვებ დეველოპმენტის სააგენტო",
        "მცირე ბიზნესის ვებსაიტი",
        "ვებ აპლიკაციის დეველოპმენტი",
        "რესპონსივი ვებსაიტის დიზაინი",
        "Next.js დეველოპმენტის სააგენტო",
        "Nick Sitchinava",
      ],
    },
    header: {
      about: "ჩვენ შესახებ",
      services: "სერვისები",
      projects: "პროექტები",
      contact: "კონტაქტი",
      estimateCost: "ფასის გამომთვლელი",
      cta: "დაიწყეთ პროექტი",
      menuLabel: "მენიუ",
    },
    hero: {
      ariaLabel: "შესავალი",
      eyebrow: "ვებ დიზაინისა და დეველოპმენტის სააგენტო",
      headlinePrefix: "ჩვენ ვქმნით ",
      headlineEmphasis: "ვებსაიტებს, რომლებიც კონვერტირებენ",
      headlineLines: ["ჩვენ ვქმნით", "ვებსაიტებს, რომლებიც", "კონვერტირებენ"],
      subhead:
        "ინდივიდუალური ვებსაიტის დიზაინი, ლენდინგ გვერდები და ვებ აპლიკაციების დეველოპმენტი სტარტაპებისა და მზარდი ბიზნესებისთვის.",
      chips: ["ვებსაიტის დიზაინი", "ლენდინგ გვერდები", "ვებ აპლიკაციები"],
      primaryCta: "ნახეთ ჩვენი ნამუშევრები",
      secondaryCta: "დაიწყეთ პროექტი",
      desktopHeadlineLines: ["ჩვენ ვქმნით", "ვებსაიტებს", "რომლებიც შედეგს ქმნიან"],
      desktopSubhead: {
        before: "ჩვენ ვქმნით ინდივიდუალურ ვებსაიტებს ",
        audience: "სერვის ბიზნესებისთვის",
        after: " — ნდობის გასაძლიერებლად და ინტერესის მოთხოვნად ქცევისთვის.",
      },
      desktopPrimaryCta: "დაგვიკავშირდით",
      desktopSecondaryCta: "ნახეთ ჩვენი ნამუშევრები",
      desktopCapability: "ინდივიდუალური დიზაინი · ხელით დაწერილი კოდი",
      ctaReassurance: "საწყისი იდეაც საკმარისია დასაწყებად.",
    },
    services: {
      heading: "სერვისები",
      cta: "დაიწყეთ პროექტი",
      items: [
        {
          slug: "website-development",
          title: "ვებსაიტის დეველოპმენტი",
          description: "ინდივიდუალურად აგებული ვებსაიტები, დაპროექტებული და კოდირებული ნულიდან.",
          details:
            "ჩვენ თითოეულ საიტს ვქმნით და ვწერთ ხელით თქვენი ბიზნესის შესაბამისად, არანაირი მზა შაბლონი და ზედმეტად დატვირთული კონსტრუქტორი. ყოველი განლაგება, ანიმაცია და კოდის სტრიქონი ემსახურება ერთ მიზანს: სწრაფად ჩაიტვირთოს, კარგად გამოიყურებოდეს და ვიზიტორი კლიენტად აქციოს.",
          features: [
            "ინდივიდუალური დიზაინი, არა შაბლონი",
            "ხელით დაწერილი, ადვილად შენარჩუნებადი კოდი",
            "სისწრაფესა და SEO-ზე ორიენტირებული პირველივე დღიდან",
          ],
        },
        {
          slug: "landing-pages",
          title: "ლენდინგ გვერდები",
          description: "მაღალკონვერტირებადი ლენდინგ გვერდები, აგებული სისწრაფისა და სიცხადისთვის.",
          details:
            "ლენდინგ გვერდს ერთი ამოცანა აქვს: კონვერტაცია. ჩვენ ვხსნით ყველა ზედმეტ დეტალს და ვაწყობთ თითოეულ სექციას ერთი, მკაფიო მოქმედების გარშემო, რათა ვიზიტორმა ზუსტად იცოდეს, რა უნდა გააკეთოს შემდეგ.",
          features: [
            "ერთ მიზანზე ორიენტირებული სტრუქტურა",
            "მზადაა A/B ტესტირებისთვის",
            "მობილურზე მორგებული, სწრაფად ჩატვირთვადი დიზაინი",
          ],
        },
        {
          slug: "seo-optimization",
          title: "SEO ოპტიმიზაცია",
          description:
            "სუფთა, საძიებო სისტემებისთვის მოსახერხებელი კოდი, სტრუქტურირებული მაღალი პოზიციებისთვის.",
          details:
            "კარგი SEO იწყება კოდიდან და არა გაშვების შემდეგ. ჩვენ ვაგებთ თითოეულ საიტს სემანტიკური მარკაპით, სტრუქტურირებული მონაცემებით და გამართული წარმადობით, რათა საძიებო სისტემებმაც და ვიზიტორებმაც იპოვონ ის, რაც სჭირდებათ.",
          features: [
            "სემანტიკური, ხელმისაწვდომი მარკაპი",
            "სტრუქტურირებული მონაცემები და schema.org",
            "Core Web Vitals-ის ოპტიმიზაცია",
          ],
        },
      ],
    },
    serviceDetail: {
      backLabel: "სერვისებზე დაბრუნება",
      featuresHeading: "რას მოიცავს",
      ctaHeading: "მზად ხართ დასაწყებად?",
      ctaText: "მოგვიყევით თქვენი პროექტის შესახებ და დაგიკავშირდებით შემდეგი ნაბიჯებისთვის.",
      ctaButton: "დაიწყეთ პროექტი",
    },
    projects: {
      heading: "ნამუშევრები, შექმნილი ბიზნესის გარშემო.",
      intro:
        "ვიზუალური ოსტატობა ყურადღებას იპყრობს. მკაფიო სტრუქტურა, მიზნობრივი ინტერაქციები და ხელით დაწერილი სწრაფი კოდი ამ ყურადღებას მოქმედებად გარდაქმნის.",
      scopeLine: "ვებდიზაინი · დეველოპმენტი · ციფრული გამოცდილება",
      wheelLabel: "ვებსაიტების დიზაინის გალერეა",
      browseHint: "გადაახვიეთ ნამუშევრების სანახავად",
      viewProjectLabel: "საიტის ნახვა",
      problemStatement:
        "ვქმნით ინდივიდუალურ, კონვერსიაზე ორიენტირებულ ვებსაიტებს — გამორჩეულს, სწრაფს და ბიზნესის ზრდაზე მორგებულს.",
      problemAttribution: "ვებდიზაინი · ვებდეველოპმენტი · სტრატეგია",
      showreelLabel: "შოურილი",
      showreelTitle: "Flevio მოძრაობაში",
      showreelDescription: "ჩვენი ვიზუალური და ინტერაქციული ნამუშევრების მოკლე ვიდეო.",
      indexHeading: "პროექტების ვებსაიტები",
      indexIntro: "გახსენით საჯარო პროექტი მისი მოქმედი საიტის სანახავად.",
      privateLabel: "პირადი პროექტი",
      deliveryLinks: [
        {
          title: "Nick Sitchinava",
          description: "პერსონალური პორტფოლიო საიტი",
          region: "საქართველო",
          duration: "1–2 კვირა",
          href: "https://nick-sitchinava.vercel.app/",
          previewSrc: "/images/previews/nick-portfolio.webp",
          heroSrc: "/images/projects/nick-portfolio-hero.webp",
          detailSrc: "/images/projects/nick-portfolio-detail.webp",
        },
        {
          title: "George Sitchinava",
          description: "პერსონალური პორტფოლიო საიტი",
          region: "საქართველო",
          duration: "2–3 კვირა",
          href: "https://georgesitchinava.vercel.app/",
          previewSrc: "/images/previews/george-portfolio.webp",
          heroSrc: "/images/projects/george-portfolio-hero.webp",
          detailSrc: "/images/projects/george-portfolio-detail.webp",
        },
        {
          title: "F-Dash",
          description: "ფინანსური დაფა",
          region: "ევროპა",
          duration: "13–15 კვირა",
          href: "https://f-dash.vercel.app/",
          previewSrc: "/images/previews/fdash.webp",
          heroSrc: "/images/projects/fdash-hero.webp",
          detailSrc: "/images/projects/fdash-detail.webp",
        },
        {
          title: "Bike Summer Fest",
          description: "ივენთის ლენდინგ გვერდი",
          region: "საქართველო",
          duration: "1–2 კვირა",
          href: "https://bike-summer-fest.vercel.app/",
          previewSrc: "/images/previews/bike-summer-fest.webp",
          heroSrc: "/images/projects/bike-summer-fest-hero.webp",
          detailSrc: "/images/projects/bike-summer-fest-detail.webp",
        },
        {
          title: "კომპანიის ლენდინგ გვერდი",
          description: "მარკეტინგული ლენდინგ გვერდი",
          region: "პირადი",
          duration: "NDA-ს ფარგლებში",
          previewSrc: "/images/projects/company-landing-hero.webp",
          heroSrc: "/images/projects/company-landing-hero.webp",
          private: true,
        },
        {
          title: "Alliance Travel Georgia",
          description: "ქართული ტურისტული სააგენტო",
          region: "საქართველო",
          href: "https://www.alliancetravelgeorgia.com/",
          previewSrc: "/images/projects/alliance-travel-georgia-hero.webp",
          heroSrc: "/images/projects/alliance-travel-georgia-hero.webp",
          detailSrc: "/images/projects/alliance-travel-georgia-footer.webp",
        },
      ],
    },
    pricingCalculator: {
      heading: "შეაფასეთ თქვენი ვებსაიტის ფასი და ვადები.",
      headingLead: "შეაფასეთ თქვენი ვებსაიტის",
      headingFocus: "ფასი და ვადები.",
      toolLabel: "ვებსაიტის ფასის კალკულატორი",
      subhead:
        "პროექტების უმეტესობის ფასი განისაზღვრება ინდივიდუალურად, თუმცა შეგვიძლია მოგცეთ ნათელი წარმოდგენა ვადებსა და ბიუჯეტზე.",
      placeholder: "აირჩიეთ ვარიანტი",
      navigation: { back: "უკან", next: "შემდეგი", viewEstimate: "შეფასების ნახვა", review: "არჩეული პასუხების ნახვა" },
      steps: {
        projectType: {
          title: "რას ქმნით?",
          options: {
            landing: { label: "ლენდინგ გვერდი" },
            website: { label: "ვებსაიტი" },
            portfolio: { label: "პორტფოლიო" },
          },
        },
        size: {
          title: "რა მოცულობისაა?",
          options: {
            landing: {
              short: { label: "მოკლე", description: "4 სექციამდე" },
              standard: { label: "სტანდარტული", description: "5-დან 8 სექციამდე" },
              long: { label: "გრძელი", description: "9-დან 12 სექციამდე" },
            },
            website: {
              small: { label: "პატარა", description: "1-დან 5 გვერდამდე" },
              medium: { label: "საშუალო", description: "6-დან 10 გვერდამდე" },
              large: { label: "დიდი", description: "11-დან 20 გვერდამდე" },
            },
            portfolio: {
              small: { label: "პატარა", description: "1-დან 5 გვერდამდე" },
              medium: { label: "საშუალო", description: "6-დან 10 გვერდამდე" },
              large: { label: "დიდი", description: "11-დან 20 გვერდამდე" },
            },
          },
        },
        creativity: {
          title: "რამდენად შემოქმედებითი მიდგომაა საჭირო?",
          options: {
            standard: { label: "სტანდარტული", description: "სუფთა და ფუნქციური" },
            enhanced: { label: "გაუმჯობესებული", description: "დახვეწილი ანიმაცია და დეტალები" },
            creative: {
              label: "შემოქმედებითი",
              description: "სრულად ინდივიდუალური ინტერაქტიული გამოცდილება",
            },
          },
        },
        timeline: {
          title: "რა ვადაშია საჭირო?",
          options: {
            flexible: { label: "მოქნილი" },
            asap: { label: "სასწრაფოდ" },
          },
        },
        seo: {
          title: "გჭირდებათ SEO/GEO ოპტიმიზაცია?",
          yes: "დიახ",
          no: "არა",
          yesDescription: "საძიებო ხილვადობის მხარდაჭერით",
          noDescription: "ამ პროექტისთვის არ მჭირდება",
        },
        content: {
          title: "ვინ უზრუნველყოფს კონტენტს?",
          options: {
            client: "მე მოვამზადებ კონტენტს",
            assistance: "მჭირდება კონტენტში დახმარება",
          },
        },
      },
      result: {
        timeLabel: "სავარაუდო შესრულების ვადა",
        priceLabel: "სავარაუდო ფასის დიაპაზონი",
        startingAt: "საწყისი ფასი",
        earlyTimeLabel: "საწყისი ვადა",
        earlyPriceLabel: "საწყისი ფასი",
        weeksUnit: "კვირა",
        loadingRate: "მიმდინარეობს გამოთვლა...",
        ctaButton: "დაიწყეთ საუბარი",
      },
    },
    contact: {
      heading: "თქვენი ვებსაიტი\nაქ იწყება.",
      text: "საწყისი იდეაც საკმარისია, მაშინაც კი, თუ ჯერ მხოლოდ ვარიანტებს განიხილავთ. მოგვწერეთ და ერთად განვსაზღვროთ შემდეგი ნაბიჯი.",
      whatsappAction: "დავიწყოთ WhatsApp-ზე",
      trust: { brief: "მზა ბრიფი საჭირო არ არის", reply: "გიპასუხებთ რამდენიმე წუთში" },
      process: { label: "მოწერის შემდეგ", stages: ["გაგვიზიარეთ იდეა", "გავერკვევით დეტალებში", "საუბარს დავიწყებთ"] },
      channels: {
        email: {
          label: "ელფოსტა",
          value: "contact.devbynick@gmail.com",
          href: "mailto:contact.devbynick@gmail.com",
        },
        whatsapp: {
          label: "WhatsApp",
          value: "+995 551 318 885",
          href: "https://wa.me/+995551318885",
        },
        instagram: {
          label: "Instagram",
          value: "@dev.by.nick",
          href: "https://www.instagram.com/dev.by.nick/",
        },
      },
    },
    footer: {
      giantText: "დიზაინი",
      heading: "მოდით შევქმნათ რაღაც აღმოსაჩენი.",
      marquee: [
        "ინდივიდუალური ვებსაიტები",
        "ლენდინგ გვერდები",
        "SEO ოპტიმიზაცია",
        "აგებული კონვერტაციისთვის",
        "სწრაფი ჩატვირთვა",
        "ორენოვანი ნაგულისხმევად",
      ],
      primaryCta: "დაიწყეთ პროექტი",
      secondaryCta: "ნახეთ ჩვენი ნამუშევრები",
      nav: {
        about: "ჩვენ შესახებ",
        services: "სერვისები",
        projects: "პროექტები",
        contact: "კონტაქტი",
      },
      legal: {
        privacy: "კონფიდენციალურობის პოლიტიკა",
        terms: "მომსახურების პირობები",
      },
      crafted: "შექმნილია",
      rights: "ყველა უფლება დაცულია.",
      backToTop: "ზემოთ დაბრუნება",
    },
  },
};
