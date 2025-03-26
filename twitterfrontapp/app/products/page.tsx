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
            {imageUrl ? <img src={imageUrl} alt="Uploaded" /> : <p>Loading...</p>}
        </div>
    );
}