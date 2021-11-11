import React, { useEffect, useState } from "react"
import { View, Text, Image, Button, TextInput, Pressable } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import tw from "tailwind-react-native-classnames"
import useAuth from "../../hooks/useAuth"
import * as ImagePicker from "expo-image-picker"
import validUrl from "valid-url"
import { useNavigation } from "@react-navigation/core"
import { ref, getDownloadURL, uploadBytes } from "@firebase/storage"
import { storage, db } from "../../firebase"
import { updateDoc, doc } from "@firebase/firestore"

const EditProfileForm = () => {
    const editProfileSchema = Yup.object().shape({
        name: Yup.string().matches(/^([^0-9]*)$/, "Name should not contain numbers!").required("You must enter a name!"),
        location: Yup.string()
    })

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(editProfileSchema)
    })

    const { user, setUser } = useAuth();
    const navigation = useNavigation();

    const [image, setImage] = useState(user.profilePicture);
    const [isLoading, toggleLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState("");

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
        })

        return setImage(result.uri)
    }

    useEffect(
        () =>
            (async () => {
                if (Platform.OS !== "web") {
                    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                    if (status !== "granted") {
                        alert("We need access to photos and media on your device.");
                    }
                }
            })(),
        []
    )

    // const handleImagePicked = async (pickerResult) => {
    //     try {
    //         setUploading(true);

    //         if (!pickerResult.cancelled) {
    //             const uploadUrl = await uploadImage(pickerResult.uri);
    //             setImage(uploadUrl);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         alert("Upload failed.")
    //     } finally {
    //         setUploading(false);
    //     }
    // }

    // const uploadImage = async (image) => {
    //     const blob = await new Promise((resolve, reject) => {
    //         const xhr = new XMLHttpRequest();

    //         xhr.onload = () => {
    //             resolve(xhr.response);
    //         }

    //         xhr.onerror = (e) => {
    //             console.log(e)
    //             reject(new TypeError("Network request failed"));
    //         }

    //         xhr.responseType = "blob"
    //         xhr.open("GET", image, true);
    //         xhr.send(null);
    //     })

    //     const imageRef = ref(storage, `${user.name} Profile Picture - Date: ${new Date().toISOString()}`);
    //     const result = await uploadBytes(imageRef, blob);

    //     blob.close();

    //     const downloadUrl = await getDownloadURL(imageRef);

    //     return downloadUrl
    // }

    const updateProfileData = async (data) => {
        toggleLoading(true);

        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.onload = () => {
                resolve(xhr.response);
            }

            xhr.onerror = (e) => {
                console.log(e)
                reject(new TypeError("Network request failed"));
            }

            xhr.responseType = "blob"
            xhr.open("GET", image, true);
            xhr.send(null);
        })

        const imageRef = ref(storage, `${user.name} Profile Picture - Date: ${new Date().toISOString()}`);
        const result = await uploadBytes(imageRef, blob);

        blob.close();

        const updateData = async (data) => {
            // Update user in database
            updateDoc(doc(db, "users", user.email), {
                name: data.name,
                location: data.location,
                profilePicture: await getDownloadURL(imageRef)
            })

            // Update user in state
            setUser({
                ...user,
                name: data.name,
                location: data.location,
                profilePicture: await getDownloadURL(imageRef)
            })
        }

        return updateData(data).then(() => toggleLoading(false))
    }

    return (
        <View style={tw`mt-8`}>
            {/* Profile Picture */}
            <View style={tw`items-center`}>
                <Text style={tw`font-bold`}>Upload a public profile picture</Text>
                <Text style={tw`text-gray-500 font-medium pb-3`}>(optional)</Text>
                <View style={tw`relative h-28 w-28 border-2 border-gray-300 rounded-full`}>
                    <Image
                        source={{ uri: validUrl.isUri(image) }}
                        style={tw`h-full w-full rounded-full`}
                    />

                    <Button title="Upload Photo" onPress={pickImage} />
                </View>
            </View>

            {/* Name */}
            <View style={tw`mt-16`}>
                <Text style={tw`flex-row mb-1`}>
                    <Text style={tw`font-bold`}>Name </Text>
                    <Text style={tw`text-gray-500 font-medium pb-3`}>(required)</Text>
                </Text>
                <Controller
                    control={control}
                    name="name"
                    defaultValue={user.name}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={tw`h-12 border ${errors.name ? "border-red-500" : "border-gray-400"} rounded-sm px-3`}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            placeholder="Name"
                            {...register("name")}
                        />
                    )}
                />
                {errors.name && <Text style={tw`py-2 text-red-500`}>{errors.name.message}</Text>}
            </View>

            {/* Location */}
            <View style={tw` mt-5`}>
                <Text style={tw`flex-row mb-1`}>
                    <Text style={tw`font-bold`}>Location </Text>
                    <Text style={tw`text-gray-500 font-medium pb-3`}>(optional)</Text>
                </Text>
                <Controller
                    control={control}
                    name="location"
                    defaultValue={user.location}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={tw`h-12 border ${errors.location ? "border-red-500" : "border-gray-400"} rounded-sm px-3`}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            placeholder="Location"
                            {...register("location")}
                        />
                    )}
                />
                {errors.location && <Text style={tw`py-2 text-red-500`}>{errors.location.message}</Text>}
            </View>

            {/* Buttons */}
            <View style={tw`flex-row justify-center mt-5`}>
                <Pressable onPress={() => navigation.goBack()} style={tw`bg-white shadow-md py-2.5 w-36 items-center mx-2 rounded-md border border-gray-300`}>
                    <Text style={tw`text-base`}>Not now</Text>
                </Pressable>
                <Pressable onPress={handleSubmit(updateProfileData)} style={[tw`shadow-md py-2.5 w-36 items-center mx-2 rounded-md`, { backgroundColor: "#fed814" }]}>
                    <Text style={tw`text-base`}>Submit</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default EditProfileForm