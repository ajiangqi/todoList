import { useState } from "react";
import { mockTasks } from "@/mocks/tasks";
import { Task } from "@/types/task";
import { Calendar } from "@/components/calendar/Calendar";
import { ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TaskItem } from "@/components/task/TaskItem";

export default function CalendarPage() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const tasksByDate = tasks.reduce((acc, task) => {
    const date = task.dueDate;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/")}
          className="p-2 text-gray-600 hover:text-gray-900 transition-colors mr-2"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">日历视图</h1>
      </div>
      <Calendar 
        tasksByDate={tasksByDate} 
        onDateSelect={setSelectedDate}
      />
      {selectedDate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {new Date(selectedDate).toLocaleDateString("zh-CN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  weekday: "long"
                })}
              </h2>
              <button 
                onClick={() => setSelectedDate(null)} 
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-2">
              {tasksByDate[selectedDate]?.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleComplete={() => {}}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
