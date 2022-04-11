import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SetApiToken from "./pages/SetApiToken";
import "./styles/index.css";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <nav>
          <Link to="/">SetApiToken</Link>
        </nav>

        <Routes>
          <Route path="/" element={<SetApiToken />} />
          <Route path="/*" element={<SetApiToken />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
