// src/ProductComponent.tsx
import React, { useState, useEffect } from "react";
import { Product } from "../model/product";  // Ensure this matches your Product interface
import axios from "axios";

interface ProductComponentProps {
    productId: number;
}

const ProductComponent: React.FC<ProductComponentProps> = ({ productId }) => {
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                console.log(`Fetching product with ID: ${productId}`); // Log the ID being fetched
                const response = await axios.get<Product>(`http://localhost:8000/product/${productId}`);
                console.log('Product fetched successfully:', response.data); // Log the fetched data
                setProduct(response.data); // Update state with the fetched data
              // Set loading to false once data is fetched
            } catch (error: any) {  // Casting error as any
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [productId]);

    // Show a loading state while the product is being fetched
    if (!product) return <div>Loading...</div>;

    return (
        <div>
            <img src={product.thumbnail} alt={product.title} />
            <h2>{product.title}</h2> 
            <p>{product.description}</p>        
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
        </div>
    );
};

export default ProductComponent;
