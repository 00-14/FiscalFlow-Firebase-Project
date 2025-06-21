import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Trash2, Edit } from "lucide-react";
import { format } from 'date-fns';
import type { Goal } from "@/lib/types";
import { AddGoalDialog } from "./add-goal-dialog";

interface GoalCardProps {
  goal: Goal;
  onDelete: (id: string) => void;
  onEdit: (goal: Goal) => void;
}

export function GoalCard({ goal, onDelete, onEdit }: GoalCardProps) {
  const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle>{goal.title}</CardTitle>
                <CardDescription>Deadline: {format(new Date(goal.deadline), 'MMM d, yyyy')}</CardDescription>
            </div>
            <AddGoalDialog goalToEdit={goal} onAddGoal={onEdit}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    {/* The AddGoalDialog trigger is inside this item */}
                    <div className="w-full flex items-center">
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete(goal.id)} className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </AddGoalDialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-end mb-2">
            <span className="text-2xl font-bold text-primary">${goal.currentAmount.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">of ${goal.targetAmount.toLocaleString()}</span>
        </div>
        <Progress value={progress} />
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">{progress.toFixed(0)}% complete</p>
      </CardFooter>
    </Card>
  );
}
