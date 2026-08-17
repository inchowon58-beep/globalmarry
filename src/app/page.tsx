import Hero from "./components/Hero";
import Categories from "./components/Categories";
import About from "./components/About";
import Countries from "./components/Countries";
import Process from "./components/Process";
import Prevention from "./components/Prevention";
import Gallery from "./components/Gallery";
import FAQ from "./components/FAQ";
import ArticlesScroll from "./components/ArticlesScroll";
import ContactForm from "./components/ContactForm";
import AgencyBanner from "./components/AgencyBanner";
import { listPageSummaries } from "@/lib/seo-pages";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let pages: Awaited<ReturnType<typeof listPageSummaries>> = [];
  try {
    pages = await listPageSummaries();
  } catch {
    pages = [];
  }

  return (
    <>
      <Hero />
      <Categories />
      <About />
      <Countries />
      <Process />
      <Prevention />
      <Gallery />
      <FAQ />
      <ArticlesScroll pages={pages} />
      <section className="pb-8">
        <div className="container">
          <AgencyBanner />
        </div>
      </section>
      <ContactForm />
    </>
  );
}
