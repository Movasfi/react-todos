import { ThemeContext } from "../customHooks/ThemeContext";
import Input from "./Input";
import AppText from "./AppText";
import {
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import StatusDropdown from "./StatusDropdown";
import type { ITodo } from "../interfaces";

interface IProps {
  isError: boolean;
  setIsError: (val: boolean) => void;
  todos: ITodo[];
  isEditing: string;
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
  setIsEditing: (val: string) => void;
}

const TodoItem = ({
  isError,
  setIsError,
  setIsEditing,
  setTodos,
  todos,
  isEditing,
}: IProps) => {
  const [inputValue, setInputValue] = useState("");
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

  return (
    <div className="flex flex-col gap-2justify-center items-center">
      {renderTodos}
      {isError && (
        <AppText
          className="text-red-500 text-md"
          text="Enter something valid"
        />
      )}
    </div>
  );
};

export default TodoItem;
