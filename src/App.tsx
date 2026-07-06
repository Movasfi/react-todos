import TodoSection from "./components/TodoSection";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { ITodo } from "./interfaces/index";
import Header from "./components/Header";
import { ThemeContext } from "./customHooks/ThemeContext";
import { getTodos, setTodo, setTheme, getTheme } from "./localstorage";

function App() {
  const [todos, setTodos] = useState<ITodo[]>(() => {
    const todo = getTodos("todos");
    return todo;
  });
  const [isDark, setIsDark] = useState<boolean>(() => {
    const theme = getTheme("theme");
    return theme;
  });
  const [isEditing, setIsEditing] = useState<string>("");

  useEffect(() => {
    setTodo("todos", todos);
  }, [todos]);

  useEffect(() => {
    setTheme("theme", isDark);
  }, [isDark]);

  const handleOnClick = (id: string) => {
    setIsEditing(id);
  };
  const todosItems = todos?.filter((da) => {
    if (da.todoStatus.trim().toLowerCase() === "todo") {
      return da;
    }
    false;
  });

  const inReviewItems = todos?.filter((da) => {
    if (da.todoStatus.trim().toLowerCase() === "inreview") {
      return da;
    }
    false;
  });

  const inProgressItems = todos?.filter((da) => {
    if (da.todoStatus.trim().toLowerCase() === "inprogress") {
      return da;
    }
    false;
  });
  const canceledItems = todos?.filter((da) => {
    if (da.todoStatus.trim().toLowerCase() === "canceled") {
      return da;
    }
    false;
  });
  const doneItems = todos?.filter((da) => {
    if (da.todoStatus.trim().toLowerCase() === "done") {
      return da;
    }
    false;
  });

  const addTodos = (status: string) => {
    const todo: ITodo = {
      todoName: "hi",
      todo: ``,
      todoId: uuidv4(),
      todoStatus: status,
    };
    handleOnClick(todo.todoId);
    console.log(todo);

    setTodos([...todos, todo]);
  };

  return (
    <ThemeContext value={isDark}>
      <div
        className={`min-h-screen w-full p-8 flex flex-col gap-10 ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"} `}
      >
        <header>
          <Header setIsDark={setIsDark} />
        </header>

        <main className="flex flex-col gap-10">
          <TodoSection
            isEditing={isEditing}
            setIsEditing={handleOnClick}
            setTodos={setTodos}
            todoStatus="inreview"
            todos={inReviewItems}
            addTodos={addTodos}
            sectionTextHeader="In Review"
          />
          <TodoSection
            isEditing={isEditing}
            setIsEditing={handleOnClick}
            setTodos={setTodos}
            todoStatus="inprogress"
            todos={inProgressItems}
            addTodos={addTodos}
            sectionTextHeader="In Progress"
          />
          <TodoSection
            isEditing={isEditing}
            setIsEditing={handleOnClick}
            setTodos={setTodos}
            todoStatus="todo"
            todos={todosItems}
            addTodos={addTodos}
            sectionTextHeader="To Do"
          />
          <TodoSection
            isEditing={isEditing}
            setIsEditing={handleOnClick}
            setTodos={setTodos}
            todoStatus="done"
            todos={doneItems}
            addTodos={addTodos}
            sectionTextHeader="Done"
          />
          <TodoSection
            isEditing={isEditing}
            setIsEditing={handleOnClick}
            setTodos={setTodos}
            todoStatus="canceled"
            todos={canceledItems}
            addTodos={addTodos}
            sectionTextHeader="Canceled"
          />
        </main>
      </div>
    </ThemeContext>
  );
}

export default App;
