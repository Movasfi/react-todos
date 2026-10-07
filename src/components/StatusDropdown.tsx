import { memo, useContext, useEffect, type Dispatch, type SetStateAction } from "react";
import { type ITodo } from "../interfaces";
import { useStatusDropdown } from "../customHooks/useStatusDropdown";
import { useNavigate } from "react-router-dom";
import { AssigneeContext } from "../customHooks/DataContext";
interface IProps {
  todoId: string;
  todoStatus?: string;
  IconsObg: {
    [key: string]: string;
  };
  assignee?: string;
  priortyStatus?: string;
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
  todos?: ITodo[];
  editUser: boolean
}

const StatusDropdown = ({
  setTodos,
  todoId,
  todoStatus,
  IconsObg,
  editUser,
  todos,
  priortyStatus,
  assignee,
}: IProps) => {
  const {
    dropDown,
    SelectValueElement,
    updateStatusIcon,
    updatePriorityLevel,
    updateAssignee,
    IconPriorityKeys,
    IconStatusKeys,
    deleteAssignee,
    isActive,
    setIsActive,
    updateActiveStatus,
    circelNamesStyle,
  } = useStatusDropdown({
    setTodos,
    todoId,
    priortyStatus,
    assignee,
    IconsObg,
    todoStatus,
    todos,

  });

  const assigneesContext = useContext(AssigneeContext)
  const { newAssignee } = assigneesContext

  const currentTodo = todos?.find((data) => data.todoId === todoId);
  const hasAssignees = currentTodo?.assignee.length! > 0;
  useEffect(() => {
    updateActiveStatus()
  }, [hasAssignees])
  const navigate = useNavigate()



  return (
    <>

      <select
        onChange={(e) => {
          const curStatus = e.target.value!;
          if (curStatus === "/users") {
            console.log(curStatus);
            navigate("/users");
            return;
          }
          if (IconStatusKeys.includes(curStatus)) {
            updateStatusIcon(curStatus);
          }

          if (IconPriorityKeys.includes(curStatus)) {
            updatePriorityLevel(curStatus);
          }


          if (Object.keys(newAssignee).includes(curStatus)) {
            const isAssigned = currentTodo?.assignee.includes(curStatus);
            if (!isAssigned) {
              updateAssignee(curStatus);
            } else {
              deleteAssignee(curStatus);
            }
          }
          updateActiveStatus()

        }}


        value={SelectValueElement()!}
        className={`px-4 w-13 py-2.5 text-sm border ${isActive ? "hidden" : ""} border-gray-300 rounded-lg shadow-sm appearance-none  transition-all cursor-pointer `}
      >
        {dropDown(IconsObg, editUser)}




      </select >
      <div
        onClick={() => {
          if (todos?.find((data) => data.todoId === todoId)) {
            setIsActive(!isActive)
          }
        }}
        className={`flex ${isActive ? "block" : "hidden"} -space-x-2`} > {circelNamesStyle(todos!)}
      </div>

    </>
  );
};

export default memo(StatusDropdown);
