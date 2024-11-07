'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import CustomFormField from '@/components/CustomFormField'; 
import Submit from '../Submit';
import { useState } from 'react';
import { UserFormValidation } from '@/lib/validation';
import { useRouter } from 'next/navigation';
import { createUser } from '@/lib/actions/patient.actions';


export enum FormFieldType {
  INPUT = 'INPUT',
  TEXTAREA = 'TEXTAREA',
  PHONE_INPUT = 'PHONE_INPUT',
  DATE_PICKER = 'DATE_PICKER',
  SELECT = 'SELECT',
  SKELETON = 'SKELETON',
  CHECKBOX = 'CHECKBOX',
  FILE_UPLOADER = 'FILE_UPLOADER',  // Add this new field type for file uploads
}




// Define the schema using Zod




export function PatientForm() {
     const router = useRouter ();
     const [isLoading, setIsLoading] = useState(false);

  // Initialize the form using useForm from react-hook-form
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  
  async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try{
    const userData = {name, email, phone};

  const user= await createUser(userData);

   if (user) router.push(`/patients/${user.$id}/register`)

    } catch(error) {
        console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there</h1>
          <p className="text-dark-700">Book your first appointment.</p>
        </section>

       
        <CustomFormField
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="name"
        label="Full Name" 
        placeholder="Crystal Smith"
        iconSrc="/assets/icons/user.svg"
        iconAlt="user"/>



          <CustomFormField
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="email"
        label="Email" 
        placeholder="crystal@gmail.com"
        iconSrc="/assets/icons/email.svg"
        iconAlt="email"/>



         <CustomFormField
        fieldType={FormFieldType.PHONE_INPUT}
        control={form.control}
        name="phone"
        label="Phone" 
        placeholder="+961 71 002 647" />
       

       
        <Submit isLoading={isLoading}>Get Started
            </Submit>
      </form>
    </Form>
  );
}

export default PatientForm;