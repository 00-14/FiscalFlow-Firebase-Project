"use client";

import React, { useState } from 'react';
import { GoalCard } from '@/components/goals/goal-card';
import { AddGoalDialog } from '@/components/goals/add-goal-dialog';
import type { Goal } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const initialGoals: Goal[] = [
  { id: '1', title: 'Emergency Fund', currentAmount: 7500, targetAmount: 10000, deadline: '2024-12-31' },
  { id: '2', title: 'Vacation to Japan', currentAmount: 1200, targetAmount: 5000, deadline: '2025-06-30' },
  { id: '3', title: 'New Laptop', currentAmount: 1800, targetAmount: 2000, deadline: '2024-09-01' },
  { id: '4', title: 'Pay Off Credit Card', currentAmount: 2500, targetAmount: 3420, deadline: '2024-11-30' },
];

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);

  const handleAddGoal = (newGoal: Omit<Goal, 'id'>) => {
    setGoals(prev => [...prev, { ...newGoal, id: Date.now().toString() }]);
  };
  
  const handleDeleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  }

  const handleEditGoal = (updatedGoal: Goal) => {
    setGoals(prev => prev.map(goal => goal.id === updatedGoal.id ? updatedGoal : goal));
  }


  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Financial Goals</h1>
            <p className="text-muted-foreground">Track and manage your financial objectives.</p>
        </div>
        <AddGoalDialog onAddGoal={handleAddGoal}>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Goal
            </Button>
        </AddGoalDialog>
      </div>
      
      {goals.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {goals.map(goal => (
            <GoalCard key={goal.id} goal={goal} onDelete={handleDeleteGoal} onEdit={handleEditGoal} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 p-12 text-center">
            <h3 className="text-xl font-medium">No goals yet!</h3>
            <p className="text-sm text-muted-foreground mt-2 mb-4">Start by adding a new financial goal to track.</p>
            <AddGoalDialog onAddGoal={handleAddGoal}>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Your First Goal
                </Button>
            </AddGoalDialog>
        </div>
      )}
    </div>
  );
}
