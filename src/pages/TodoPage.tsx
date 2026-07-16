import { useOutletContext } from "react-router-dom";
import TodoSection from "../components/TodoSection";
import { Priority } from "../customHooks/PriorityContext";
import { ThemeContext } from "../customHooks/ThemeContext";
import { useDark } from "../customHooks/useDark";
import { useTodos } from "../customHooks/useTodos";

interface IProps {

}
const TodoPage = () => {


    const {
        setTodos,
        addTodos,
        handleOnClick,
        isEditing,
        priorityLevel,
        inReviewItems,
        inProgressItems,
        todosItems,
        doneItems,
        canceledItems,
    } = useTodos();

    const { isDark } = useDark();
    return (
        <Priority value={priorityLevel}>
            <ThemeContext value={isDark}>
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

            </ThemeContext>
        </Priority >
    )
}

export default TodoPage