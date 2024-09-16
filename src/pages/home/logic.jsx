import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const Logic = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState(() => {
    return localStorage.getItem("filter") || "all";
  });

  const [editingTodoId, setEditingTodoId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      return await response.json();
    },
  });

  useEffect(() => {
    if (!isFetching && isSuccess && data.length > 0) {
      setTodos([...data]);
      localStorage.setItem("todos", JSON.stringify(data));
    }
  }, [data, isFetching, isSuccess]);

  const changeCompleteHandler = (isSelected, todoId) => {
    const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    const tempTodos = [...todos];
    const tempTodosStored = [...storedTodos];
    const index = tempTodos.findIndex((item) => item.id === todoId);
    const indexStored = tempTodosStored.findIndex((item) => item.id === todoId);
    const updatedTodo = {
      ...tempTodos[index],
      completed: isSelected,
    };
    tempTodos[index] = updatedTodo;
    storedTodos[indexStored] = updatedTodo;
    setTodos([...tempTodos]);
    localStorage.setItem("todos", JSON.stringify(storedTodos));
  };

  const setFilterHandler = (filterType) => {
    setFilter(filterType);
    const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");

    if (filterType === "completed") {
      const filteredTodos = storedTodos.filter(
        (item) => item.completed === true
      );
      setTodos([...filteredTodos]);
    } else if (filterType === "incomplete") {
      const filteredTodos = storedTodos.filter(
        (item) => item.completed === false
      );
      setTodos([...filteredTodos]);
    } else {
      setTodos([...storedTodos]);
    }
  };

 const startEditing = (todoId, currentTitle) => {
  setEditingTodoId(todoId);
  setNewTitle(currentTitle);
};
  const saveTitleHandler = (todoId) => {
    const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    const tempTodos = [...todos];
    const tempTodosStored = [...storedTodos];
    const index = tempTodos.findIndex((item) => item.id === todoId);
    const indexStored = tempTodosStored.findIndex((item) => item.id === todoId);
    const updatedTodo = {
      ...tempTodos[index],
      title: newTitle,
    };
    tempTodos[index] = updatedTodo;
    storedTodos[indexStored] = updatedTodo;
    setTodos([...tempTodos]);
    localStorage.setItem("todos", JSON.stringify(storedTodos));
    setEditingTodoId(null);
  };

  return {
    todos,
    isFetching,
    isSuccess,
    changeCompleteHandler,
    setFilterHandler,
    startEditing,
    saveTitleHandler,
    filter,
    data,
    editingTodoId,
    newTitle,
    setNewTitle,
  };
};

export default Logic;
