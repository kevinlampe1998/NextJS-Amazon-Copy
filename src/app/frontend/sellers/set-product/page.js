'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function ImageUpload() {
    const [ image, setImage ] = useState(null);
    const [ imagePreview, setImagePreview ] = useState();

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const imageURL = URL.createObjectURL(file);
            setImagePreview(imageURL);
        }

        if (!file) setImagePreview(null); 

        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => setImage(reader.result);
        reader.readAsDataURL(file);
    };

    const handleUpload = async (event) => {
        event.preventDefault();
    
        const response = await fetch('/api/images/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: image }),
        });
        const data = await response.json();
        console.log(data);
    
      };

    return (
        <form onSubmit={handleUpload} className={styles.setProduct}>
            <input type="file" onChange={handleFileChange}/>

            {imagePreview && (
                <img 
                    src={imagePreview} 
                    alt="Preview"
                />
            )}
            <button type='submit'>Submit</button>
        </form>
    );
}