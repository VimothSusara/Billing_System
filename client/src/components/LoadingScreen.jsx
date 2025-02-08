const LoadingScreen = () => {
  //Can add a color prop to the loading screen to change the color
  return (
    <>
      <div
        className="flex items-center justify-center h-screen gap-2"
        role="alert"
        aria-busy="true"
        aria-live="polite"
      >
        <span className="sr-only">Loading...</span>
        <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce" />
        <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce [animation-delay:-.3s]" />
        <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce [animation-delay:-.5s]" />
        {/* <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div> */}
      </div>
    </>
  );
};

export default LoadingScreen;
