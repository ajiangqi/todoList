import { useState } from "react";
import { mockTasks } from "@/mocks/tasks";
import { Task } from "@/types/task";
import { TaskList } from "@/components/task/TaskList";
import { AddTaskButton } from "@/components/task/AddTaskButton";
import { ViewSwitchButton } from "@/components/task/ViewSwitchButton";
import { toast } from "sonner";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const handleAddTask = (newTask: Omit<Task, "id" | "createdAt" | "completed">) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      completed: false
    };
    setTasks([...tasks, task]);
    toast.success("任务添加成功");
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">我的任务</h1>
        <ViewSwitchButton />
      </div>
      <TaskList tasks={tasks} onTaskUpdate={setTasks} />
      <AddTaskButton onAddTask={handleAddTask} />
    </div>
  );
}
