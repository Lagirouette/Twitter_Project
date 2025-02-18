import { notFound } from "next/navigation";

export default async function Page({params} : {
    params: Promise<{productId: any}>
}) {
    const productId = (await params).productId;

    if (productId > 1000){
        return(
            notFound()
        )
    }

    return (
        <div>Les details à propos du produit {productId}</div>
    );
}