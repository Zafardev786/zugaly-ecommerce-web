export default function CategoryCard({ image, title }) {
  return (
    <div
      className="
        flex flex-col items-center gap-2
        p-3 w-32 sm:w-36 md:w-40
        cursor-pointer
        transition-all duration-200
        hover:scale-105
      "
    >
      {/* Image Box */}
      <div
        className="
          w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28
          rounded-2xl
          overflow-hidden
          bg-green-50
          border border-green-100
          flex items-center justify-center
          shadow-sm
        "
      >
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <span className="text-gray-400 text-xs">No Image</span>
        )}
      </div>

      {/* Title */}
      <span className="text-center text-sm sm:text-base font-medium text-gray-700">
        {title}
      </span>
    </div>
  );
}
