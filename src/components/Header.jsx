import avatar from "../assets/test-avatar-1.jpg";

const Header = () => {
  return (
    <header className="w-full md:col-span-12 flex flex-wrap justify-between items-center px-4 md:px-6 py-3 md:py-2 bg-blue-500 shadow-md">
      <button className="md:hidden bg-apricot  p-2 rounded shadow">☰</button>

      <h1 className="text-lg md:text-xl font-display font-bold text-raspberry">
        Inventory<span className="text-stone-800"> Admin</span>
      </h1>

      <div className="flex items-center gap-3">
        <div className="w-full sm:w-38 flex flex-col items-center justify-center text-center">
          <img
            src={avatar}
            alt="user-avatar"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
          />
          <p className="font-[Audiowide] text-[10px] sm:text-[12px] text-gray-700 dark:text-gray-300 truncate max-w-[100px] sm:max-w-none">
            {/* {email} */}
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
