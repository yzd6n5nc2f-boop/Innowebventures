import Sectors from "./pages/Sectors";
import EquipmentSector from "./pages/EquipmentSector";
import EquipmentCaseStudy from "./pages/EquipmentCaseStudy";
import { Navigate, Route, Routes } from "react-router-dom";
import AiReadinessAssessment from "./pages/AiReadinessAssessment";
import WorkflowAssessment from "./pages/WorkflowAssessment";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import HowWeBuild from "./pages/HowWeBuild";
import Landing from "./pages/Landing";
import Platform from "./pages/Platform";
import Products from "./pages/Products";
import ServiceDetail from "./pages/ServiceDetail";
import Services from "./pages/Services";
import Work from "./pages/Work";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/solutions" element={<Products />} />
      <Route path="/forge-suite" element={<Products />} />
      <Route path="/forge-suite/neuralforge" element={<Navigate to="/forge-suite" replace />} />
      <Route path="/forge-suite/forge-coder" element={<Navigate to="/forge-suite" replace />} />
      <Route path="/forge-suite/forgeops" element={<Navigate to="/forge-suite" replace />} />
      <Route path="/forge-suite/forge-robotics-lab" element={<Navigate to="/forge-suite" replace />} />
      <Route path="/forge-suite/game-forge-studio" element={<Navigate to="/forge-suite" replace />} />
      <Route path="/forge-suite/forge-media-studio" element={<Navigate to="/forge-suite" replace />} />
      <Route path="/products" element={<Navigate to="/solutions" replace />} />
      <Route path="/products/neuralforge" element={<Navigate to="/forge-suite" replace />} />
      <Route path="/products/forge-coder" element={<Navigate to="/forge-suite" replace />} />
      <Route path="/products/forgeops" element={<Navigate to="/forge-suite" replace />} />
      <Route path="/products/forge-robotics-lab" element={<Navigate to="/forge-suite" replace />} />
      <Route path="/products/game-forge-studio" element={<Navigate to="/forge-suite" replace />} />
      <Route path="/products/forge-media-studio" element={<Navigate to="/forge-suite" replace />} />
      <Route path="/platform" element={<Platform />} />
      <Route path="/sectors" element={<Sectors />} />
      <Route path="/sectors/equipment-suppliers-installers" element={<EquipmentSector />} />
      <Route path="/case-studies/coffee-equipment-management" element={<EquipmentCaseStudy />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:slug" element={<ServiceDetail />} />
      <Route path="/work" element={<Work />} />
      <Route path="/work/operational-build-layer" element={<Navigate to="/work" replace />} />
      <Route path="/work/governed-runtime-operations" element={<Navigate to="/work" replace />} />
      <Route path="/work/specialised-intelligence-layer" element={<Navigate to="/work" replace />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/delivery-method" element={<HowWeBuild />} />
      <Route path="/how-it-works" element={<Navigate to="/delivery-method" replace />} />
      <Route path="/how-we-build" element={<Navigate to="/delivery-method" replace />} />
      <Route path="/about" element={<About />} />
      <Route path="/ai-readiness-assessment" element={<AiReadinessAssessment />} />
      <Route path="/workflow-assessment" element={<WorkflowAssessment />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/capabilities" element={<Navigate to="/platform" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
