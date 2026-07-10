import {
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import {
  type ITodo,
  priorities,
  TaskStatus,
  Assignees,
  type Assignee,
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
  todos?: ITodo[];
}

export function useStatusDropdown({
  setTodos,
  todoId,
  priortyStatus,
  IconsObg,
  assignee,
  todoStatus,
  todos,
}: IProps) {
  const [isActive, setIsActive] = useState<boolean>(false);


  const dropDown = (data: Record<string, string>) => {
    const renderOptions: ReactNode = Object.entries(data).map(([key, name]) => {
      const currentTodo = todos?.find((t) => t.todoId === todoId);
      const isAdded = currentTodo?.assignee.includes(key);
      return (
        <>
          {Object.keys(Assignees).includes(key) ? (

            <>
              <option

                key={key}
                value={key}
                className={`p-2 ${isAdded ? "bg-green-100 text-green-800 font-bold" : "text-gray-800"}`}
                hidden={key === "none"}
              >
                {isAdded ? `✓ ${name}` : name}
              </option>

            </>
          ) : (
            <option key={key} value={key} className="bg-white text-gray-800 ">
              {name.slice(0, 3)}
              {name.slice(3, 16)}
            </option>
          )}
        </>
      );
    });
    return renderOptions;
  };

  const circelNamesStyle = (todos: ITodo[]) => {
    const curTodo = todos?.find((todo) => todo.todoId === todoId);

    if (curTodo) {
      return (
        <>
          {curTodo.assignee.map((name) => (
            <div
              key={name}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-pink-200 text-xs font-semibold text-slate-800 ring-2 ring-slate-900"
            >
              {name.slice(0, 1).toUpperCase()}
            </div>
          ))}
        </>
      );
    }
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
    setTodos((sta: ITodo[]) => {
      return sta.map((data) => {
        if (data.todoId === todoId && Object.keys(priorities).includes(levelStatus)) {
          return { ...data, priorityLevel: levelStatus };
        }
        return data;
      });
    });
  };


  const updateAssignee = (assignee: string) => {
    setTodos((prevTodos: ITodo[]) => {
      return prevTodos.map((todo) => {
        if (todo.todoId === todoId && Object.keys(Assignees).includes(assignee)) {

          const updatedAssignees = Array.from(new Set([...todo.assignee, assignee]));

          return {
            ...todo,
            assignee: updatedAssignees,
          };
        }
        return todo;
      });
    });
  };
  useEffect(() => {
    console.log(todos);

  })

  const deleteAssignee = (assignee: string) => {

    setTodos((data: ITodo[]) => {

      return data.map((todo) => {
        if (todo.todoId === todoId) {
          return {
            ...todo, assignee: todo.assignee.filter((persoon) => persoon !== assignee)
          }
        }
        return todo
      })
    })

  }

  const updateActiveStatus = () => {
    if (todos?.find((data) => data.assignee.length > 0 && data.todoId === todoId)) {
      setIsActive(true)
    }
    if (todos?.find((data) => data.assignee.length === 0 && data.todoId === todoId)) {
      setIsActive(false)
    }
  }
  const IconStatusKeys = Object.keys(TaskStatus);
  const IconPriorityKeys = Object.keys(priorities);
  const IconAssignees = Object.keys(Assignees);



  return {
    circelNamesStyle,
    IconStatusKeys,
    IconPriorityKeys,
    IconAssignees,
    updateAssignee,
    updateActiveStatus,
    updatePriorityLevel,
    dropDown,
    SelectValueElement,
    updateStatusIcon,
    setIsActive,
    isActive,
    deleteAssignee,
  };
}
