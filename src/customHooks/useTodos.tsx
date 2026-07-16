import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { ITodo } from "../interfaces";
import { getTodos, setTodo } from "../localstorage";

export function useTodos(data?: {}) {
  const [todos, setTodos] = useState<ITodo[]>(() => {
    const todo = getTodos("todos");
    return todo;
  });
  useEffect(() => {
    console.log("usetodos", todos);
  })
  const [isEditing, setIsEditing] = useState<string>("");
  const [priorityLevel, setPriorityLevel] = useState<string>("");

  useEffect(() => {
    setTodo("todos", todos);
  }, [todos]);

  const handleOnClick = (id: string) => {
    setIsEditing(id);
  };

  const filterCategory = (cate: string) => {
    const todosItems = todos?.filter((da: ITodo) => {
      if (da.todoStatus.trim().toLowerCase() === cate) {
        return da;
      }
      return false;
    })
      .sort((a: ITodo, b: ITodo) => {
        const rsult = Number(b.priorityLevel) - Number(a.priorityLevel);
        return rsult;
      });
    return todosItems;
  };

  const addTodos = (status: string) => {
    const todo: ITodo = {
      todoName: "hi",
      todo: ``,
      todoId: uuidv4(),
      todoStatus: status,
      priorityLevel: "0",
      assignee: [],
    };
    handleOnClick(todo.todoId);
    console.log(todo);
    setPriorityLevel(todo.priorityLevel);
    setTodos([...todos, todo]);
  };

  return {
    isEditing,
    setTodos,
    todos,
    data,
    setIsEditing,
    priorityLevel,
    setPriorityLevel,
    handleOnClick,
    inReviewItems: filterCategory("inreview"),
    inProgressItems: filterCategory("inprogress"),
    todosItems: filterCategory("todo"),
    doneItems: filterCategory("done"),
    canceledItems: filterCategory("canceled"),
    addTodos,
  };
}
