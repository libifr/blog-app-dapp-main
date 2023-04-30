import { createPortal } from "react-dom";

const Loader = ({ isLoading, text = false }) => {
  if (!isLoading) {
    return null;
  }

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      {text && (
        <p className="text-white font-bold text-xl absolute animate-bounce">
          {text}
        </p>
      )}
    </div>,
    document.getElementById("loader-root")
  );
};

export default Loader;
