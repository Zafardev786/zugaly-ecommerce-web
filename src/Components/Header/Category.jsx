export default function Category({
  items = [],
  selected = 0,
  setSelected,
  color = "bg-green-600",
}) {
  return (
    <div className="flex overflow-x-auto gap-2 px-2 py-1 scrollbar-hide">
      {items.map((item, index) => {
        const isObj = typeof item === "object" && item !== null;

        const key = isObj ? item.key ?? index : item;
        const label = isObj ? item.name ?? "" : String(item);

        const iconValue = isObj ? item.icon : null;
        const iconImage =
          Array.isArray(iconValue) && iconValue.length > 0
            ? iconValue[0]
            : null;

        const isActive = selected === index;

        return (
          <button
            key={key}
            onClick={() => setSelected(index)}
            className={`
    flex items-center justify-center
    gap-0.5 sm:gap-2

    h-[20px] sm:h-[32px]

    px-1.5 sm:px-4      /* ✅ MOBILE ME KAM, DESKTOP SAME */
    
    rounded-full
    border
    text-[11px] sm:text-sm
    font-medium
    whitespace-nowrap
    transition-colors duration-200
    ${isActive
                ? `${color} text-white border-transparent shadow`
                : "bg-white text-gray-700 border-gray-300"
              }
  `}
          >
            {/* ICON */}
            {iconImage && (
              <img
                src={iconImage}
                alt={label}
                className="w-3 h-3 sm:w-5 sm:h-5 object-cover rounded-full"
              />
            )}

            {/* EMOJI ICON */}
            {!iconImage && typeof iconValue === "string" && (
              <span className="text-[10px] sm:text-base leading-none">
                {iconValue}
              </span>
            )}

            {/* LABEL */}
            <span className="leading-none">{label}</span>
          </button>


        );
      })}
    </div>
  );
}
