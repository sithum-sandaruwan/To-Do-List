import { useEffect } from "react";

export interface Task {
  refresh: boolean;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  id: string;
  task: string;
  description: string;
  startDate: Date;
  endDate: Date;
  completed: Boolean;
}