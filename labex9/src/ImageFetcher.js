import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ImageFetcher.css';

const ImageFetcher = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Pexels API to fetch gym-related images
        const API_KEY = '7IXy5W1hiCn2fCeqETC1hEUHFkWyVo9GSeSDD9Bh2pNjvQgvj6l41OLr'; // Replace with your Pexels API key
        const url = 'https://api.pexels.com/v1/search?query=gym&per_page=50';

        axios.get(url, {
            headers: {
                Authorization: API_KEY
            }
        })
            .then(response => {
                setImages(response.data.photos);
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the images!", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="image-gallery">
            {images.map(image => (
                <div key={image.id} className="image-item">
                    <img src={image.src.medium} alt="Gym" />
                </div>
            ))}
        </div>
    );
};

export default ImageFetcher;