const FileInput = ({ label, name, value, onChange, accept }) => (
  <div className="w-full">
  <label className="block text-gray-500 font-serif mb-1" htmlFor={name}>
  {label}
</label>
    <input
      type="file"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      accept={accept}
      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default FileInput;
