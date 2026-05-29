import { Navigate, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import HowWeBuild from "./pages/HowWeBuild";
import Landing from "./pages/Landing";
import Platform from "./pages/Platform";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import ServiceDetail from "./pages/ServiceDetail";
import Services from "./pages/Services";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/forge-suite" element={<Products />} />
      <Route path="/forge-suite/:slug" element={<ProductDetail />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:slug" element={<ProductDetail />} />
      <Route path="/platform" element={<Platform />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:slug" element={<ServiceDetail />} />
      <Route path="/work" element={<Navigate to="/platform" replace />} />
      <Route path="/work/:slug" element={<Navigate to="/platform" replace />} />
      <Route path="/how-it-works" element={<HowWeBuild />} />
      <Route path="/how-we-build" element={<HowWeBuild />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/capabilities" element={<Navigate to="/platform" replace />} />
      <Route path="*" element={<Landing />} />
    </Routes>
  );
}
