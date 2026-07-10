import { useEffect, type Dispatch, type SetStateAction } from "react";
import { ArrowBigDownIcon } from "lucide-react";
import { Assignees, type ITodo } from "../interfaces";
import { useStatusDropdown } from "../customHooks/useStatusDropdown";
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
}

const StatusDropdown = ({
  setTodos,
  todoId,
  todoStatus,
  IconsObg,
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

  const currentTodo = todos?.find((data) => data.todoId === todoId);
  const hasAssignees = currentTodo?.assignee.length! > 0;
  useEffect(() => {
    updateActiveStatus()
  }, [hasAssignees])


  return (
    <>
      <select
        onChange={(e) => {
          const curStatus = e.target.value!;

          if (IconStatusKeys.includes(curStatus)) {
            updateStatusIcon(curStatus);
          }

          if (IconPriorityKeys.includes(curStatus)) {
            updatePriorityLevel(curStatus);
          }



          if (Object.keys(Assignees).includes(curStatus)) {
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
        <option value="s" selected disabled hidden></option>
        {dropDown(IconsObg)}
      </select>
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

export default StatusDropdown;
