import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import ToDoList from "./ToDoList";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  // component runtime state for storing & updating list of ToDo items
  const [todos, setTodos] = useState([]);
  const todoTitleRef = useRef();

  // load ToDo items once on component load
  useEffect(() => {
    const savedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedTodos) setTodos(JSON.parse(savedTodos));
  }, []);

  // store ToDo items whenever they change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function handleAddTodo(e) {
    const name = todoTitleRef.current.value;
    if (name === "") return;

    todoTitleRef.current.value = null;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), title: name, completed: false }];
    });
  }

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  }

  function clearCompletedTodos() {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  }

  return (
    <>
      <ToDoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoTitleRef} />
      <button onClick={handleAddTodo}>Add</button>
      <button onClick={clearCompletedTodos}>Clear completed</button>
      <div>{todos.filter((todo) => !todo.completed).length} ToDos left</div>
    </>
  );
}

export default App;
