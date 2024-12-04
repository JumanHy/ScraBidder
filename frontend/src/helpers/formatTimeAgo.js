const formatTimeAgo = (timestamp) => {
  const now = new Date();
  const createdAt = new Date(timestamp);
  const diffInSeconds = Math.floor((now - createdAt) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return "Now";
  } else if (diffInMinutes === 1) {
    return "1 min ago";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} mins ago`;
  } else if (diffInHours === 1) {
    return "1 hour ago";
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else {
    // Show exact date and time if more than 7 days ago
    return createdAt.toLocaleString();
  }
};

export default formatTimeAgo;
