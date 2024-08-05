import React, { useState } from 'react';
import axios from 'axios';

const ImageGenerator = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!title || !content) {
            return alert('Add Some Data');
        }

        try {
            const response = await axios.post('http://localhost:5000/api/generate-og-image', {
                "title": title,
                "content": content,
            });

            const data = response.data;
            setImageUrl(data.imageUrl);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className='image-generator-container'>

                <div className='image-generator-content'>

                    <h1>Dynamic Image Generation</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <textarea rows="4" cols="50"
                            placeholder="Content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                        <button className='custom-btn' type="submit">Generate Image</button>

                    </form>
                </div>

            </div>
            <div className='generated-img'>
                {imageUrl && (
                    <div className="og-image-container">
                        <h2>Generated OG Image:</h2>
                        <img src={imageUrl} alt="Generated OG Image" />
                    </div>
                )}

            </div>
        </>
    );
}

export default ImageGenerator