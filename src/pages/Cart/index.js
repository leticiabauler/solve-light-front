import React, { useEffect, useState, useCallback } from "react";
import api from "../../services/api";

import "./styles.css";

const bankNotes = [100, 50, 20, 10, 5, 2, 1];

function Cart() {
  const [productsList, setProductsList] = useState([]);
  const [total, setTotal] = useState(0);

  const handleTotal = useCallback(() => {
    setTotal(
      productsList
        .reduce((accumulator, currentValue) => {
          return currentValue.price + accumulator;
        }, 0)
        .toFixed(2)
    );
  }, [productsList]);

  const handleRemoveProduct = (id) => {
    api
      .delete(`/product/${id}`)
      .then(() => {
        alert("Produto removido com sucesso!");
      })
      .catch(() => {
        alert("Não foi possível remover o produto");
      });
  };

  useEffect(() => {
    handleTotal();
  }, [handleTotal]);

  const handleBankNote = () => {
    let currentTotal = total;

    return bankNotes.map((bankNote) => {
      let bankNotesQuantity = parseInt(currentTotal / bankNote);
      currentTotal -= bankNotesQuantity * bankNote;

      return bankNotesQuantity !== 0 ? (
        <p key={bankNote}>{`${bankNotesQuantity} nota(s) de R$ ${bankNote}`}</p>
      ) : null;
    });
  };

  useEffect(() => {
    api.get("/product").then((response) => {
      setProductsList(response.data);
    });
  }, [productsList]);
  return (
    <main>
      <div className="App">
        {productsList.map((product) => {
          return (
            <div
              key={product._id}
              style={{ display: "flex", alignItems: "center" }}
              className="productList"
            >
              <h3>{product.name} -</h3>
              <h3 style={{ marginLeft: "8px", marginRight: "8px" }}>
                R$ {product.price.toFixed(2)}
              </h3>
              <button
                onClick={() => handleRemoveProduct(product._id)}
                className="button"
              >
                Remover
              </button>
            </div>
          );
        })}
        <h2>Total: {total}</h2>

        <h3>As cédulas mínimas para o pagamento são: </h3>
        {handleBankNote(total)}
      </div>
    </main>
  );
}

export default Cart;
