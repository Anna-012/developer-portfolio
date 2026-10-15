import { BrowserRouter, Routes, Route } from "react-router-dom";

import HeroSection from "./sections/HeroSection/HeroSection";
import EditProfilePage from "./sections/HeroSection/EditProfilePage";

import Navbar from "./sections/Navbar/Navbar";
import MySkills from "./sections/MySkills/MySkills";
import AddSkills from "./sections/MySkills/AddSkills";

import MyProjects from "./sections/MyProjects/MyProjects";
import UploadProject from "./sections/MyProjects/UploadProject";
import EditProject from "./sections/MyProjects/EditProject";
import ProjectDetails from "./sections/MyProjects/ProjectDetails";

import ContactMe from "./sections/ContactMe/ContactMe";
import EditContact from "./sections/ContactMe/EditContact";

import Footer from "./sections/Footer/Footer";

import Education from "./sections/Education/Education";
import AddEducation from "./sections/Education/AddEducation";
import EditEducation from "./sections/Education/EditEducation";

import MyExperience from "./sections/MyExperience/MyExperience";
import AddExperience from "./sections/MyExperience/AddExperience";
import EditExperience from "./sections/MyExperience/EditExperience";

const Home = () => (
  <>
    <Navbar />
    <div id="home">
      <HeroSection />
    </div>

    <div id="experience">
      <MyExperience />
    </div>

    <div id="projects">
      <MyProjects />
    </div>

    <div id="skills">
      <MySkills />
    </div>

    <div id="education">
      <Education />
    </div>

    <div id="contact">
      <ContactMe />
    </div>

    <Footer />
  </>
);

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/edit-profile" element={<EditProfilePage />} />

      <Route path="/add-education" element={<AddEducation />} />
      <Route path="/edit-education/:id" element={<EditEducation />} />

      <Route path="/add-experience" element={<AddExperience />} />
      <Route path="/edit-experience/:id" element={<EditExperience />} />

      <Route path="/add-skills" element={<AddSkills />} />

      <Route path="/add-project" element={<UploadProject />} />
      <Route path="/edit-project/:id" element={<EditProject />} />
      <Route path="/edit-contact" element={<EditContact />} />
      <Route path="/project/:id" element={<ProjectDetails />} />
    </Routes>
  </BrowserRouter>
);

export default App;
