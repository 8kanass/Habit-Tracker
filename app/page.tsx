'use client';

import { HabitForm } from '@/components/HabitForm';
import { HabitSelect } from '@/components/HabitSelect';
import { HabitActions } from '@/components/HabitActions';
import { HabitLogs } from '@/components/HabitLogs';
import { useHabits } from '@/hooks/useHabits';

const Page = () => {
  const { 
    habits, 
    selectedHabitId, 
    setSelectedHabitId, 
    addHabit, 
    logHabit, 
    deleteHabit 
  } = useHabits();

  const selectedHabit = habits.find(h => h._id === selectedHabitId);

  return (
    <section className="max-w-2xl mx-auto p-4">
      <h1 className="text-center mb-8">
        Be better every day <br /> with Habit Tracker
      </h1>
      
      <HabitForm onSubmit={addHabit} />
      
      <HabitSelect 
        habits={habits} 
        selectedHabitId={selectedHabitId} 
        onSelect={setSelectedHabitId} 
      />

      {selectedHabit && (
        <div className="space-y-6">
          <HabitActions 
            onLogHabit={(didDoIt) => logHabit(selectedHabitId, didDoIt)}
            onDeleteHabit={() => deleteHabit(selectedHabitId)}
          />
          <HabitLogs habit={selectedHabit} />
        </div>
      )}
    </section>
  );
};

export default Page;