import { useState } from "react";
import { Task, Priority } from "@/types/task";
import { X } from "lucide-react";

interface TaskFormProps {
  onClose: () => void;
  onSubmit: (task: Omit<Task, "id" | "createdAt" | "completed">) => void;
}

export function TaskForm({ onClose, onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("normal");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dueDate) return;
    
    onSubmit({
      title,
      priority,
      dueDate
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">添加新任务</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              任务标题
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              优先级
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="high">高优先级</option>
              <option value="medium">中优先级</option>
              <option value="normal">普通优先级</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              截止日期
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
          >
            添加任务
          </button>
        </form>
      </div>
    </div>
  );
}
