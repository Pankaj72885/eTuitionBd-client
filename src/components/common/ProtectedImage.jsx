import React, { useState } from "react";

const ProtectedImage = ({ src, alt, className, fallback }) => {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  if (error || !src) {
    return (
      <img
        src={fallback || "https://picsum.photos/seed/default/200/200.jpg"}
        alt={alt}
        className={className}
      />
    );
  }

  return (
    <img src={src} alt={alt} className={className} onError={handleError} />
  );
};

export default ProtectedImage;
