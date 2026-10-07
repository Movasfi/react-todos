import type { ITodo } from "../interfaces";
import { useTodoItem } from "../customHooks/useTodoItem";
import { memo, type Dispatch, type SetStateAction } from "react";

interface IProps {
  todos: ITodo[];
  isEditing: string;
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
  setIsEditing: (val: string) => void;
}

const TodoItem = ({ setIsEditing, setTodos, todos, isEditing }: IProps) => {
  const { parent, renderTodos } = useTodoItem({
    setIsEditing,
    setTodos,

    isEditing,
    todos,
  });

  return (
    <div ref={parent} className="flex flex-col gap-4 w-full justify-start items-start">
      {renderTodos}
    </div>
  );
};

export default memo(TodoItem);
