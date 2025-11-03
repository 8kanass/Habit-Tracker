import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface HabitActionsProps {
  onLogHabit: (didDoIt: boolean) => Promise<boolean>;
  onDeleteHabit: () => Promise<boolean>;
}

export function HabitActions({ onLogHabit, onDeleteHabit }: HabitActionsProps) {
  return (
    <div className="flex justify-center gap-4">
      <Button
        onClick={() => onLogHabit(true)}
        className="px-6 py-3 bg-green-500 hover:bg-green-600"
      >
        I did it
      </Button>
      <Button
        onClick={() => onLogHabit(false)}
        className="px-6 py-3 bg-red-500 hover:bg-red-600"
      >
        No
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="border-destructive text-destructive">
            Delete Habit
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the habit and all its logs.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={onDeleteHabit} 
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}