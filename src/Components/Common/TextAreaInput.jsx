const TextAreaInput = ({ label, name, value, onChange, placeholder, isActive = false }) => {
  if (!isActive) return null; // If isActive is false, the component won't render

  return (
    <div className="w-full lg:col-span-2">
      <label className="block text-gray-500 font-serif mb-1" htmlFor={name}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows="4"
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextAreaInput;
