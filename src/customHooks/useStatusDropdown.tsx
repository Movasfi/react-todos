import { type Dispatch, type ReactNode, type SetStateAction } from "react";
import {
  type ITodo,
  type Assignee,
  priorities,
  TaskStatus,
  Assignees,
} from "../interfaces";

interface IProps {
  todoId: string;
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
  todoStatus?: string;
  IconsObg: {
    [key: string]: string;
  };
  assignee?: string;
  priortyStatus?: string;
}

export function useStatusDropdown({
  setTodos,
  todoId,
  priortyStatus,
  IconsObg,
  assignee,
  todoStatus,
}: IProps) {
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

  const SelectValueElement = () => {
    let value: string = "";
    if (todoStatus && Object.keys(IconsObg).includes(todoStatus)) {
      value = todoStatus;
    } else if (assignee && Object.keys(IconsObg).includes(assignee)) {
      value = assignee;
    } else {
      value = priortyStatus!;
    }
    return value;
  };

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

  const updateAssignee = (assignee: string) => {
    console.log(assignee);
    setTodos((sta: ITodo[]) => {
      return sta.map((data) => {
        if (data.todoId === todoId) {
          return { ...data, assignee: assignee.toLowerCase() as Assignee };
        }
        return data;
      });
    });
  };

  const IconStatusKeys = Object.keys(TaskStatus);
  const IconPriorityKeys = Object.keys(priorities);
  const IconAssignees = Object.keys(Assignees);

  return {
    IconStatusKeys,
    IconPriorityKeys,
    IconAssignees,
    updateAssignee,
    updatePriorityLevel,
    dropDown,
    SelectValueElement,
    updateStatusIcon,
  };
}
