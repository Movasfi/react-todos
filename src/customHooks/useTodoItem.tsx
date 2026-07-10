import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { type ITodo, TaskStatus, priorities, Assignees } from "../interfaces";
import Input from "../components/Input";
import StatusDropdown from "../components/StatusDropdown";
import { ThemeContext } from "../customHooks/ThemeContext";
import AppText from "../components/AppText";
import Swal from "sweetalert2";

interface IProps {
  todos: ITodo[];
  isEditing: string;
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
  setIsEditing: (val: string) => void;
}

export function useTodoItem({
  setIsEditing,
  setTodos,
  isEditing,
  todos,
}: IProps) {
  const [parent] = useAutoAnimate({ duration: 600, easing: "linear" });
  const [inputValue, setInputValue] = useState("");

  const themeStatus = useContext(ThemeContext);
  const showError = () => {
    Swal.fire({
      title: "Error",
      text: "Enter something  valid",
      icon: "error",
    });
  };

  const handelInputClick = (id: string) => {
    const updatedValue = inputValue.trim();

    setTodos((pre) => {
      return pre.map((data: ITodo) => {
        if (data.todoId === id) {
          return { ...data, todo: updatedValue };
        }
        return data;
      });
    });

    setIsEditing("");
  };

  const valiaInput = (value: string) => {
    if (value.trim().length > 0) {
      return true;
    }
    return false;
  };

  const renderTodos: ReactNode = todos?.map((todo: any) => {
    const isCurrentEditing = isEditing === todo.todoId;
    return (
      <div
        key={todo.todoId}
        className={`flex gap-3 justify-between w-full items-center  ${themeStatus ? "text-white" : "text-black"}`}
      >
        <div className="flex justify-center gap-5 items-center">
          <StatusDropdown
            IconsObg={TaskStatus}
            todoId={todo.todoId}
            setTodos={setTodos}
            todoStatus={todo.todoStatus}
          />

          <StatusDropdown
            priortyStatus={todo.priorityLevel}
            setTodos={setTodos}
            todoId={todo.todoId}
            todoStatus={todo.status}
            IconsObg={priorities}
          />


          {isCurrentEditing ? (
            <Input
              autoFocus
              onKeyUpCapture={(e) => {
                if (e.key === "Enter") {
                  const result = valiaInput(e.currentTarget.value);
                  if (result) {
                    setInputValue(e.currentTarget.value);
                    handelInputClick(todo.todoId);
                  } else {
                    showError();
                  }
                }
              }}
              onChange={(e) => {
                if (valiaInput(e.currentTarget.value)) {
                  setInputValue(e.currentTarget.value);
                }
              }}
              onBlur={(e) => {
                const result = valiaInput(e.currentTarget.value);
                if (result) {
                  setInputValue(e.currentTarget.value);
                  handelInputClick(todo.todoId);
                } else {
                  showError();
                }
              }}
              type="text"
              id="todo"
              className={`p-3 outline-0 ${!themeStatus ? "text-black" : "text-white"}  border rounded-md`}
            />
          ) : (
            <AppText
              className=""
              onClick={() => setIsEditing(todo.todoId)}
              text={todo.todo}
            />
          )}
        </div>

        <StatusDropdown
          todos={todos}
          assignee={todo.assignee}
          priortyStatus={todo.priorityLevel}
          setTodos={setTodos}
          todoId={todo.todoId}
          todoStatus={todo.status}
          IconsObg={Assignees}
        />

      </div >
    );
  });
  return {
    setInputValue,
    valiaInput,
    handelInputClick,
    showError,
    parent,
    renderTodos,
  };
}
