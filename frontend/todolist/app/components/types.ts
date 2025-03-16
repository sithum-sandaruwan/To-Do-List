import { useEffect } from "react";

export interface Task {
  refresh: boolean;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  id: String;
  task: String;
  description: String;
  startDate: Date;
  endDate: Date;
  completed: Boolean;
}