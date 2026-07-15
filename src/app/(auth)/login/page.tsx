import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/forms/login-form";
import Link from "next/link";
import { ROUTES } from "@/config/routes";

export const metadata: Metadata = {
  title: "Log in",
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href={ROUTES.register} className="text-brand hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
