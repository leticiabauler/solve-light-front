import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Cart from "./pages/Cart";
import NewSale from "./pages/NewSale";
import Shopping from "./pages/Shopping";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Shopping />} />
        <Route path="/nova-venda" element={<NewSale />} />
        <Route path="/carrinho" element={<Cart />} />
      </Routes>
    </Router>
  );
}
