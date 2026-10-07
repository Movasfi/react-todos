import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  useCallback,
  useContext,
  // useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { type ITodo, TaskStatus, priorities } from "../interfaces";
import Input from "../components/Input";
import StatusDropdown from "../components/StatusDropdown";
// import { ThemeContext } from "../customHooks/ThemeContext";
import AppText from "../components/AppText";
import Swal from "sweetalert2";
import { AssigneeContext } from "./DataContext";

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

  // const themeStatus = useContext(ThemeContext);
  const showError = () => {
    Swal.fire({
      title: "Error",
      text: "Enter something  valid",
      icon: "error",
    });
  };



  const handelInputClick = useCallback(
    (id: string) => {
      const updatedValue = inputValue.trim();

      setTodos((prev) =>
        prev.map((data) =>
          data.todoId === id
            ? { ...data, todo: updatedValue }
            : data
        )
      );

      setIsEditing("");
    },
    [inputValue, setTodos, setIsEditing]
  );

  const valiaInput = useCallback((value: string) => {
    return value.trim().length > 0;
  }, []);

  const assigneesContext = useContext(AssigneeContext)
  const { newAssignee } = assigneesContext


  const renderTodos: ReactNode = todos?.map((todo: any) => {
    const isCurrentEditing = isEditing === todo.todoId;
    return (
      <div
        key={todo.todoId}
        className={`flex gap-3 justify-between w-full items-center  `}
      >
        <div className="flex justify-center gap-5 items-center">
          <StatusDropdown
            editUser={false}
            IconsObg={TaskStatus}
            todoId={todo.todoId}
            setTodos={setTodos}
            todoStatus={todo.todoStatus}
          />

          <StatusDropdown
            editUser={false}
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
              className={`p-3 outline-0  border rounded-md`}
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
          editUser={true}
          todos={todos}
          assignee={todo.assignee}
          priortyStatus={todo.priorityLevel}
          setTodos={setTodos}
          todoId={todo.todoId}
          todoStatus={todo.status}
          IconsObg={newAssignee}
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
