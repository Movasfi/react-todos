import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { ArrowBigDownIcon } from "lucide-react";
import type { ITodo } from "../interfaces";

interface IProps {
  todoId: string;
  todoStatus?: string;
  setStatus: (val: string) => void;
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
}
const StatusDropdown = ({
  setTodos,
  todoId,
  setStatus,
  todoStatus,
}: IProps) => {
  const TaskStatus = {
    inReview: "🙇 In Review",
    inProgress: "🏃 In Progress",
    todo: "📥 To Do",
    done: "☑️ Done",
    canceled: "🗑 Canceled",
  };

  const renderOptions: ReactNode = Object.entries(TaskStatus).map(
    ([key, name]) => {
      return (
        <option
          key={key}
          value={key === todoStatus ? todoStatus : key}
          className="bg-white text-gray-800"
        >
          {name}
        </option>
      );
    },
  );

  return (
    <li className="list-none my-4">
      <div className="flex flex-col gap-2 max-w-xs">
        <div className="flex justify-start gap-5 items-center w-120">
          <div className="relative w-60">
            <select
              onChange={(e) => {
                setStatus(e.currentTarget.value!);
                const curStatus = e.currentTarget.value!;
                setTodos((pre: ITodo[]) => {
                  return pre.map((data) => {
                    if (data.todoId === todoId) {
                      return {
                        ...data,
                        todoStatus: curStatus,
                      };
                    }
                    return data;
                  });
                });
              }}
              defaultValue={todoStatus}
              className="w-full px-4 py-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all cursor-pointer dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
            >
              {renderOptions}
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
