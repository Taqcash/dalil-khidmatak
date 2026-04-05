import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5F5F5] p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">تسجيل الدخول - دليل خدمتك</h1>
      <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" forceRedirectUrl="/profile-setup" />
    </div>
  );
}
