import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Preloader from "@/components/Preloader";
import RequireAuth from "./components/RequireAuth";

const Index = lazy(() => import("@/pages/Index"));
const About = lazy(() => import("@/pages/auth/About"));
const Team = lazy(() => import("@/pages/auth/Team"));
const Projects = lazy(() => import("@/pages/auth/Projects"));
const ProjectDetails = lazy(() => import("@/pages/auth/ProjectDetails"));
const Compliance = lazy(() => import("@/pages/auth/Compliance"));
const Contact = lazy(() => import("@/pages/auth/Contact"));
const Login = lazy(() => import("@/pages/auth/Login"));
const OTP = lazy(() => import("@/pages/auth/OTP"));
const RealEstate = lazy(() => import("@/pages/auth/services/RealEstate"));
const Healthcare = lazy(() => import("@/pages/auth/services/Healthcare"));
const Technology = lazy(() => import("@/pages/auth/services/Technology"));
const Procurement = lazy(() => import("@/pages/auth/services/Procurement"));

const Dashboard = lazy(() => import("@/pages/Dashboard"));

const TeamList = lazy(() => import("@/pages/team/List"));
const TeamAdd = lazy(() => import("@/pages/team/Form"));
const TeamEdit = lazy(() => import("@/pages/team/Form"));

const ProjectsList = lazy(() => import("@/pages/projects/List"));
const ProjectsAdd = lazy(() => import("@/pages/projects/Form"));
const ProjectsEdit = lazy(() => import("@/pages/projects/Form"));

const TestimoniesList = lazy(() => import("@/pages/testimony/List"));
const TestimoniesAdd = lazy(() => import("@/pages/testimony/Form"));
const TestimoniesEdit = lazy(() => import("@/pages/testimony/Form"));

const NotFound = lazy(() => import("@/pages/auth/NotFound"));

export default function Routers() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Preloader />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/:id/:name" element={<ProjectDetails />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/services/real-estate" element={<RealEstate />} />
          <Route path="/services/healthcare" element={<Healthcare />} />
          <Route path="/services/technology" element={<Technology />} />
          <Route path="/services/procurement" element={<Procurement />} />

          <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />

          <Route path="/teams/all" element={<RequireAuth><TeamList /></RequireAuth>} />
          <Route path="/teams/add" element={<RequireAuth><TeamAdd /></RequireAuth>} />
          <Route path="/teams/edit/:id/:name" element={<RequireAuth><TeamEdit /></RequireAuth>} />

          <Route path="/projects/all" element={<RequireAuth><ProjectsList /></RequireAuth>} />
          <Route path="/projects/add" element={<RequireAuth><ProjectsAdd /></RequireAuth>} />
          <Route path="/projects/edit/:id/:name" element={<RequireAuth><ProjectsEdit /></RequireAuth>} />

          <Route path="/testimonies/all" element={<RequireAuth><TestimoniesList /></RequireAuth>} />
          <Route path="/testimonies/add" element={<RequireAuth><TestimoniesAdd /></RequireAuth>} />
          <Route path="/testimonies/edit/:id/:name" element={<RequireAuth><TestimoniesEdit /></RequireAuth>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
