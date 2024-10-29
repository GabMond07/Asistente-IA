import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navigation } from "./Components/Navigation";
import Register from "./Pages/Register";
import Finance from "./Pages/Finance";
import Login from "./Pages/Login";

function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto" >
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/financeIA" />} />
          <Route path="/financeIA" element={<Finance />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;