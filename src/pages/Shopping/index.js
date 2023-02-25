import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import "./styles.css";

function Shopping() {
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  const handleCreateProduct = (e) => {
    e.preventDefault();

    if (totalProducts === 10) {
      alert("Você atingiu o número máximo de produtos no carrinho");
      navigate("/carrinho");
      return;
    }

    api
      .post("/product", {
        name: productName,
        price: productPrice,
      })
      .then(() => {
        alert("Cadastro realizado com sucesso!");

        navigate("/nova-venda");
      })
      .catch(() => {
        alert("Erro no cadastro!");
      });
  };

  useEffect(() => {
    api.get("/product").then((response) => {
      setTotalProducts(response.data.length);
    });
  }, []);

  return (
    <main>
      <div className="App">
        <h1 className="Text">Cadastre seu produto</h1>
        <form
          onSubmit={handleCreateProduct}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <input
            type="text"
            name="productName"
            id="productName"
            placeholder="Nome do Produto"
            onChange={(e) => {
              setProductName(e.target.value);
            }}
            style={{ textAlign: "center" }}
          />
          <input
            type="text"
            name="productPrice"
            id="productPrice"
            placeholder="Preço do Produto"
            onChange={(e) => {
              setProductPrice(e.target.value);
            }}
            style={{ textAlign: "center" }}
          />
          <button type="submit" style={{ marginTop: "10px" }}>
            Cadastrar Produto
          </button>
        </form>
      </div>
    </main>
  );
}

export default Shopping;
