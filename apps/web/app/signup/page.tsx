import { AuthForm } from "~/components/organisms/AuthForm";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 md:p-10 bg-background text-foreground">
      <AuthForm type="signup" />
    </div>
  );
}
