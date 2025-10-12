import { Card } from "@/components/ui/card";
import BackgroundCardImage from "@/assets/login/Tartland-background-1.png";
import Logo from "@/assets/login/Tartland-logo.png";
import LoginFields from "./LoginFields";
import { FormProvider, useForm } from "react-hook-form";
import { loginSchema, type LoginForm } from "./loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import "@fontsource/pacifico";
import "@fontsource/poppins";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useGoogle } from "./useGoogleLogin";
import { useLogin } from "./useLogin";

const LoginCard = () => {
  const { mutate: googleLogin } = useGoogle();
  const { mutate: login } = useLogin();
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginForm) => {
    login(data);
  };

  const handleGoogleSuccess = (CredentialResponse: CredentialResponse) => {
    googleLogin(CredentialResponse);
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <LoginFields />

          <Button
            type="submit"
            className="w-full mt-6 bg-stone-800 hover:bg-stone-700 text-white font-medium py-2 rounded-lg transition"
          >
            Sign In
          </Button>

          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.error("Google login error")}
          />
        </form>
      </FormProvider>

      <div className="w-full flex items-center justify-center mt-6 text-sm">
        <p
          style={{ fontFamily: "Poppins, sans-serif" }}
          className="text-stone-700 hover:text-stone-900 transition-colors cursor-pointer"
        >
          <Link to="/signup">Create an account</Link>
        </p>
      </div>

      <div className="mt-6 text-center">
        <p className="text-stone-600 text-sm mb-3">Follow us on</p>
        <div className="flex justify-center gap-4">
          <a
            href="#"
            className="text-stone-700 hover:text-stone-900 transition"
            aria-label="Facebook"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="text-stone-700 hover:text-stone-900 transition"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="text-stone-700 hover:text-stone-900 transition"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>
    </Card>
  );
};

export default LoginCard;
