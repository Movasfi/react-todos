import AppText from "./AppText";
import { Plus } from "lucide-react";

interface IProps {
  isEditing: string;
  text: string;
  className: string;
  addTodos: (val: string) => void;
  todoStatus?: string;
  setIsEditing: (val: string) => void;
}
const TodoSectionHeader = ({
  todoStatus,
  addTodos,
  className,
  text,
}: IProps) => {
  return (
    <div className="flex justify-between w-80 bg-black p-3 rounded-md">
      <AppText className={className} text={text} />
      <Plus
        onClick={() => {
          addTodos(todoStatus!);
        }}
        color="white"
      />
    </div>
  );
};

export default TodoSectionHeader;
