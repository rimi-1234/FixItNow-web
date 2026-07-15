import type { Metadata } from "next";
import { RegisterForm } from "@/features/auth/forms/register-form";
import Link from "next/link";
import { ROUTES } from "@/config/routes";

export const metadata: Metadata = {
  title: "Create account",
  robots: { index: false },
};

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href={ROUTES.login} className="text-brand hover:underline font-medium">
            Log in
          </Link>
        </p>
      </div>
      <RegisterForm />
    </div>
  );
}
