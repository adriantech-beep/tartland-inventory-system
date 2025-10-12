import { FormProvider, useForm } from "react-hook-form";
import { signupSchema, type SignupForm } from "./signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import BackgroundCardImage from "@/assets/login/Tartland-background-1.png";
import Logo from "@/assets/login/Tartland-logo.png";
import SignupFields from "./SignupFields";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSignup } from "./useSignup";

const Signup = () => {
  const { mutate: signup } = useSignup();
  const form = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit } = form;

  const onSubmit = (data: SignupForm) => {
    signup(data);
  };
  return (
    <Card
      className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 overflow-hidden"
      style={{
        backgroundImage: `url(${BackgroundCardImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-center mb-6">
        <img
          src={Logo}
          alt="Tartland Logo"
          className="w-24 h-24 object-contain rounded-full mb-2"
        />
        <h1
          style={{ fontFamily: "Pacifico, cursive" }}
          className="text-3xl text-stone-800 text-center"
        >
          Welcome to TartLand
        </h1>
      </div>

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SignupFields />

          <div className="flex flex-col gap-2 items-center">
            <Button
              type="submit"
              className="w-full mt-6 bg-stone-800 hover:bg-stone-700 text-white font-medium py-2 rounded-lg transition"
            >
              Sign Up
            </Button>

            <p
              style={{ fontFamily: "Poppins, sans-serif" }}
              className="text-stone-700 hover:text-stone-900 transition-colors cursor-pointer text-sm"
            >
              <Link to="/login" className="underline">
                back to sign in &larr;
              </Link>
            </p>
          </div>
        </form>
      </FormProvider>
    </Card>
  );
};

export default Signup;
