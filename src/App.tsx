import { Navigate, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import HowWeBuild from "./pages/HowWeBuild";
import Landing from "./pages/Landing";
import Platform from "./pages/Platform";
import ProductDetail from "./pages/ProductDetail";
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
      <Route path="/forge-suite/:slug" element={<ProductDetail />} />
      <Route path="/products" element={<Navigate to="/solutions" replace />} />
      <Route path="/products/neuralforge" element={<Navigate to="/forge-suite/neuralforge" replace />} />
      <Route path="/products/forge-coder" element={<Navigate to="/forge-suite/forge-coder" replace />} />
      <Route path="/products/forgeops" element={<Navigate to="/forge-suite/forgeops" replace />} />
      <Route path="/products/forge-robotics-lab" element={<Navigate to="/forge-suite/forge-robotics-lab" replace />} />
      <Route path="/products/game-forge-studio" element={<Navigate to="/forge-suite/game-forge-studio" replace />} />
      <Route path="/products/forge-media-studio" element={<Navigate to="/forge-suite/forge-media-studio" replace />} />
      <Route path="/platform" element={<Platform />} />
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
      <Route path="/contact" element={<Contact />} />
      <Route path="/capabilities" element={<Navigate to="/platform" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
