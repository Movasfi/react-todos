import { type Dispatch, type SetStateAction } from "react";
import { ArrowBigDownIcon } from "lucide-react";
import { type ITodo } from "../interfaces";
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
}

const StatusDropdown = ({
  setTodos,
  todoId,
  todoStatus,
  IconsObg,
  priortyStatus,
  assignee,
}: IProps) => {
  const {
    dropDown,
    SelectValueElement,
    updateStatusIcon,
    updatePriorityLevel,
    updateAssignee,
    IconAssignees,
    IconPriorityKeys,
    IconStatusKeys,
  } = useStatusDropdown({
    setTodos,
    todoId,
    priortyStatus,
    assignee,
    IconsObg,
    todoStatus,
  });

  return (
    <li className="list-none my-4">
      <div className="flex flex-col gap-2 max-w-xs">
        <div className="flex justify-start gap-5 items-center w-70">
          <div className="relative w-60">
            <select
              onChange={(e) => {
                const curStatus = e.currentTarget.value!;

                if (IconStatusKeys.includes(curStatus)) {
                  updateStatusIcon(curStatus);
                }

                if (IconPriorityKeys.includes(curStatus)) {
                  updatePriorityLevel(curStatus);
                }
                if (IconAssignees.includes(curStatus)) {
                  updateAssignee(curStatus);
                }
              }}
              value={SelectValueElement()!}
              className="w-full px-4 py-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all cursor-pointer dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
            >
              {dropDown(IconsObg, SelectValueElement())}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <ArrowBigDownIcon size={20} />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default StatusDropdown;
