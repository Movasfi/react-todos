import { createContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { getAssignee, setAssignee } from "../localstorage";

type Assignee = Record<string, string>;

interface AssigneeContextType {
    newAssignee: Assignee;
    updateAssignee: (data: Assignee) => void;
    setNewAssignee: Dispatch<SetStateAction<Assignee>>;
}

export const AssigneeContext = createContext<AssigneeContextType>({
    newAssignee: {}, updateAssignee() { }, setNewAssignee() { },
});

export const AssigneeProvider = ({ children }: { children: ReactNode }) => {
    const [newAssignee, setNewAssignee] = useState(() => {
        const assignee = getAssignee("newAssignee");
        return assignee
    });

    const updateAssignee = (data: Record<string, string>) => {
        setNewAssignee(data);
        setAssignee("newAssignee", data);
    };

    return (
        <AssigneeContext value={{ newAssignee, updateAssignee, setNewAssignee }}>
            {children}
        </AssigneeContext>
    );
};