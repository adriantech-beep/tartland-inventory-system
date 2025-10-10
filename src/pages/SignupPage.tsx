import BackgroundImage from "@/assets/login/Tartland-background-2.png";
import Signup from "@/signup/Signup";

const SignupPage = () => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center relative flex items-center justify-center"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
      <Signup />
    </div>
  );
};

export default SignupPage;
