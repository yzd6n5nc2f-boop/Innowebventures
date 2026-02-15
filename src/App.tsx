import { Navigate, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import Contact from "./pages/Contact";
import HowWeBuild from "./pages/HowWeBuild";
import Landing from "./pages/Landing";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import ServiceDetail from "./pages/ServiceDetail";
import Services from "./pages/Services";
import Work from "./pages/Work";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:slug" element={<ProductDetail />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:slug" element={<ServiceDetail />} />
      <Route path="/work" element={<Work />} />
      <Route path="/work/:slug" element={<CaseStudyDetail />} />
      <Route path="/how-we-build" element={<HowWeBuild />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/capabilities" element={<Navigate to="/how-we-build" replace />} />
      <Route path="*" element={<Landing />} />
    </Routes>
  );
}
