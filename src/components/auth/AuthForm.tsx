
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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const AuthForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  function onLoginSubmit(values: z.infer<typeof loginSchema>) {
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log('Login submitted:', values);
      
      // Only admin login is allowed
      if (values.email === 'admin@medflow.com' && values.password === 'admin123') {
        toast({
          title: "Admin login successful",
          description: "Welcome to the admin dashboard.",
        });
        navigate('/admin');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid admin credentials. Please try again.",
          variant: "destructive",
        });
      }
      
      setIsSubmitting(false);
    }, 1000);
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 w-full max-w-md mx-auto fade-in-element">
      <h2 className="text-xl font-bold mb-6 text-center">Admin Login</h2>
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter admin email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="text-sm text-right">
            <a href="#" className="text-medflow-blue hover:underline">Forgot password?</a>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-medflow-blue hover:bg-medflow-blue-dark"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login as Admin"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AuthForm;
