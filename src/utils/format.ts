export const formatDate = (dateString: string) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-EN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
