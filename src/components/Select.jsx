const Select = ({ options, value, onChange, label }) => {
  return (
    <div className="w-full">
      {/* {label && (
        <label className="block mb-1 text-sm font-medium text-stone-900">
          {label}
        </label>
      )} */}

      <select
        value={value}
        onChange={onChange}
        className="bg-white w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-stone-950"
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map((option) => (
          <option
            value={option.value}
            key={option.value}
            className="text-black"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
