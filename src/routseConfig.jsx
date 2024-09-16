import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} /> {/* 👈 Renders at /app/ */}
    </Routes>
  );
};

export default RoutesConfig;
