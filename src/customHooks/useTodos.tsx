import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { ITodo } from "../interfaces";
import { getTodos, setTodo } from "../localstorage";

export function useTodos(data?: {}) {
  const [todos, setTodos] = useState<ITodo[]>(() => {
    const todo = getTodos("todos");
    return todo;
  });
  const [isEditing, setIsEditing] = useState<string>("");
  const [priorityLevel, setPriorityLevel] = useState<string>("");

  useEffect(() => {
    setTodo("todos", todos);
  }, [todos]);

  const handleOnClick = useCallback((id: string) => (
    setIsEditing(id)
  ), [isEditing])

  const filterCategory = useCallback(
    (cate: string) => {
      return todos
        ?.filter(
          (todo: ITodo) =>
            todo.todoStatus?.trim().toLowerCase() === cate?.trim().toLowerCase()
        )
        ?.sort(
          (a: ITodo, b: ITodo) =>
            Number(b.priorityLevel) - Number(a.priorityLevel)
        );
    },
    [todos]
  );
  

  const addTodos = useCallback(
    (status: string) => {
      const todo: ITodo = {
        todoName: "hi",
        todo: "",
        todoId: uuidv4(),
        todoStatus: status,
        priorityLevel: "0",
        assignee: [],
      };

      handleOnClick(todo.todoId);
      setPriorityLevel(todo.priorityLevel);

      setTodos((prevTodos) => [...prevTodos, todo]);
    },
    [handleOnClick, setPriorityLevel, setTodos]
  );

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
