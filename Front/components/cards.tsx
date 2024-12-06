import React, { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "../model/product";
import { useNavigate } from "react-router-dom";
import styles from '../src/css/ProductList.module.css'; // Import CSS Module

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get<Product[]>("http://localhost:8000/products");
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (products.length === 0) return <div>No products found.</div>;

    const handleShowMore = (productId: number) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div>
            <h1>Product List</h1>
            <div className={styles.productList}>
                {products.map((product) => (
                    <div key={product.id} className={styles.productItem}>
                        <img src={product.thumbnail} alt={product.title} className={styles.productImage} />
                        <h2 className={styles.productTitle}>{product.title}</h2>
                        <p className={styles.productDescription}>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <p>Category: {product.category}</p>
                        <button
                            className={styles.showMoreButton}
                            onClick={() => handleShowMore(product.id)}
                        >
                            Show More
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
