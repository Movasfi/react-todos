import TodoSectionHeader from "./TodoSectionHeader";
import type { ITodo } from "../interfaces/index";
import { memo, type Dispatch, type SetStateAction } from "react";
import TodoItem from "./TodoItem";

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
  return (
    <section className="flex flex-col w-full gap-5 justify-center items-start">
      <TodoSectionHeader
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        todoStatus={todoStatus}
        addTodos={addTodos}
        className="text-white text-2xls"
        text={sectionTextHeader}
      />
      <hr className=" w-80 text-red-500" />
      <TodoItem
      
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        setTodos={setTodos}
        todos={todos}
      />
    </section>
  );
};

export default memo(TodoSection);
