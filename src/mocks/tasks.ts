import { Task } from "@/types/task";

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "完成项目原型设计",
    priority: "high",
    dueDate: "2025-05-25",
    completed: false,
    createdAt: "2025-05-20"
  },
  {
    id: "2",
    title: "准备会议材料",
    priority: "medium",
    dueDate: "2025-05-28",
    completed: false,
    createdAt: "2025-05-21"
  },
  {
    id: "3",
    title: "阅读技术文档",
    priority: "normal",
    dueDate: "2025-06-01",
    completed: true,
    createdAt: "2025-05-15"
  }
];
