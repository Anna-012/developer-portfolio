import HeroSection from "./sections/HeroSection/HeroSection";
import Navbar from "./sections/Navbar/Navbar";
import MySkills from "./sections/MySkills/MySkills";
import MyProjects from "./sections/MyProjects/MyProjects";
import MyExperience from "./sections/MyExperience/MyExperience";
import ContactMe from "./sections/ContactMe/ContactMe";
import Footer from "./sections/Footer/Footer";
import Education from "./sections/Education/Education";

const App = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Education />
      <MySkills />
      <MyProjects />
      <MyExperience />
      <ContactMe />
      <Footer />
    </div>
  );
};

export default App;
