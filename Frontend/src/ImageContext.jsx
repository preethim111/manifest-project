import React, { createContext, useState, useContext } from "react";

const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [previewImage, setPreviewImage] = useState([null]);

  return (
    <ImageContext.Provider value={{ previewImage, setPreviewImage }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => useContext(ImageContext);
