export const formatDate = (dateString, options = {}) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date)) return "-";
    const defaultOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-GB", { ...defaultOptions, ...options }).toLowerCase();

  };
  