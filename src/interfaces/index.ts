export interface ITodo {
    todoName: string;
    todo: string;
    todoId: string;
    todoStatus: string;
    priorityLevel: string
}


export const TaskStatus = {
    inreview: "🙇 In Review",
    inprogress: "🏃 In Progress",
    todo: "📥 To Do",
    done: "☑️ Done",
    canceled: "🗑 Canceled",
};

export const priorities = {
    "4": "🔥 Ugent",
    "3": "🟥 High",
    "2": "🟧 Medium",
    "1": "🟨 Low",
    "0": "⬜ None",
};