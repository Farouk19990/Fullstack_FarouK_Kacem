import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Product } from "../model/product";
import '../src/css/styles.css';
const ProductDetail: React.FC = () => {
    const { id } = useParams(); // Get product ID from URL parameters
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await axios.get<Product>(`http://localhost:8000/product/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        fetchProductDetail();
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
        </div>
    );
};

export default ProductDetail;
