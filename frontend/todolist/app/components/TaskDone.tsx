"use client";
import { AiFillDelete, AiOutlineCheck } from "react-icons/ai";

interface DoneButtonProps {
  taskId: String;
  onMarkAsDone: (taskId: String) => void;
}

const DoneButton = ({ taskId, onMarkAsDone }: DoneButtonProps) => {
  return (
    <button
      className=" bg-green-500 p-2 w-8 mt-3  hover:bg-green-600 rounded-md text-white drop-shadow-md transition-colors"
      onClick={() => onMarkAsDone(taskId)}
    >
      <AiOutlineCheck />
    </button>
  );
};
export default DoneButton;
