import {
  useContext,
  useEffect,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { type ITodo } from "../interfaces";
import { Priority } from "./PriorityContext";

interface IProps {
  todoId: string;
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
}

export function useStatusDropdown({ setTodos, todoId }: IProps) {
  const Priorty: string = useContext(Priority);

  const dropDown = (data: Record<string, string>, value: string) => {
    const renderOptions: ReactNode = Object.entries(data).map(([key, name]) => {
      const isSelected = key === value;
      return (
        <option key={key} value={key} className="bg-white text-gray-800">
          {isSelected ? name : name}
        </option>
      );
    });
    return renderOptions;
  };

  useEffect(() => {
    console.log(Priorty);
  });
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

  const updatePriorityLevel = (levelStatus: string) => {
    console.log(levelStatus);
    setTodos((sta: ITodo[]) => {
      return sta.map((data) => {
        if (data.todoId === todoId) {
          return { ...data, priorityLevel: levelStatus };
        }
        return data;
      });
    });
  };

  return {
    Priorty,
    updatePriorityLevel,
    dropDown,
    updateStatusIcon,
  };
}
