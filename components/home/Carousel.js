import React, { useState, useEffect, useRef } from "react"
import { View, Image, Dimensions, FlatList, Animated } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import tw from "tailwind-react-native-classnames"

const { width, height } = Dimensions.get("window")

const data = [
    {
        image: "https://m.media-amazon.com/images/I/71VLqgjNO7L._SX3000_.jpg"
    },
    {
        image: "https://m.media-amazon.com/images/I/710bVOR+wbL._SX3000_.jpg"
    },
    {
        image: "https://m.media-amazon.com/images/I/711Y9Al9RNL._SX3740_.jpg"
    }
]

const Carousel = () => {
    const carouselRef = useRef();
    const scrollX = new Animated.Value(0);
    const [dataList, setDataList] = useState(data);

    const infiniteScroll = (dataList, carouselRef) => {
        const dataLength = dataList.length
        let scrollValue = 0, scrolled = 0

        setInterval(() => {
            scrolled++
            if (scrolled < dataLength)
                scrollValue = scrollValue + width
            else {
                scrollValue = 0
                scrolled = 0
            }

            if (carouselRef.current) {
                carouselRef.current.scrollToOffset({ animated: true, offset: scrollValue })
            }
        }, 5000)
    }

    useEffect(() => {
        setDataList(data);
        infiniteScroll(dataList, carouselRef);
    }, [data, dataList, carouselRef])

    if (data && data.length) {
        return (
            <View style={tw`relative`}>
                <LinearGradient style={tw`absolute bottom-0 left-0 right-0 z-50 h-14 bottom-10`} colors={["transparent", "rgba(243, 244, 246, 1)"]} />
                <FlatList
                    ref={carouselRef}
                    data={data}
                    keyExtractor={(item, index) => index.toLocaleString()}
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    snapToAlignment="center"
                    scrollEventThrottle={16}
                    decelerationRate={"fast"}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <CarouselItem item={item} />
                    )}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false }
                    )}
                />
            </View>
        )
    }

    return null
}

const CarouselItem = ({ item }) => (
    <View style={{ flex: 1, width: width, height: height / 3 }}>
        <Image style={{ width: width, height: height / 3.5, resizeMode: "cover" }} source={{ uri: item.image }} />
    </View>
)

export default Carousel