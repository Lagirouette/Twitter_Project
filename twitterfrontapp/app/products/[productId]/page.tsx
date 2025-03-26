"use client"
import { useEffect, useState } from 'react';

export default function DisplayImage({
    params,
}: {
    params: Promise<{imageId:number}>
}) {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            const {imageId} = await params
            const response = await fetch(`http://localhost:5130/api/Images/3`);
            if (response.ok) {
                const blob = await response.blob();
                setImageUrl(URL.createObjectURL(blob));
            }
        };

        fetchImage();
    }, []);

    return (
        <div>
            {imageUrl ? <img src={imageUrl} className='max-w-md h-auto rounded-xl' alt="Uploaded" /> : <p>Loading...</p>}
        </div>
    );
}