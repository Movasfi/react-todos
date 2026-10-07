import {
  useCallback,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import {
  type ITodo,
  priorities,
  TaskStatus,
} from "../interfaces";
import { AssigneeContext } from "./DataContext";

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

  const assigneesContext = useContext(AssigneeContext)
  const { newAssignee } = assigneesContext


  const dropDown = (data: Record<string, string>, showUsers: boolean) => {
    const renderOptions = Object.entries(data).map(([key, name]) => {
      const currentTodo = todos?.find((t) => t.todoId === todoId);
      const isAdded = currentTodo?.assignee.includes(key);

      return (
        <option
          key={key}
          value={key}
          className={`p-2 ${isAdded
            ? "bg-green-100 text-green-800 font-bold"
            : "text-gray-800"
            }`}
          hidden={key === "none"}
        >
          {isAdded ? `✓ ${name}` : name}
        </option>
      );
    });

    return (
      <>
        {renderOptions}

        {showUsers && (
          <option value="/users">
            Edit users
          </option>
        )}
      </>
    );
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


  const SelectValueElement = useMemo(() => {
    let value: string = "";
    if (todoStatus && Object.keys(IconsObg).includes(todoStatus)) {
      value = todoStatus;
    } else if (assignee && Object.keys(IconsObg).includes(assignee)) {
      value = assignee;
    } else {
      value = priortyStatus!;
    }
    return value;
  }, [todoStatus, assignee, priortyStatus, IconsObg])

  const updateStatusIcon = useCallback(
    (curStatus: string) => {
      setTodos((prev) =>
        prev.map((data) =>
          data.todoId === todoId
            ? { ...data, todoStatus: curStatus }
            : data
        )
      );
    },
    [todoId, setTodos]
  );

  const updatePriorityLevel = useCallback(
    (levelStatus: string) => {
      setTodos((prevTodos: ITodo[]) => {
        return prevTodos.map((data) => {
          if (
            data.todoId === todoId &&
            Object.keys(priorities).includes(levelStatus)
          ) {
            return {
              ...data,
              priorityLevel: levelStatus,
            };
          }

          return data;
        });
      });
    },
    [todoId, setTodos]
  );


  const updateAssignee = useCallback((assignee: string) => {
    setTodos((prevTodos: ITodo[]) => {
      return prevTodos.map((todo) => {
        if (todo.todoId === todoId && Object.keys(newAssignee).includes(assignee)) {

          const updatedAssignees = Array.from(new Set([...todo.assignee, assignee]));

          return {
            ...todo,
            assignee: updatedAssignees,
          };
        }
        return todo;
      });
    });
  }, [todoId, setTodos])


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
  const IconAssignees = Object.keys(newAssignee);



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
