import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useNavigation } from "@react-navigation/core"
import { onSnapshot, doc, setDoc, serverTimestamp } from "@firebase/firestore"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "@firebase/auth"
import { auth, db } from "../firebase"

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const navigation = useNavigation();

    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(
        () =>
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    onSnapshot(
                        doc(db, "users", user.email),
                        (doc) => {
                            setUser({
                                uid: user.uid,
                                ...doc.data()
                            })
                        }
                    )
                } else {
                    setUser(null);
                }

                setLoadingInitial(false);
            }),
        []
    )

    const signIn = async (email, password) => {
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);

            navigation.navigate("MainScreen")
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    const signUp = async (name, email, password) => {
        setLoading(true);

        try {
            const authUser = await createUserWithEmailAndPassword(auth, email, password);
            setDoc(doc(db, "users", authUser.user.email), {
                uid: authUser.user.uid,
                email: authUser.user.email,
                name: name,
                profilePicture: "https://i.ibb.co/nPbJWTD/default-profile-pic-e1513291410505.jpg",
                location: "",
                timestamp: serverTimestamp()
            })

            navigation.navigate("MainScreen")
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    const logout = async () => {
        setLoading(true);

        try {
            await signOut(auth);
            navigation.navigate("MainScreen")
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    const memoedValue = useMemo(() => ({
        user,
        error,
        loadingInitial,
        loading,
        setUser,
        signIn,
        signUp,
        signOut: logout
    }), [user, error, loading, loadingInitial]);

    return (
        <AuthContext.Provider value={memoedValue}>
            {!loadingInitial && children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth