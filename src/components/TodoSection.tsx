import TodoSectionHeader from "./TodoSectionHeader";
import type { ITodo } from "../interfaces/index";
import { type Dispatch, type SetStateAction } from "react";
import TodoItem from "./TodoItem";
import { useError } from "../customHooks/useErros";

interface IProps {
  isEditing: string;
  setIsEditing: (val: string) => void;
  sectionTextHeader: string;
  addTodos: (val: string) => void;
  todos: ITodo[];
  todoStatus?: string;
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
}
const TodoSection = ({
  todoStatus,
  addTodos,
  isEditing,
  setIsEditing,
  todos,
  setTodos,
  sectionTextHeader,
}: IProps) => {
  const { isError, setIsError } = useError();
  return (
    <section className="flex flex-col gap-5 justify-center items-start">
      <TodoSectionHeader
        isError={isError}
        setIsError={setIsError}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        todoStatus={todoStatus}
        addTodos={addTodos}
        className="text-white text-2xls"
        text={sectionTextHeader}
      />
      <hr className=" w-80 text-red-500" />
      <TodoItem
        isError={isError}
        setIsError={setIsError}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        setTodos={setTodos}
        todos={todos}
      />
    </section>
  );
};

export default TodoSection;
