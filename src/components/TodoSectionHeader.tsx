import AppText from "./AppText";
import { Plus } from "lucide-react";

interface IProps {
  text: string;
  className: string;
  addTodos: (val: string) => void;
  todoStatus?: string;
  setStatus: (val: string) => void;
}
const TodoSectionHeader = ({
  todoStatus,
  addTodos,
  className,
  setStatus,
  text,
}: IProps) => {
  return (
    <div className="flex justify-between w-80 bg-black p-3 rounded-md">
      <AppText className={className} text={text} />
      <Plus
        onClick={() => {
          setStatus(todoStatus!);
          addTodos(todoStatus!);
        }}
        color="white"
      />
    </div>
  );
};

export default TodoSectionHeader;
