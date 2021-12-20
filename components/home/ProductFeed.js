import React, { useEffect, useState } from "react"
import { View } from "react-native"
import axios from "axios"
import Product from "./Product"

const ProductFeed = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const request = await axios.get("https://fakestoreapi.com/products")
            setProducts(request.data)

            return request
        }

        fetchProducts();
    }, [])

    return (
        <View>
            {products?.map(({ id, title, price, category, image, rating }) => (
                <Product
                    key={id}
                    id={id}
                    title={title}
                    price={price}
                    category={category}
                    image={image}
                    rating={rating}
                />
            ))}
        </View>
    )
}

export default ProductFeed