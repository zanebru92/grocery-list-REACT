import { useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import "./App.css";
import Item from "./components/Item";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [input, setInput] = useState("");
  const [compra, setCompra] = useState([
    {
      title: "arroz",
      id: "1",
      completed: true,
    },
    {
      title: "feijão",
      id: "2",
      completed: false,
    },
  ]);

  useEffect(() => {
    const storedItems = localStorage.getItem("item");
    setCompra(JSON.parse(storedItems) || []);
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleAdd = () => {
    if (input) {
      const newItems = [
        ...compra,
        { title: input, id: `${compra.length + 1}`, completed: false },
      ];
      setCompra(newItems);
      setInput("");
      localStorage.setItem("item", JSON.stringify(newItems));
      toast.success("Item adicionado com sucesso");
    } else {
      toast.error("Adicione um item");
    }
  };
  const handleClick = (taskId) => {
    const selected = compra.map((item) => {
      if (item.id == taskId) return { ...item, completed: !item.completed };
      return item;
    });

    setCompra(selected);
  };

  const handleDelete = (id) => {
    const filteredItems = compra.filter((item) => {
      return item.id !== id;
    });
    setCompra(filteredItems);
    localStorage.setItem("item", JSON.stringify(filteredItems));
    toast.success("Item removido com sucesso");
  };

  return (
    <section className="principal">
      <h4>Lista de Compras</h4>

      <div className="input-area">
        <input
          value={input}
          onChange={handleChange}
          type="text"
          placeholder="Ex: arroz"
        />

        <FaCartPlus
          onClick={handleAdd}
          style={{ cursor: "pointer" }}
          size={28}
          color={"#2ecc71"}
        />
      </div>
      <Item
        handleClick={handleClick}
        handleDelete={handleDelete}
        item={compra}
      />
      <ToastContainer autoClose={2000} />
    </section>
  );
}

export default App;
