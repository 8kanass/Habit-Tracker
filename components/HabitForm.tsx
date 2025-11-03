import { useState } from 'react';
import { Button } from "@/components/ui/button";

interface HabitFormProps {
  onSubmit: (name: string) => Promise<boolean>;
}

export function HabitForm({ onSubmit }: HabitFormProps) {
  const [newHabit, setNewHabit] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabit.trim()) return;

    const success = await onSubmit(newHabit);
    if (success) {
      setNewHabit('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-2">
        <input
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Enter new habit..."
          className="flex-1 p-2 border rounded-lg"
        />
        <Button type="submit">
          Add Habit
        </Button>
      </div>
    </form>
  );
}