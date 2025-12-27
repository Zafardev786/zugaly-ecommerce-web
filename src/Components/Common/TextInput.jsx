const TextInput = ({ 
    label, 
    name, 
    value, 
    onChange, 
    placeholder, 
    type = "text", 
    isActive = true,
    rows = 4 // Default rows for textarea
}) => {
    if (!isActive) return null;

    return (
        <div className="w-full">
            <label className="block text-gray-500 font-serif mb-1" htmlFor={name}>
                {label}
            </label>
            
            {type === "textarea" ? (
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    rows={rows}
                    className="w-full min-h-[100px] p-2 border border-gray-300 rounded-md shadow-sm 
                              focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                    placeholder={placeholder}
                />
            ) : (
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm 
                              focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={placeholder}
                />
            )}
        </div>
    );
};

export default TextInput;