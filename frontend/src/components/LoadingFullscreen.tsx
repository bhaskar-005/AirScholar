const LoadingFullscreen = () => {
  return (
    <div className="z-full w-[100%] h-[100%] absolute flex items-center justify-center bg-white bg-opacity-70">
    <div className="border-t-4 border-blue-500 border-solid rounded-full animate-spin h-12 w-12"></div>
    </div>

  );
}

export default LoadingFullscreen;
