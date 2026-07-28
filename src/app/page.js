import Banner from "../components/Banner";
import ClientExperiences from "../components/ClientExperiences";
import CtaSection from "../components/CtaSection";
import FeatureProperties from "../components/FeatureProperties";
import TopLocations from "../components/TopLocations";
import WhyChooseUs from "../components/WhyChooseUs";

export default function Home() {
  return (
    <div className="bg-background">
      <Banner />
      <FeatureProperties />
      <WhyChooseUs />
      <TopLocations />
      <ClientExperiences />
      <CtaSection />
    </div>
  );
}
