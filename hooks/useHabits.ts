import { useState, useEffect } from 'react';

interface Habit {
  _id: string;
  name: string;
  logs: Array<{
    timestamp: Date;
    didDoIt: boolean;
  }>;
}

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [selectedHabitId, setSelectedHabitId] = useState<string>('');

  const fetchHabits = async () => {
    const response = await fetch('/api/habits');
    const data = await response.json();
    if (data.success) {
      setHabits(data.data);
    }
  };

  const addHabit = async (name: string) => {
    const response = await fetch('/api/habits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    const data = await response.json();
    if (data.success) {
      fetchHabits();
      return true;
    }
    return false;
  };

  const logHabit = async (habitId: string, didDoIt: boolean) => {
    const response = await fetch(`/api/habits/${habitId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ didDoIt }),
    });

    if (response.ok) {
      fetchHabits();
      return true;
    }
    return false;
  };

  const deleteHabit = async (habitId: string) => {
    const response = await fetch(`/api/habits/${habitId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setSelectedHabitId('');
      fetchHabits();
      return true;
    }
    return false;
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  return {
    habits,
    selectedHabitId,
    setSelectedHabitId,
    addHabit,
    logHabit,
    deleteHabit,
  };
}

export type { Habit };