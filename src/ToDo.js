import React from "react";

export default function ToDo({ todo, toggle }) {
  function handleToggle() {
    toggle(todo.id);
  }
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
        />
        {todo.title}
      </label>
    </div>
  );
}
