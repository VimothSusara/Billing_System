export const handleError = (error) => {
  return (
    error.response?.data?.error || error.message || "Something went wrong!"
  );
};
