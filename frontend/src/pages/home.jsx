import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import FeaturedCourses from "../components/home/FeaturedCourses";
import FeaturesSection from "../components/home/FeaturesSection";
import LearningJourney from "../components/home/LearningJourney";
import InternshipSection from "../components/home/InternshipSection";
import Testimonials from "../components/home/Testimonials";
import FAQ from "../components/home/FAQ";
import CTASection from "../components/home/CTASection";


const Home = () => {

  return (

    <div className="min-h-screen bg-white">

      <main>

        <HeroSection />

        <StatsSection />

        <FeaturedCourses />

        <FeaturesSection />

        <LearningJourney />

        <InternshipSection />

        <Testimonials />

        <FAQ />

        <CTASection />

      </main>



    </div>

  );

};


export default Home;