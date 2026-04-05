import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">مرحباً بك في دليل خدمتك - بورتسودان</h1>
      <SignUp 
        signInUrl="/sign-in"
        forceRedirectUrl="/profile-setup" 
      />
    </div>
  );
}
