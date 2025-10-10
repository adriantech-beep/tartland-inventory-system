import BackgroundImage from "@/assets/login/Tartland-background-2.png";
import LoginCard from "@/login/LoginCard";

const LoginPage = () => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center relative flex items-center justify-center"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />

      <LoginCard />
      {/* Login card */}
      {/* <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-stone-800 text-center mb-6">
          Welcome Back
        </h2>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-stone-800 text-white font-semibold rounded-lg hover:bg-stone-700 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-stone-600 mt-4">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-stone-800 font-medium hover:underline"
          >
            Sign up
          </a>
        </p>
      </div> */}
    </div>
  );
};

export default LoginPage;
