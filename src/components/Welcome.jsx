const Welcome = () => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className=" flex flex-col gap-1.5">
      <h1 className="text-3xl font-display font-bold text-stone-700">
        👋 Hello, Admin
      </h1>
      <p className="text-sm font-sans text-stone-700 ml-1">
        Today is <span className="italic">{today}</span>
      </p>
    </div>
  );
};

export default Welcome;
