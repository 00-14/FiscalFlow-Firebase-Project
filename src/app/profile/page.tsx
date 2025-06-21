"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const profileFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Please enter a valid email address."),
});

const notificationSettingsSchema = z.object({
    monthlySummary: z.boolean(),
    goalUpdates: z.boolean(),
    communityHighlights: z.boolean(),
});

export default function ProfilePage() {

    const profileForm = useForm<z.infer<typeof profileFormSchema>>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            name: "Alex Doe",
            email: "alex.doe@example.com",
        },
    });

    const notificationsForm = useForm<z.infer<typeof notificationSettingsSchema>>({
        resolver: zodResolver(notificationSettingsSchema),
        defaultValues: {
            monthlySummary: true,
            goalUpdates: true,
            communityHighlights: false,
        },
    });

    function onProfileSubmit(values: z.infer<typeof profileFormSchema>) {
        console.log("Profile updated:", values);
        // Here you would show a success toast
    }

    function onNotificationsSubmit(values: z.infer<typeof notificationSettingsSchema>) {
        console.log("Notification settings updated:", values);
        // Here you would show a success toast
    }


  return (
    <div className="space-y-8 max-w-2xl mx-auto">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Profile & Settings</h1>
            <p className="text-muted-foreground">Manage your account information and preferences.</p>
        </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details here.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...profileForm}>
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
              <FormField
                control={profileForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={profileForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Save Changes</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Choose what you want to be notified about.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...notificationsForm}>
            <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)} className="space-y-6">
                <FormField
                    control={notificationsForm.control}
                    name="monthlySummary"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Monthly Summary</FormLabel>
                                <p className="text-sm text-muted-foreground">Receive a summary of your finances at the end of each month.</p>
                            </div>
                             <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                             </FormControl>
                        </FormItem>
                    )}
                />
                 <FormField
                    control={notificationsForm.control}
                    name="goalUpdates"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Goal Progress</FormLabel>
                                <p className="text-sm text-muted-foreground">Get notified when you're close to reaching a financial goal.</p>
                            </div>
                             <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                             </FormControl>
                        </FormItem>
                    )}
                />
                 <FormField
                    control={notificationsForm.control}
                    name="communityHighlights"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Community Highlights</FormLabel>
                                <p className="text-sm text-muted-foreground">Receive a weekly digest of popular community posts.</p>
                            </div>
                             <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                             </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit">Save Notifications</Button>
            </form>
            </Form>
        </CardContent>
      </Card>
    </div>
  );
}
