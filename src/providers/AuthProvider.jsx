import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";
export const AuthContext = createContext(null)
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [currentUser, setCurrentUser] = useState({})
    const [loading, setLoading] = useState(true);

    // register with email password
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // email pass login 
    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // google login
    const googleLogin = () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)
    }

    //logout
    const logout = () => {
        return signOut(auth);
    }

    // update user name and photo 
    const updateUserData = (user, name, photo) => {
        return updateProfile(user, {
            displayName: name,
            photoURL: photo
        })
            .then(() => {
                setUser((prevUser) => ({
                    ...prevUser,
                    displayName: name,
                    photoURL: photo
                }));
            })
            .catch((error) => {
                console.log(error);
            });
    }
    // observe auth state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
            console.log('provider?:', currentUser);

        });
        return () => {
            unsubscribe();
        }
    }, [])
    console.log('provider?user:', user);
    // current user from db:
    useEffect(() => {
        axios.get(`https://speak-ease-server.vercel.app/current-user?email=${user?.email}`)
            .then(res => {
                setCurrentUser(res.data)
            })
    }, [user]);

    // information 
    const authInfo = {
        createUser,
        login,
        googleLogin,
        logout,
        user,
        loading,
        updateUserData,
        currentUser
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;