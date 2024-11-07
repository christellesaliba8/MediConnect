import PatientForm from "@/components/forms/PatientForm";
import PasskeyModal from "@/components/PasskeyModal";
import Link from "next/link"; 
import Image from "next/image";

export default function Home({searchParams} : SearchParamProps) {
  const isAdmin = searchParams.admin === 'true';

  return (
    <div className="flex h-screen max-h-screen">
    {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image 
            src="/assets/icons/logo-name2.svg"
            height={1000}
            width={1000}
            alt="MediConnect logo"
            className="mb-12 h-10 w-fit" 
          />

          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between items-center">
            <p className="text-dark-600 xl:text-left">
              © 2024 MediConnect
            </p>

            <Link href="/?admin=true" className="text-green-500 flex items-center ml-4">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image 
        src="/assets/images/homescreen.png"
        height={1000}
        width={1000}
        alt="Onboarding"
        className="side-img max-w-[50%] transform " 
      />
    </div>
  );
}
