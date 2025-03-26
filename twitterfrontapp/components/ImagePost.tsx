"use client"

import { useEffect, useState } from "react";

export default function ImagePost({imageId}:{imageId:number}) {

    const [imageUrl, setImageUrl] = useState('');
    
        useEffect(() => {
            if(imageId == null){
                return
            }
            const fetchImage = async () => {
                const response = await fetch(`http://localhost:5130/api/Images/${imageId}`);
                if (response.ok) {
                    const blob = await response.blob();
                    setImageUrl(URL.createObjectURL(blob));
                }
            };
    
            fetchImage();
        }, []);
    
        return (
            <div>
                {imageUrl && <img src={imageUrl} className='max-w-md h-auto rounded-xl mx-auto' alt="Uploaded" />}
            </div>
        );

}