import { useState } from "react";
import { TaskForm } from "./TaskForm";
import { Plus } from "lucide-react";
import { Task } from "@/types/task";


export function AddTaskButton({ onAddTask }: { onAddTask: (task: Task) => void }) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsFormOpen(true)}
        className="fixed bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
      >
        <Plus size={24} />
      </button>
      {isFormOpen && (
        <TaskForm
          onClose={() => setIsFormOpen(false)}
          onSubmit={onAddTask}
        />
      )}
    </>
  );
}
