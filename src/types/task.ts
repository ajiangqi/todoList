export type Priority = "high" | "medium" | "normal";

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  dueDate: string;
  completed: boolean;
  createdAt: string;
}
