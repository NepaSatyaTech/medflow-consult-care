
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { appointments } from '@/data/mockData';

const formSchema = z.object({
  patientName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  patientEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  patientPhone: z.string().min(7, {
    message: "Please enter a valid phone number.",
  }),
  consultationType: z.enum(["in-person", "virtual"], {
    required_error: "Please select a consultation type.",
  }),
  date: z.string().min(1, {
    message: "Please select a date.",
  }),
  time: z.string().min(1, {
    message: "Please select a time.",
  }),
  reason: z.string().min(10, {
    message: "Please describe your reason in at least 10 characters.",
  }),
});

const AppointmentForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientName: "",
      patientEmail: "",
      patientPhone: "",
      consultationType: "in-person",
      date: "",
      time: "",
      reason: "",
    },
  });
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    setTimeout(() => {
      // Simulate API call
      const newAppointment = {
        id: (appointments.length + 1).toString(),
        patientName: values.patientName,
        consultationType: values.consultationType as 'in-person' | 'virtual',
        date: values.date,
        time: values.time,
        reason: values.reason,
        status: 'pending' as const,
        patientEmail: values.patientEmail,
        patientPhone: values.patientPhone,
      };
      
      console.log('Appointment submitted:', newAppointment);
      
      toast({
        title: "Appointment requested",
        description: "Your appointment has been submitted successfully. We will contact you soon.",
      });
      
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  }

  // Get today's date in YYYY-MM-DD format for the min date attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 fade-in-element">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Book an Appointment</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="patientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="patientEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="patientPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="(123) 456-7890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="consultationType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Consultation Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="in-person" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">In-Person</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="virtual" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">Virtual</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Date</FormLabel>
                  <FormControl>
                    <Input type="date" min={today} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Time</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9:00">9:00 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                        <SelectItem value="11:00">11:00 AM</SelectItem>
                        <SelectItem value="12:00">12:00 PM</SelectItem>
                        <SelectItem value="14:00">2:00 PM</SelectItem>
                        <SelectItem value="15:00">3:00 PM</SelectItem>
                        <SelectItem value="16:00">4:00 PM</SelectItem>
                        <SelectItem value="17:00">5:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reason for Consultation</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Please describe your symptoms or reason for the appointment..." 
                    className="resize-none min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-medflow-blue hover:bg-medflow-blue-dark"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Book Appointment"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AppointmentForm;
