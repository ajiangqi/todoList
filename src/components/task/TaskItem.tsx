import { Task } from "@/types/task";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function TaskItem({ task, onToggleComplete, onDelete }: TaskItemProps) {
  const priorityIcon = {
    high: "❗️",
    medium: "🔥",
    normal: ""
  }[task.priority];

  const priorityColor = {
    high: "text-[#FF5252]",
    medium: "text-[#FF9800]",
    normal: "text-gray-500"
  }[task.priority];

  const calculateDaysLeft = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysLeft = calculateDaysLeft(task.dueDate);

  const handleDelete = () => {
    toast("确定要删除这个任务吗?", {
      action: {
        label: "删除",
        onClick: () => onDelete && onDelete(task.id)
      },
      cancel: {
        label: "取消"
      }
    });
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 bg-white rounded-lg shadow-sm mb-2",
        task.completed && "opacity-60"
      )}
    >
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <span
          className={cn(
            "text-gray-800",
            task.completed && "line-through"
          )}
        >
          {priorityIcon} {task.title}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className={cn("text-sm", priorityColor)}>
          {daysLeft > 0 ? `${daysLeft}天` : "已过期"}
        </span>
        {onDelete && (
          <button 
            onClick={handleDelete}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
