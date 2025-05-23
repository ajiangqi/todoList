import { Task } from "@/types/task";
import { cn } from "@/lib/utils";

interface CalendarProps {
  tasksByDate: Record<string, Task[]>;
  onDateSelect: (date: string) => void;
}

export function Calendar({ tasksByDate, onDateSelect }: CalendarProps) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  const weeks: Date[][] = [];
  let week: Date[] = [];
  
  // 填充空白日期
  for (let i = 0; i < firstDayOfMonth; i++) {
    week.push(null);
  }
  
  // 填充月份日期
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    week.push(date);
    
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  
  // 填充剩余空白日期
  if (week.length > 0) {
    while (week.length < 7) {
      week.push(null);
    }
    weeks.push(week);
  }
  
  const hasTasks = (date: Date | null) => {
    if (!date) return false;
    const dateStr = date.toISOString().split('T')[0];
    return tasksByDate[dateStr]?.length > 0;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="grid grid-cols-7 gap-2">
          {week.map((date, dayIndex) => {
            const isWeekend = dayIndex === 5 || dayIndex === 6;
            const dateStr = date?.toISOString().split('T')[0];
            
            return (
              <div
                key={dayIndex}
                onClick={() => date && onDateSelect(dateStr)}
                className={cn(
                  "h-12 rounded flex flex-col items-center justify-center text-sm cursor-pointer",
                  isWeekend && "bg-[#FFEBEE]",
                  date && "hover:bg-gray-100"
                )}
              >
                {date && (
                  <>
                    <div>{date.getDate()}</div>
                    {hasTasks(date) && (
                      <div className="w-1 h-1 rounded-full bg-indigo-500 mt-1"></div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
