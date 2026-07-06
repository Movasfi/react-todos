import AppText from "./AppText";

import type { ITodo } from "../interfaces";
import { useTodoItem } from "../customHooks/useTodoItem";
import type { Dispatch, SetStateAction } from "react";

interface IProps {
  isError: boolean;
  setIsError: (val: boolean) => void;
  todos: ITodo[];
  isEditing: string;
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
  setIsEditing: (val: string) => void;
}

const TodoItem = ({
  isError,
  setIsError,
  setIsEditing,
  setTodos,
  todos,
  isEditing,
}: IProps) => {
  const {  parent ,renderTodos } = useTodoItem({
    setIsEditing,
    setTodos,
    isEditing,
    isError,
    setIsError,
    todos,
  });

  return (
    <div
      ref={parent}
      className="flex flex-col gap-2justify-center items-center"
    >
      {renderTodos}
      {isError && (
        <AppText
          className="text-red-500 text-md"
          text="Enter something valid"
        />
      )}
    </div>
  );
};

export default TodoItem;
