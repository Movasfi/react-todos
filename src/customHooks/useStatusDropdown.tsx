import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { ITodo } from "../interfaces";

interface IProps {
  todoId: string;
  todoStatus?: string;
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
}

export function useStatusDropdown({ setTodos, todoId, todoStatus }: IProps) {
  const TaskStatus = {
    inreview: "🙇 In Review",
    inprogress: "🏃 In Progress",
    todo: "📥 To Do",
    done: "☑️ Done",
    canceled: "🗑 Canceled",
  };

  const renderOptions: ReactNode = Object.entries(TaskStatus).map(
    ([key, name]) => {
      return (
        <option key={key} value={key} className="bg-white text-gray-800">
          {todoStatus === key ? name : name}
        </option>
      );
    },
  );

  const updateStatusIcon = (curStatus: string) => {
    setTodos((pre: ITodo[]) => {
      return pre.map((data) => {
        if (data.todoId === todoId) {
          return {
            ...data,
            todoStatus: curStatus,
          };
        }
        return data;
      });
    });
  };

  return {
    renderOptions,
    updateStatusIcon,
  };
}
