import { useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";

export function ViewSwitchButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/calendar")}
      className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
    >
      <Calendar size={20} />
    </button>
  );
}
