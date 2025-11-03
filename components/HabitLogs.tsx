import type { Habit } from '@/hooks/useHabits';

interface HabitLogsProps {
  habit: Habit;
}

export function HabitLogs({ habit }: HabitLogsProps) {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">History</h3>
      <div className="space-y-2">
        {habit.logs
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
          .map((log, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                log.didDoIt ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{log.didDoIt ? '✓ Completed' : '✗ Not completed'}</span>
                <span className="text-sm">
                  {new Date(log.timestamp).toLocaleString('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                  })}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}