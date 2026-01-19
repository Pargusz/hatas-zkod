
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from "firebase/auth";
import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp
} from "firebase/firestore";
import { auth, db } from "./firebase";

export const registerUser = async (email, password, displayName) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, { displayName });

        // Create user record in Firestore
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            displayName,
            email,
            role: "user", // Default role
            createdAt: serverTimestamp(),
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${displayName}`
        });

        return user;
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
};

export const logoutUser = async () => {
    return signOut(auth);
};

export const getUserData = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    }
    return null;
};

// Admin setup script logic
export const ensureAdminExists = async (email, password, displayName) => {
    try {
        // Try to login first
        try {
            await loginUser(email, password);
            console.log("Admin already exists and logged in.");
            // Ensure role is admin
            const user = auth.currentUser;
            const data = await getUserData(user.uid);
            if (data && data.role !== "admin") {
                await setDoc(doc(db, "users", user.uid), { role: "admin" }, { merge: true });
            }
        } catch (e) {
            if (e.code === 'auth/user-not-found' || e.code === 'auth/invalid-credential') {
                // Create admin if not found
                const user = await registerUser(email, password, displayName);
                await setDoc(doc(db, "users", user.uid), { role: "admin" }, { merge: true });
                console.log("Admin created.");
            } else {
                throw e;
            }
        }
    } catch (error) {
        console.error("Admin setup failed:", error);
    }
};
