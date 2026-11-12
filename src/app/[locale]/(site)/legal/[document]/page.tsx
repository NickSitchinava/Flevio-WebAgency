import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { locales, type Locale } from "@/i18n/config";
import { SITE_URL, SOCIAL_IMAGE_URL } from "@/lib/site-url";
import styles from "./legal.module.css";

const documents = ["privacy", "terms", "cookies"] as const;
type Document = (typeof documents)[number];

const copy: Record<Locale, Record<Document, {
  title: string;
  updated: string;
  introduction: string;
  metaDescription: string;
  sections: { heading: string; paragraphs: string[] }[];
  back: string;
}>> = {
  en: {
    privacy: {
      title: "Privacy Policy",
      updated: "Updated 12 November 2026",
      introduction: "Flevio is run by its founder, Nick Sitchinava. This notice explains what happens to information when you use this website or contact us.",
      metaDescription: "Learn how Flevio handles contact information, pricing calculator data, and consent-based Google Analytics page views.",
      sections: [
        { heading: "Information you share", paragraphs: ["If you contact us by email, WhatsApp, or Instagram, we receive the contact details, message, and any project information you choose to send. We use that information to reply and take the steps you request toward a possible project agreement. Sharing information is voluntary, but we need a way to contact you to reply.", "We keep inquiry messages while needed to handle the conversation and related follow-up, or longer when a legal obligation requires it. Our website host and the communication service you choose may process technical or message data, potentially outside Georgia, under their own terms."] },
        { heading: "The pricing calculator", paragraphs: ["Calculator choices and estimates are processed in your browser; the site does not send your selections to Flevio. For English-language estimates, the browser requests a GEL-to-USD exchange rate from open.er-api.com. That provider may receive ordinary technical request data, such as your IP address."] },
        { heading: "Google Analytics and your choice", paragraphs: ["If you accept analytics, we load Google Analytics 4 to measure page views. We do not load the Google tag or send Analytics requests before you accept, and declining does not limit your access to this website.", "Google may receive the page URL, approximate location, browser and device information, and identifiers in the _ga cookies used to distinguish visits. We do not send calculator selections, price estimates, or the contents of your messages to Analytics. Google may process analytics data outside Georgia. When Analytics is enabled, our GA4 user and event data retention setting is two months.", "Your choice and its time are saved in this browser's local storage for six months. You can change or withdraw it through Cookie Settings in the footer. Withdrawing stops future Analytics measurement and removes accessible GA cookies; it does not automatically erase data already sent. Contact us if you want to ask about or request deletion of data associated with you."] },
        { heading: "External services", paragraphs: ["Links to WhatsApp, Instagram, and public project websites take you to services with their own privacy practices. Google Search Console, if used to inspect aggregate search performance, does not add a visitor-facing tag or cookie to this website."] },
        { heading: "Your questions and rights", paragraphs: ["To ask about information you have sent us, or request access, correction, or deletion, email contact.devbynick@gmail.com. We will handle requests under applicable law."] },
      ],
      back: "Back to Flevio",
    },
    terms: {
      title: "Terms of Service",
      updated: "Updated 12 November 2026",
      introduction: "These terms cover use of the Flevio website. A client project is governed by its own agreed scope and terms.",
      metaDescription: "Read Flevio's website terms, including project examples, pricing estimates, external links, and separate client agreements.",
      sections: [
        { heading: "Website information", paragraphs: ["The services, project examples, and other material on this site are provided to help you learn about Flevio. They may change and do not create a client relationship on their own."] },
        { heading: "Pricing estimates", paragraphs: ["The calculator provides an early, non-binding estimate based on the options you select. Final pricing, timing, deliverables, and payment terms are confirmed separately after we discuss your project."] },
        { heading: "Projects and external links", paragraphs: ["Project names, images, and other creative material belong to their respective owners. Public project links and contact channels lead to third-party services, which operate under their own terms."] },
        { heading: "Privacy and cookies", paragraphs: ["Optional Google Analytics is used only after you accept it. The Privacy Policy explains how information is handled, and the Cookie Policy explains your choices and the Analytics cookies. You can change your choice at any time through Cookie Settings in the footer."] },
        { heading: "Contact", paragraphs: ["For questions about this website or these terms, email contact.devbynick@gmail.com."] },
      ],
      back: "Back to Flevio",
    },
    cookies: {
      title: "Cookie Policy",
      updated: "Updated 12 November 2026",
      introduction: "Flevio uses optional Google Analytics cookies only if you accept analytics. You can use the website without them.",
      metaDescription: "See which Google Analytics cookies Flevio uses after consent and how to accept, decline, or change your choice.",
      sections: [
        { heading: "Your choice", paragraphs: ["The first-visit panel offers Accept analytics, Decline, and Customize. Analytics is off by default. Your choice and its time are stored under flevio:analytics-consent:v1 in this browser's local storage for six months; this preference record is not a cookie. If storage is unavailable or the choice expires, we ask again and do not load Analytics until you accept."] },
        { heading: "Analytics cookies", paragraphs: ["After you accept, Google Analytics 4 may set first-party _ga and _ga_<id> cookies to distinguish visitors and sessions. We configure these cookies to expire after 180 days without extending their expiry on each visit; your browser may shorten that period. Flevio does not use advertising cookies or marketing tags on this site."] },
        { heading: "Change or withdraw consent", paragraphs: ["Open Cookie Settings in the footer to change your choice. If you decline after accepting, we stop future Analytics measurement, remove accessible GA cookies, and reload the page to unload the tag. Declining never blocks the website. To ask about information already sent to Google Analytics, email contact.devbynick@gmail.com."] },
      ],
      back: "Back to Flevio",
    },
  },
  ka: {
    privacy: {
      title: "კონფიდენციალურობის პოლიტიკა",
      updated: "განახლებულია 2026 წლის 12 ნოემბერს",
      introduction: "Flevio-ს ხელმძღვანელობს მისი დამფუძნებელი ნიკ სიჭინავა. ეს დოკუმენტი განმარტავს, როგორ მუშავდება ინფორმაცია ვებსაიტის გამოყენებისას ან ჩვენთან დაკავშირებისას.",
      metaDescription: "გაიგეთ, როგორ ამუშავებს Flevio საკონტაქტო ინფორმაციას, ფასის კალკულატორის მონაცემებსა და თანხმობით ჩართულ Google Analytics-ის გვერდების ნახვებს.",
      sections: [
        { heading: "თქვენ მიერ მოწოდებული ინფორმაცია", paragraphs: ["ელფოსტით, WhatsApp-ით ან Instagram-ით მოწერისას ვიღებთ თქვენს საკონტაქტო მონაცემებს, შეტყობინებას და პროექტის შესახებ იმ ინფორმაციას, რომელსაც თავად გვიზიარებთ. ამ ინფორმაციას ვიყენებთ პასუხისა და თქვენი მოთხოვნით შესაძლო პროექტის შეთანხმებისკენ ნაბიჯების გადადგმისთვის. ინფორმაციის გაზიარება ნებაყოფლობითია, თუმცა პასუხისთვის საკონტაქტო გზა გვჭირდება.", "შეტყობინებებს ვინახავთ მანამ, სანამ ეს საჭიროა მიმოწერისა და მასთან დაკავშირებული შემდგომი კომუნიკაციისთვის, ან უფრო დიდხანს, თუ ამას კანონი მოითხოვს. ვებსაიტის ჰოსტინგის პროვაიდერმა და თქვენ მიერ არჩეულმა საკომუნიკაციო სერვისმა შესაძლოა დაამუშაონ ტექნიკური ან შეტყობინების მონაცემები, მათ შორის საქართველოს ფარგლებს გარეთ, საკუთარი პირობების შესაბამისად."] },
        { heading: "ფასის კალკულატორი", paragraphs: ["კალკულატორის არჩევანი და შეფასება მუშავდება თქვენს ბრაუზერში; ვებსაიტი თქვენს პასუხებს Flevio-ს არ უგზავნის. ინგლისურენოვანი შეფასებისთვის ბრაუზერი GEL/USD გაცვლით კურსს იღებს open.er-api.com-დან. ამ სერვისმა შესაძლოა მიიღოს მოთხოვნის ჩვეულებრივი ტექნიკური მონაცემები, მაგალითად თქვენი IP მისამართი."] },
        { heading: "Google Analytics და თქვენი არჩევანი", paragraphs: ["თუ ანალიტიკაზე თანხმობას გასცემთ, გვერდების ნახვების გასაზომად ვტვირთავთ Google Analytics 4-ს. თანხმობამდე Google-ის ტეგი არ იტვირთება და Analytics-ის მოთხოვნები არ იგზავნება. უარის თქმა ვებსაიტის გამოყენებას არ ზღუდავს.", "Google-მა შეიძლება მიიღოს გვერდის მისამართი, მიახლოებითი მდებარეობა, ბრაუზერისა და მოწყობილობის მონაცემები და _ga ქუქი-ფაილებში შენახული იდენტიფიკატორები. ფასის კალკულატორის არჩევანს, შეფასებას ან თქვენი შეტყობინებების შინაარსს Analytics-ს არ ვუგზავნით. Google-მა მონაცემები შეიძლება საქართველოს ფარგლებს გარეთ დაამუშაოს. Analytics-ის ჩართვისას GA4-ში მომხმარებლისა და მოვლენის მონაცემების შენახვის ვადა ორი თვეა.", "თქვენი არჩევანი და მისი დრო ამ ბრაუზერის ლოკალურ საცავში ექვსი თვით ინახება. მისი შეცვლა ან გაუქმება ნებისმიერ დროს შეგიძლიათ გვერდის ბოლოში არსებული ქუქი-ფაილების პარამეტრებიდან. თანხმობის გაუქმება აჩერებს მომავალ გაზომვას და შლის ხელმისაწვდომ GA ქუქი-ფაილებს, თუმცა უკვე გაგზავნილ მონაცემებს ავტომატურად არ შლის. კითხვების ან წაშლის მოთხოვნისთვის დაგვიკავშირდით."] },
        { heading: "გარე სერვისები", paragraphs: ["WhatsApp-ის, Instagram-ისა და საჯარო პროექტების ბმულები გადაგიყვანთ სერვისებზე, რომლებსაც საკუთარი კონფიდენციალურობის წესები აქვთ. Google Search Console, თუ მას საძიებო მონაცემების შესამოწმებლად ვიყენებთ, ამ ვებსაიტზე ვიზიტორისთვის ტეგს ან ქუქი-ფაილს არ ამატებს."] },
        { heading: "თქვენი კითხვები და უფლებები", paragraphs: ["ჩვენთვის გამოგზავნილი ინფორმაციის შესახებ კითხვისთვის, ასევე მასზე წვდომის, შესწორების ან წაშლის მოთხოვნისთვის მოგვწერეთ contact.devbynick@gmail.com-ზე. მოთხოვნებს განვიხილავთ მოქმედი კანონმდებლობის შესაბამისად."] },
      ],
      back: "Flevio-ზე დაბრუნება",
    },
    terms: {
      title: "მომსახურების პირობები",
      updated: "განახლებულია 2026 წლის 12 ნოემბერს",
      introduction: "ეს პირობები ეხება Flevio-ს ვებსაიტის გამოყენებას. კლიენტის პროექტი განისაზღვრება ცალკე შეთანხმებული მოცულობითა და პირობებით.",
      metaDescription: "გაეცანით Flevio-ს ვებსაიტის გამოყენების პირობებს, მათ შორის პროექტების მაგალითებს, ფასის წინასწარ შეფასებას, გარე ბმულებსა და კლიენტთან ცალკე შეთანხმებას.",
      sections: [
        { heading: "ვებსაიტის ინფორმაცია", paragraphs: ["სერვისები, პროექტების მაგალითები და სხვა მასალა დაგეხმარებათ Flevio-ს გაცნობაში. ინფორმაცია შეიძლება შეიცვალოს და თავისთავად არ წარმოშობს კლიენტთან სახელშეკრულებო ურთიერთობას."] },
        { heading: "ფასის შეფასება", paragraphs: ["კალკულატორი გაძლევთ წინასწარ, არასავალდებულო შეფასებას არჩეული პარამეტრების მიხედვით. საბოლოო ფასი, ვადები, შესასრულებელი სამუშაო და გადახდის პირობები პროექტის განხილვის შემდეგ ცალკე თანხმდება."] },
        { heading: "პროექტები და გარე ბმულები", paragraphs: ["პროექტების სახელები, სურათები და სხვა შემოქმედებითი მასალა ეკუთვნის მათ შესაბამის მფლობელებს. საჯარო პროექტებისა და საკონტაქტო არხების ბმულები გადაგიყვანთ მესამე მხარის სერვისებზე, რომლებსაც საკუთარი პირობები აქვთ."] },
        { heading: "კონფიდენციალურობა და ქუქი-ფაილები", paragraphs: ["არჩევითი Google Analytics მხოლოდ თქვენი თანხმობის შემდეგ გამოიყენება. კონფიდენციალურობის პოლიტიკა განმარტავს მონაცემების დამუშავებას, ხოლო ქუქი-ფაილების პოლიტიკა — თქვენს არჩევანსა და ანალიტიკურ ქუქი-ფაილებს. არჩევანის შეცვლა ნებისმიერ დროს შეგიძლიათ გვერდის ბოლოში არსებული ქუქი-ფაილების პარამეტრებიდან."] },
        { heading: "კონტაქტი", paragraphs: ["ვებსაიტის ან ამ პირობების შესახებ კითხვებისთვის მოგვწერეთ contact.devbynick@gmail.com-ზე."] },
      ],
      back: "Flevio-ზე დაბრუნება",
    },
    cookies: {
      title: "ქუქი-ფაილების პოლიტიკა",
      updated: "განახლებულია 2026 წლის 12 ნოემბერს",
      introduction: "Flevio არჩევით Google Analytics-ის ქუქი-ფაილებს მხოლოდ თქვენი თანხმობის შემდეგ იყენებს. ვებსაიტის გამოყენება მათ გარეშეც შეგიძლიათ.",
      metaDescription: "გაიგეთ, რომელ Google Analytics-ის ქუქი-ფაილებს იყენებს Flevio თქვენი თანხმობის შემდეგ და როგორ შეცვალოთ არჩევანი.",
      sections: [
        { heading: "თქვენი არჩევანი", paragraphs: ["პირველი ვიზიტისას შეგიძლიათ ანალიტიკაზე თანხმობა, უარის თქმა ან არჩევანის მორგება. ანალიტიკა ნაგულისხმევად გამორთულია. არჩევანი და მისი დრო ექვსი თვით ინახება ამ ბრაუზერის ლოკალურ საცავში, flevio:analytics-consent:v1 ჩანაწერში; ეს ჩანაწერი ქუქი-ფაილი არ არის. თუ საცავი მიუწვდომელია ან ვადა გავიდა, არჩევანს ხელახლა გკითხავთ და თანხმობამდე Analytics-ს არ ჩავრთავთ."] },
        { heading: "ანალიტიკური ქუქი-ფაილები", paragraphs: ["თანხმობის შემდეგ Google Analytics 4-მა შეიძლება შექმნას პირველი მხარის _ga და _ga_<id> ქუქი-ფაილები ვიზიტორებისა და სესიების გასარჩევად. მათი ვადა დაყენებულია 180 დღეზე და ყოველი ვიზიტისას არ განახლდება; ბრაუზერმა შეიძლება ეს ვადა შეამციროს. Flevio ამ საიტზე სარეკლამო ქუქი-ფაილებსა და მარკეტინგულ ტეგებს არ იყენებს."] },
        { heading: "თანხმობის შეცვლა ან გაუქმება", paragraphs: ["არჩევანის შესაცვლელად გახსენით ქუქი-ფაილების პარამეტრები გვერდის ბოლოში. თუ თანხმობის შემდეგ უარს იტყვით, მომავალ გაზომვას შევაჩერებთ, ხელმისაწვდომ GA ქუქი-ფაილებს წავშლით და ტეგის გამოსართავად გვერდს ხელახლა ჩავტვირთავთ. უარის თქმა ვებსაიტზე წვდომას არ ზღუდავს. უკვე გაგზავნილ მონაცემებზე კითხვისთვის მოგვწერეთ contact.devbynick@gmail.com-ზე."] },
      ],
      back: "Flevio-ზე დაბრუნება",
    },
  },
};

export function generateStaticParams() {
  return locales.flatMap((locale) => documents.map((document) => ({ locale, document })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; document: string }> }): Promise<Metadata> {
  const { locale, document } = await params;
  if (!locales.includes(locale as Locale) || !documents.includes(document as Document)) return {
    title: "404 — Page Not Found | Flevio",
    description: "The page you're looking for isn't available. Return to Flevio's homepage.",
    robots: { index: false },
    alternates: { canonical: null },
    openGraph: null,
    twitter: null,
  };
  const title = copy[locale as Locale][document as Document].title;
  const description = copy[locale as Locale][document as Document].metaDescription;
  const canonicalUrl = `${SITE_URL}/${locale}/legal/${document}`;
  return {
    title: `${title} | Flevio`,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ...Object.fromEntries(locales.map((language) => [language, `${SITE_URL}/${language}/legal/${document}`])),
        "x-default": `${SITE_URL}/en/legal/${document}`,
      },
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: `${title} | Flevio`,
      description,
      locale: locale === "ka" ? "ka_GE" : "en_US",
      images: [{ url: SOCIAL_IMAGE_URL, width: 1916, height: 1075, alt: "Flevio website homepage preview" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Flevio`,
      description,
      images: [SOCIAL_IMAGE_URL],
    },
  };
}

export default async function LegalPage({ params }: { params: Promise<{ locale: string; document: string }> }) {
  const { locale, document } = await params;
  if (!locales.includes(locale as Locale) || !documents.includes(document as Document)) notFound();
  const content = copy[locale as Locale][document as Document];

  return <>
    <Header locale={locale as Locale} />
    <main className={styles.main} lang={locale}>
      <div className={styles.inner}>
        <Link className={styles.back} href={`/${locale}`}>{content.back}</Link>
        <h1 className={styles.title}>{content.title}</h1>
        <p className={styles.updated}>{content.updated}</p>
        <p className={styles.introduction}>{content.introduction}</p>
        {content.sections.map((section) => <section className={styles.section} key={section.heading}>
          <h2>{section.heading}</h2>
          {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>)}
      </div>
    </main>
    <Footer locale={locale as Locale} />
  </>;
}
