import React, { useEffect } from "react"
import { View } from "react-native"
import { useRecoilState } from "recoil"
import { productsState } from "../../atoms/productsAtom"
import axios from "../../axios"
import Product from "./Product"

const ProductFeed = () => {
    const [products, setProducts] = useRecoilState(productsState);

    useEffect(() => {
        const fetchProducts = async () => {
            const request = await axios.get("/products")
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