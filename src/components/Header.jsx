const Header = () => {
  return (
    <header className="w-full md:col-span-12 flex flex-wrap justify-between items-center px-4 md:px-6 py-3 md:py-2 bg-blue-500 shadow-md">
      <button className="md:hidden bg-apricot  p-2 rounded shadow">☰</button>

      <h1 className="text-lg md:text-xl font-display font-bold text-raspberry">
        Tartland<span className="text-stone-800"> Admin</span>
      </h1>

      <div className="flex items-center gap-3">
        {/* User avatar/placeholder */}
      </div>
    </header>
  );
};

export default Header;
