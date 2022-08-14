import { FaCheck, FaTrash } from "react-icons/fa";
import "./style.css";

export default function Item({ item, handleDelete, handleClick }) {
  return item.map((compras, index) => {
    return (
      <article key={index} className="items-container">
        <h3 style={compras.completed ? { textDecoration: "line-through" } : {}}>
          {compras.title}
        </h3>
        <div className="btn-container">
          <FaCheck
            onClick={() => handleClick(compras.id)}
            className="add-btn"
            size={18}
            color={"#2ecc71"}
          />
          <FaTrash
            onClick={() => handleDelete(compras.id)}
            className="delete-btn"
            size={18}
            color={"#da2f2f"}
          />
        </div>
      </article>
    );
  });
}
