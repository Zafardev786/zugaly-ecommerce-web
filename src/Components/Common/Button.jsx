const Button = ({ text, onClick, style = "", type = "submit" }) => {
  return (
    <button
      type={type}

      onClick={onClick}
      className={`px-4 py-2 text-[16px] font-semibold rounded-lg shadow-lg transition duration-300 ${style}`}
    >
      {text}
    </button>
  );
};

export default Button;
