import React from "react";
import { useNavigate } from "react-router-dom";

import "./styles.css";

function NewSale() {
  const navigate = useNavigate();

  return (
    <main>
      <div className="App">
        <button onClick={() => navigate("/")}>Continuar Comprando</button>
        <button
          onClick={() => navigate("/carrinho")}
          style={{ marginTop: "12px" }}
        >
          Finalizar Compra
        </button>
      </div>
    </main>
  );
}

export default NewSale;
