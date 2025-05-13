
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
  const [loginError, setLoginError] = useState<string | null>(null);
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
    setLoginError(null);
    
    setTimeout(() => {
      console.log('Login submitted:', values);
      
      // Check admin credentials - make sure to trim to remove any accidental spaces
      const email = values.email.trim();
      const password = values.password;
      
      if (email === 'admin@medflow.com' && password === 'admin123') {
        toast({
          title: "Admin login successful",
          description: "Welcome to the admin dashboard.",
        });
        navigate('/admin');
      } else {
        setLoginError("Invalid admin credentials. Please try again.");
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
      
      {loginError && (
        <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md text-sm">
          {loginError}
        </div>
      )}
      
      <div className="mb-6 p-3 bg-blue-50 text-blue-700 rounded-md text-sm">
        <strong>Demo credentials:</strong> 
        <div className="mt-1">Email: admin@medflow.com</div>
        <div>Password: admin123</div>
      </div>
      
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter admin email" 
                    {...field} 
                    onChange={(e) => field.onChange(e.target.value.trim())}
                  />
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
