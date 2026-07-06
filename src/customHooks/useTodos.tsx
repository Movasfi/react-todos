import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { ITodo } from "../interfaces";
import { getTodos, setTodo } from "../localstorage";

export function useTodos() {
  const [todos, setTodos] = useState<ITodo[]>(() => {
    const todo = getTodos("todos");
    return todo;
  });

  const [isEditing, setIsEditing] = useState<string>("");

  useEffect(() => {
    setTodo("todos", todos);
  }, [todos]);

  const handleOnClick = (id: string) => {
    setIsEditing(id);
  };

  const filterCategory = (cate: string) => {
    const todosItems = todos?.filter((da) => {
      if (da.todoStatus.trim().toLowerCase() === cate) {
        return da;
      }
      return false;
    });
    return todosItems;
  };

  const addTodos = (status: string) => {
    const todo: ITodo = {
      todoName: "hi",
      todo: ``,
      todoId: uuidv4(),
      todoStatus: status,
    };
    handleOnClick(todo.todoId);
    console.log(todo);

    setTodos([...todos, todo]);
  };

  return {
    isEditing,
    setTodos,
    setIsEditing,
    handleOnClick,
    inReviewItems: filterCategory("inreview"),
    inProgressItems: filterCategory("inprogress"),
    todosItems: filterCategory("todo"),
    doneItems: filterCategory("done"),
    canceledItems: filterCategory("canceled"),
    addTodos,
  };
}
