import StatusDropdown from "./StatusDropdown";
import TodoSectionHeader from "./TodoSectionHeader";
import type { ITodo } from "../interfaces/index";
import {
  useContext,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import Input from "./Input";
import AppText from "./AppText";
import { ThemeContext } from "../App";

interface IProps {
  sectionTextHeader: string;
  addTodos: (val: string) => void;
  todos: ITodo[];
  todoStatus?: string;
  setStatus: (val: string) => void;
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
}
const TodoSection = ({
  todoStatus,
  addTodos,
  todos,
  setStatus,
  setTodos,
  sectionTextHeader,
}: IProps) => {
  const themeStatus = useContext(ThemeContext);

  const [isEditing, setIsEditing] = useState<string>("");
  const inputValueRef = useRef<HTMLInputElement>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const handleOnClick = (id: string) => {
    setIsEditing(id);
  };

  const handelInputClick = (id: string) => {
    const updatedValue = inputValueRef.current?.value.trim()!;
    if (updatedValue !== "") {
      setTodos((todo: ITodo[]) => {
        return todo.map((data) => {
          if (data.todoId === id) {
            return { ...data, todo: updatedValue };
          }
          return data;
        });
      });
      setIsEditing("");
    } else {
      setIsError(true);
    }
  };

  useEffect(() => {
    inputValueRef.current?.focus();
  }, [isEditing]);

  const renderTodos: ReactNode = todos.map((todo) => {
    return (
      <div
        className={`flex   flex-col gap-3 justify-center items-center ${themeStatus ? "text-white" : "text-black"}`}
      >
        <div>
          <ol className="list-disc list-item">
            {isEditing === todo.todoId ? (
              <div>
                {isError && (
                  <AppText
                    className="text-red-500 text-md"
                    text="enter something valid"
                  />
                )}
                <Input
                  defaultValue={todo.todo}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handelInputClick(todo.todoId);
                    }
                  }}
                  onChange={(e) => {
                    if (inputValueRef.current?.value.length! > 0) {
                      setIsError(false);
                    }
                  }}
                  onBlur={() => {
                    handelInputClick(todo.todoId);
                  }}
                  onFocus={() => {
                    inputValueRef.current?.onfocus;
                  }}
                  ref={inputValueRef}
                  type="text"
                  id="todo"
                  label="Enter Somethins"
                  className="p-3 outline-0 text-black border rounded-md"
                />
              </div>
            ) : (
              <div>
                <StatusDropdown
                  todoId={todo.todoId}
                  setTodos={setTodos}
                  setStatus={setStatus}
                  todoStatus={todoStatus}
                />
                <p
                  className={``}
                  onClick={() => {
                    handleOnClick(todo.todoId);
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
    <section className="flex flex-col gap-5 justify-center items-start">
      <TodoSectionHeader
        setStatus={setStatus}
        todoStatus={todoStatus}
        addTodos={addTodos}
        className="text-white text-2xls"
        text={sectionTextHeader}
      />
      {renderTodos}
      <hr className=" w-80 text-red-500" />
    </section>
  );
};

export default TodoSection;
