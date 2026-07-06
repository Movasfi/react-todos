import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { ITodo } from "../interfaces";
import Input from "../components/Input";
import StatusDropdown from "../components/StatusDropdown";
import { ThemeContext } from "../customHooks/ThemeContext";

interface IProps {
  isError: boolean;
  setIsError: (val: boolean) => void;
  todos: ITodo[];
  isEditing: string;
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
  setIsEditing: (val: string) => void;
}

export function useTodoItem({
  setIsEditing,
  setTodos,
  isEditing,
  setIsError,
  todos,
}: IProps) {
  const [inputValue, setInputValue] = useState("");
  const [parent] = useAutoAnimate({ duration: 600, easing: "linear" });

  const themeStatus = useContext(ThemeContext);

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
    if (value.length > 0) {
      return true;
    }
    return false;
  };

  const renderTodos: ReactNode = todos?.map((todo: any) => {
    const isCurrentEditing = isEditing === todo.todoId;
    return (
      <div
        key={todo.todoId}
        className={`flex   flex-col gap-3 justify-center items-center ${themeStatus ? "text-white" : "text-black"}`}
      >
        <div>
          <ol className="list-disc list-item">
            {isCurrentEditing ? (
              <div>
                <Input
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const result = valiaInput(e.currentTarget.value);
                      if (result) {
                        setInputValue(e.currentTarget.value);
                        handelInputClick(todo.todoId);
                      } else {
                        setIsError(true);
                      }
                    }
                  }}
                  onChange={(e) => {
                    if (e.currentTarget.value.length > 0) {
                      setInputValue(e.currentTarget.value);
                      setIsError(false);
                    } else {
                      setIsError(true);
                    }
                  }}
                  onBlur={(e) => {
                    const result = valiaInput(e.currentTarget.value);
                    if (result) {
                      setInputValue(e.currentTarget.value);
                      handelInputClick(todo.todoId);
                    } else {
                      setIsError(true);
                    }
                  }}
                  type="text"
                  id="todo"
                  label="Enter Somethins"
                  className={`p-3 outline-0 ${!themeStatus ? "text-black" : "text-white"}  border rounded-md`}
                />
              </div>
            ) : (
              <div>
                <StatusDropdown
                  todoId={todo.todoId}
                  setTodos={setTodos}
                  todoStatus={todo.todoStatus}
                />
                <p
                  className={``}
                  onClick={() => {
                    setIsEditing(todo.todoId);
                  }}
                >
                  {todo.todo}
                </p>
              </div>
            )}
          </ol>
        </div>
      </div>
    );
  });
  return { setInputValue, valiaInput, handelInputClick, parent, renderTodos };
}
