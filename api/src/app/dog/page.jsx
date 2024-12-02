"use client";

import React, { useState } from "react";

const DogPage = () => {
  const [dogImage, setDogImage] = useState();
  const getData = async () => {
    try {
      const res = await fetch("https://dog.ceo/api/breeds/image/random");
      const resData = await res.json();
      setDogImage(resData.message);
      console.log(resData);
    } catch (error) {
      console.error("Error fetching dog image:", error);
    }
  };

  return (
    <div>
      <button onClick={getData}>Get Random Dog Image</button>
      {dogImage && (
        <div>
          <img src={dogImage} alt="Random dog" />
        </div>
      )}
    </div>
  );
};

export default DogPage;
