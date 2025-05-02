
import React, { useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { doctorInfo } from '@/data/mockData';

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  qualifications: z.string(),
  experience: z.string(),
  specialization: z.string(),
  bio: z.string(),
});

const emailNotificationsSchema = z.object({
  newAppointment: z.boolean().default(true),
  appointmentUpdates: z.boolean().default(true),
  medicineOutOfStock: z.boolean().default(false),
  marketingEmails: z.boolean().default(false),
});

const passwordFormSchema = z.object({
  currentPassword: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  newPassword: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const AdminSettings = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: doctorInfo.name,
      email: "doctor@medflow.com",
      qualifications: doctorInfo.qualifications,
      experience: doctorInfo.experience,
      specialization: doctorInfo.specialization,
      bio: doctorInfo.bio,
    },
  });
  
  const emailNotificationsForm = useForm<z.infer<typeof emailNotificationsSchema>>({
    resolver: zodResolver(emailNotificationsSchema),
    defaultValues: {
      newAppointment: true,
      appointmentUpdates: true,
      medicineOutOfStock: false,
      marketingEmails: false,
    },
  });
  
  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  
  function onProfileSubmit(values: z.infer<typeof profileFormSchema>) {
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log('Profile submitted:', values);
      
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      });
      
      setIsSubmitting(false);
    }, 1000);
  }
  
  function onEmailNotificationsSubmit(values: z.infer<typeof emailNotificationsSchema>) {
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log('Email notifications submitted:', values);
      
      toast({
        title: "Notification Settings Updated",
        description: "Your email notification preferences have been saved.",
      });
      
      setIsSubmitting(false);
    }, 1000);
  }
  
  function onPasswordSubmit(values: z.infer<typeof passwordFormSchema>) {
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log('Password submitted:', values);
      
      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully.",
      });
      
      passwordForm.reset();
      setIsSubmitting(false);
    }, 1000);
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>
          
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
              
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={profileForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
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
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="qualifications"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Qualifications</FormLabel>
                          <FormControl>
                            <Input placeholder="Your qualifications" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Experience</FormLabel>
                          <FormControl>
                            <Input placeholder="Your experience" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="specialization"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Specialization</FormLabel>
                          <FormControl>
                            <Input placeholder="Your specialization" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={profileForm.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="A brief description about yourself" 
                            className="resize-none min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit"
                      className="bg-medflow-blue hover:bg-medflow-blue-dark"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Saving..." : "Save Profile"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Email Notifications</h2>
              
              <Form {...emailNotificationsForm}>
                <form onSubmit={emailNotificationsForm.handleSubmit(onEmailNotificationsSubmit)} className="space-y-6">
                  <FormField
                    control={emailNotificationsForm.control}
                    name="newAppointment"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">New Appointment Notifications</FormLabel>
                          <FormDescription>
                            Receive an email when a new appointment is booked.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={emailNotificationsForm.control}
                    name="appointmentUpdates"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Appointment Updates</FormLabel>
                          <FormDescription>
                            Receive an email when an appointment status changes.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={emailNotificationsForm.control}
                    name="medicineOutOfStock"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Medicine Stock Alerts</FormLabel>
                          <FormDescription>
                            Receive an email when a medicine goes out of stock.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={emailNotificationsForm.control}
                    name="marketingEmails"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Marketing Emails</FormLabel>
                          <FormDescription>
                            Receive marketing and promotional emails.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit"
                      className="bg-medflow-blue hover:bg-medflow-blue-dark"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Saving..." : "Save Preferences"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Change Password</h2>
              
              <Form {...passwordForm}>
                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                  <FormField
                    control={passwordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit"
                      className="bg-medflow-blue hover:bg-medflow-blue-dark"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Updating..." : "Update Password"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminSettings;
