const SelectInput = ({ label, name, value, onChange, options, isActive = true ,   placeholder}) => {
  if (!isActive) return null; // If isActive is false, the component won't render

  return (
    <div className="w-full">
      <label className="block text-gray-500 font-serif mb-1" htmlFor={name}>
        {placeholder}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">{placeholder}</option>
        {options.map((option, i) => (
          <option key={i} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
