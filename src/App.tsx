import TodoSection from "./components/TodoSection";

import Header from "./components/Header";
import { ThemeContext } from "./customHooks/ThemeContext";
import { getTodos, setTodo, setTheme, getTheme } from "./localstorage";
import { useTodos } from "./customHooks/useTodos";
import { useDark } from "./customHooks/useDark";

function App() {
  const {
    canceledItems,
    doneItems,
    inProgressItems,
    inReviewItems,
    todosItems,
    addTodos,
    handleOnClick,
    setTodos,
    isEditing,
  } = useTodos();

  const { isDark, setIsDark } = useDark();

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
