import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Habit } from '@/hooks/useHabits';

interface HabitSelectProps {
  habits: Habit[];
  selectedHabitId: string;
  onSelect: (id: string) => void;
}

export function HabitSelect({ habits, selectedHabitId, onSelect }: HabitSelectProps) {
  return (
    <div className="mb-8">
      <Select value={selectedHabitId} onValueChange={onSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a habit..." />
        </SelectTrigger>
        <SelectContent>
          {habits.map((habit) => (
            <SelectItem key={habit._id} value={habit._id}>
              {habit.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}