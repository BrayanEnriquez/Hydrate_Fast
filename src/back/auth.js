import { getAuth, signOut } from "firebase/auth"

export const authFirebase = getAuth()

export const logout = async () => {
    await signOut(authFirebase)
}