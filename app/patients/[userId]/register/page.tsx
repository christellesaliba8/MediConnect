'use server';

import RegisterForm from '@/components/forms/RegisterForm';
import { getUser } from '@/lib/actions/patient.actions';
import Image from 'next/image';
import React from 'react';

const Register = async ({ params: { userId } }: SearchParamProps) => {
  try {
    const user = await getUser(userId); 
    console.log('User data from Appwrite:', user);// Use the actual userId from the URL parameters

    if (!user) {
      return <div>User not found.</div>;
    }

    return (
      <div className="flex h-screen max-h-screen">
        <section className="remove-scrollbar container">
          <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
            <Image 
              src="/assets/icons/logo-name2.svg"
              height={1000}
              width={1000}
              alt="MediConnect logo"
              className="mb-12 h-10 w-fit" 
            />
            <RegisterForm user={user} />
            <p className="copyright py-12">© 2024 MediConnect</p>
          </div>
        </section>

        <Image 
          src="/assets/images/register2.png"
          height={1000}
          width={1000}
          alt="patient"
          className="side-img max-w-[390px]" 
        />
      </div>
    );
  } catch (error) {
    console.error('Error fetching user:', error);
    return <div>Failed to load user.</div>;
  }
};

export default Register;
