import { Route, Routes } from "react-router-dom";
import Capabilities from "./pages/Capabilities";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Work from "./pages/Work";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/capabilities" element={<Capabilities />} />
      <Route path="/login" element={<Login />} />
      <Route path="/work" element={<Work />} />
      <Route path="*" element={<Landing />} />
    </Routes>
  );
}
