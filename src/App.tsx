import TodoSection from "./components/TodoSection";
import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { ITodo } from "./interfaces/index";
import Header from "./components/Header";

export const ThemeContext = createContext<boolean>(false);

const App = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [status, setStatus] = useState<string>("");
  const [isDark, setIsDark] = useState<boolean>(false);

  const todosItems = todos.filter((da) => {
    if (da.todoStatus.trim().toLowerCase() === "todo") {
      return da;
    }
  });

  const inReviewItems = todos.filter((da) => {
    if (da.todoStatus.trim() === "inReview") {
      return da;
    }
  });

  const inProgressItems = todos.filter((da) => {
    if (da.todoStatus.trim() === "inProgress") {
      return da;
    }
  });
  const canceledItems = todos.filter((da) => {
    if (da.todoStatus.trim().toLowerCase() === "canceled") {
      return da;
    }
  });
  const doneItems = todos.filter((da) => {
    if (da.todoStatus.trim().toLowerCase() === "done") {
      return da;
    }
  });

  const addTodos = (status: string) => {
    const todo: ITodo = {
      todoName: "hi",
      todo: `Todo ${todos.length}`,
      todoId: uuidv4(),
      todoStatus: status,
    };

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
            setTodos={setTodos}
            setStatus={setStatus}
            todoStatus="inReview"
            todos={inReviewItems}
            addTodos={addTodos}
            sectionTextHeader="In Review"
          />
          <TodoSection
            setTodos={setTodos}
            setStatus={setStatus}
            todoStatus="inProgress"
            todos={inProgressItems}
            addTodos={addTodos}
            sectionTextHeader="In Progress"
          />
          <TodoSection
            setTodos={setTodos}
            setStatus={setStatus}
            todoStatus="todo"
            todos={todosItems}
            addTodos={addTodos}
            sectionTextHeader="To Do"
          />
          <TodoSection
            setTodos={setTodos}
            setStatus={setStatus}
            todoStatus="done"
            todos={doneItems}
            addTodos={addTodos}
            sectionTextHeader="Done"
          />
          <TodoSection
            setTodos={setTodos}
            setStatus={setStatus}
            todoStatus="canceled"
            todos={canceledItems}
            addTodos={addTodos}
            sectionTextHeader="Canceled"
          />
        </main>
      </div>
    </ThemeContext>
  );
};

export default App;
