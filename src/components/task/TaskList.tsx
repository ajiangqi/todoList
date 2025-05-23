import { useState } from "react";
import { Task } from "@/types/task";
import { TaskItem } from "./TaskItem";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate: (updatedTasks: Task[]) => void;
}

export function TaskList({ tasks, onTaskUpdate }: TaskListProps) {
  const handleToggleComplete = (id: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    onTaskUpdate(updatedTasks);
  };

  const handleDeleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    onTaskUpdate(updatedTasks);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    onTaskUpdate(items);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-2"
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskItem
                      task={task}
                      onToggleComplete={handleToggleComplete}
                      onDelete={handleDeleteTask}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
