import { Suspense } from "react";
import SignUpForm from "@/components/SignUpForm";

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SignUpForm />
    </Suspense>
  );
}