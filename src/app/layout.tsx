import type { Metadata, Viewport } from "next";
import { SITE, absoluteUrl } from "@/lib/site";
import { faqJsonLd, orgJsonLd } from "@/lib/faq-data";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FixedCTA from "./components/FixedCTA";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: `${SITE.name} | 국제결혼 정보·정식등록업체`,
    template: `%s | ${SITE.brand}`,
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: absoluteUrl("/"),
    siteName: SITE.name,
    title: `${SITE.name} | 국제결혼 정보·정식등록업체`,
    description: SITE.description,
    images: [
      {
        url: SITE.logo,
        width: 1200,
        height: 630,
        alt: `${SITE.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | 국제결혼 정보·정식등록업체`,
    description: SITE.description,
    images: [SITE.logo],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  other: {
    "msapplication-TileColor": "#16324f",
    "naver-site-verification": "6e8f401b647dbef4e99061afb708c9a4702777ef",
  },
};

export const viewport: Viewport = {
  themeColor: "#16324f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const org = orgJsonLd();
  const faq = faqJsonLd();
  return (
    <html lang="ko">
      <head>
        <meta
          name="naver-site-verification"
          content="6e8f401b647dbef4e99061afb708c9a4702777ef"
        />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://image.cattery.co.kr" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700;800&display=swap"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${SITE.name} RSS`}
          href="/rss.xml"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${SITE.name} Feed`}
          href="/feed"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <FixedCTA />
      </body>
    </html>
  );
}
