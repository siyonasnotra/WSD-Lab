
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ImagePage.css';

const ImagePage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Pexels API to fetch gym-related images
    const API_KEY = '7IXy5W1hiCn2fCeqETC1hEUHFkWyVo9GSeSDD9Bh2pNjvQgvj6l41OLr'; // Replace with your Pexels API key
    const url = 'https://api.pexels.com/v1/search?query=gym&per_page=50';

    axios.get(url, {
      headers: {
        Authorization: API_KEY
      }
    })
      .then((response) => {
        setImages(response.data.photos);
      })
      .catch((error) => {
        console.error('Error fetching the images:', error);
      });
  }, []);

  return (
    <div className="images-container"><br>
    </br><br> 
    </br>
      <h2>Gym Images</h2>
      <div className="image-grid">
        {images.map((image, index) => (
          <img key={index} src={image.src.medium} alt="Gym" className="gym-image" />
        ))}
      </div>
    </div>
  );
};

export default ImagePage;