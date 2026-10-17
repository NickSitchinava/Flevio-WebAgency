import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { locales, type Locale } from "@/i18n/config";
import styles from "./legal.module.css";

const SITE_URL = "https://nicksitchinava.dev";
const documents = ["privacy", "terms"] as const;
type Document = (typeof documents)[number];

const copy: Record<Locale, Record<Document, {
  title: string;
  updated: string;
  introduction: string;
  sections: { heading: string; paragraphs: string[] }[];
  back: string;
}>> = {
  en: {
    privacy: {
      title: "Privacy Policy",
      updated: "Updated 17 October 2026",
      introduction: "Flevio is run by its founder, Nick Sitchinava. This notice explains what happens to information when you use this website or contact us.",
      sections: [
        { heading: "Information you share", paragraphs: ["If you contact us by email, WhatsApp, or Instagram, we receive the contact details, message, and any project information you choose to send. We use that information to reply and take the steps you request toward a possible project agreement. Sharing information is voluntary, but we need a way to contact you to reply.", "We keep inquiry messages while needed to handle the conversation and related follow-up, or longer when a legal obligation requires it. Our website host and the communication service you choose may process technical or message data, potentially outside Georgia, under their own terms."] },
        { heading: "The pricing calculator", paragraphs: ["Calculator choices and estimates are processed in your browser; the site does not send your selections to Flevio. For English-language estimates, the browser requests a GEL-to-USD exchange rate from open.er-api.com. That provider may receive ordinary technical request data, such as your IP address."] },
        { heading: "External services and future analytics", paragraphs: ["Links to WhatsApp, Instagram, and public project websites take you to services with their own privacy practices.", "Google Analytics and Google Search Console are planned but are not currently integrated into this website. Before enabling analytics collection, we will update this notice and provide any controls required by applicable law."] },
        { heading: "Your questions and rights", paragraphs: ["To ask about information you have sent us, or request access, correction, or deletion, email contact.devbynick@gmail.com. We will handle requests under applicable law."] },
      ],
      back: "Back to Flevio",
    },
    terms: {
      title: "Terms of Service",
      updated: "Updated 17 October 2026",
      introduction: "These terms cover use of the Flevio website. A client project is governed by its own agreed scope and terms.",
      sections: [
        { heading: "Website information", paragraphs: ["The services, project examples, and other material on this site are provided to help you learn about Flevio. They may change and do not create a client relationship on their own."] },
        { heading: "Pricing estimates", paragraphs: ["The calculator provides an early, non-binding estimate based on the options you select. Final pricing, timing, deliverables, and payment terms are confirmed separately after we discuss your project."] },
        { heading: "Projects and external links", paragraphs: ["Project names, images, and other creative material belong to their respective owners. Public project links and contact channels lead to third-party services, which operate under their own terms."] },
        { heading: "Contact", paragraphs: ["For questions about this website or these terms, email contact.devbynick@gmail.com."] },
      ],
      back: "Back to Flevio",
    },
  },
  ka: {
    privacy: {
      title: "კონფიდენციალურობის პოლიტიკა",
      updated: "განახლებულია 2026 წლის 17 ოქტომბერს",
      introduction: "Flevio-ს ხელმძღვანელობს მისი დამფუძნებელი ნიკ სიჭინავა. ეს დოკუმენტი განმარტავს, როგორ მუშავდება ინფორმაცია ვებსაიტის გამოყენებისას ან ჩვენთან დაკავშირებისას.",
      sections: [
        { heading: "თქვენ მიერ მოწოდებული ინფორმაცია", paragraphs: ["ელფოსტით, WhatsApp-ით ან Instagram-ით მოწერისას ვიღებთ თქვენს საკონტაქტო მონაცემებს, შეტყობინებას და პროექტის შესახებ იმ ინფორმაციას, რომელსაც თავად გვიზიარებთ. ამ ინფორმაციას ვიყენებთ პასუხისა და თქვენი მოთხოვნით შესაძლო პროექტის შეთანხმებისკენ ნაბიჯების გადადგმისთვის. ინფორმაციის გაზიარება ნებაყოფლობითია, თუმცა პასუხისთვის საკონტაქტო გზა გვჭირდება.", "შეტყობინებებს ვინახავთ მანამ, სანამ ეს საჭიროა მიმოწერისა და მასთან დაკავშირებული შემდგომი კომუნიკაციისთვის, ან უფრო დიდხანს, თუ ამას კანონი მოითხოვს. ვებსაიტის ჰოსტინგის პროვაიდერმა და თქვენ მიერ არჩეულმა საკომუნიკაციო სერვისმა შესაძლოა დაამუშაონ ტექნიკური ან შეტყობინების მონაცემები, მათ შორის საქართველოს ფარგლებს გარეთ, საკუთარი პირობების შესაბამისად."] },
        { heading: "ფასის კალკულატორი", paragraphs: ["კალკულატორის არჩევანი და შეფასება მუშავდება თქვენს ბრაუზერში; ვებსაიტი თქვენს პასუხებს Flevio-ს არ უგზავნის. ინგლისურენოვანი შეფასებისთვის ბრაუზერი GEL/USD გაცვლით კურსს იღებს open.er-api.com-დან. ამ სერვისმა შესაძლოა მიიღოს მოთხოვნის ჩვეულებრივი ტექნიკური მონაცემები, მაგალითად თქვენი IP მისამართი."] },
        { heading: "გარე სერვისები და სამომავლო ანალიტიკა", paragraphs: ["WhatsApp-ის, Instagram-ისა და საჯარო პროექტების ბმულები გადაგიყვანთ სერვისებზე, რომლებსაც საკუთარი კონფიდენციალურობის წესები აქვთ.", "Google Analytics-ისა და Google Search Console-ის დამატება დაგეგმილია, თუმცა ამჟამად ისინი ამ ვებსაიტში ინტეგრირებული არ არის. ანალიტიკური მონაცემების შეგროვებამდე განვაახლებთ ამ დოკუმენტს და, საჭიროების შემთხვევაში, დავამატებთ კანონით მოთხოვნილ მართვის საშუალებებს."] },
        { heading: "თქვენი კითხვები და უფლებები", paragraphs: ["ჩვენთვის გამოგზავნილი ინფორმაციის შესახებ კითხვისთვის, ასევე მასზე წვდომის, შესწორების ან წაშლის მოთხოვნისთვის მოგვწერეთ contact.devbynick@gmail.com-ზე. მოთხოვნებს განვიხილავთ მოქმედი კანონმდებლობის შესაბამისად."] },
      ],
      back: "Flevio-ზე დაბრუნება",
    },
    terms: {
      title: "მომსახურების პირობები",
      updated: "განახლებულია 2026 წლის 17 ოქტომბერს",
      introduction: "ეს პირობები ეხება Flevio-ს ვებსაიტის გამოყენებას. კლიენტის პროექტი განისაზღვრება ცალკე შეთანხმებული მოცულობითა და პირობებით.",
      sections: [
        { heading: "ვებსაიტის ინფორმაცია", paragraphs: ["სერვისები, პროექტების მაგალითები და სხვა მასალა დაგეხმარებათ Flevio-ს გაცნობაში. ინფორმაცია შეიძლება შეიცვალოს და თავისთავად არ წარმოშობს კლიენტთან სახელშეკრულებო ურთიერთობას."] },
        { heading: "ფასის შეფასება", paragraphs: ["კალკულატორი გაძლევთ წინასწარ, არასავალდებულო შეფასებას არჩეული პარამეტრების მიხედვით. საბოლოო ფასი, ვადები, შესასრულებელი სამუშაო და გადახდის პირობები პროექტის განხილვის შემდეგ ცალკე თანხმდება."] },
        { heading: "პროექტები და გარე ბმულები", paragraphs: ["პროექტების სახელები, სურათები და სხვა შემოქმედებითი მასალა ეკუთვნის მათ შესაბამის მფლობელებს. საჯარო პროექტებისა და საკონტაქტო არხების ბმულები გადაგიყვანთ მესამე მხარის სერვისებზე, რომლებსაც საკუთარი პირობები აქვთ."] },
        { heading: "კონტაქტი", paragraphs: ["ვებსაიტის ან ამ პირობების შესახებ კითხვებისთვის მოგვწერეთ contact.devbynick@gmail.com-ზე."] },
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
  if (!locales.includes(locale as Locale) || !documents.includes(document as Document)) return {};
  const title = copy[locale as Locale][document as Document].title;
  return {
    title: `${title} | Flevio`,
    alternates: {
      canonical: `${SITE_URL}/${locale}/legal/${document}`,
      languages: Object.fromEntries(locales.map((language) => [language, `${SITE_URL}/${language}/legal/${document}`])),
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
