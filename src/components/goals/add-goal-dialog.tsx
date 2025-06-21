"use client";

import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Goal } from "@/lib/types";

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  targetAmount: z.coerce.number().positive({ message: "Target amount must be positive." }),
  currentAmount: z.coerce.number().min(0, { message: "Current amount cannot be negative." }),
  deadline: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date format." }),
});

interface AddGoalDialogProps {
  children?: ReactNode;
  goalToEdit?: Goal;
  onAddGoal: (goal: any) => void;
}

export function AddGoalDialog({ children, goalToEdit, onAddGoal }: AddGoalDialogProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: goalToEdit?.title || "",
      targetAmount: goalToEdit?.targetAmount || 1000,
      currentAmount: goalToEdit?.currentAmount || 0,
      deadline: goalToEdit?.deadline ? new Date(goalToEdit.deadline).toISOString().split('T')[0] : "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onAddGoal({ ...goalToEdit, ...values });
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{goalToEdit ? 'Edit Goal' : 'Add New Goal'}</DialogTitle>
          <DialogDescription>
            {goalToEdit ? 'Update the details of your financial goal.' : 'Define a new financial goal to work towards.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goal Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Emergency Fund" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="targetAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Amount ($)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="10000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currentAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Amount ($)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
             <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deadline</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">{goalToEdit ? 'Save Changes' : 'Add Goal'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
