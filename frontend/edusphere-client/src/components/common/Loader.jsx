const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-white/20 border-t-primary rounded-full animate-spin mb-4"></div>

      {/* Text */}
      <p className="text-gray-300 text-sm tracking-wide">
        {text}
      </p>
    </div>
  );
};

export default Loader;
