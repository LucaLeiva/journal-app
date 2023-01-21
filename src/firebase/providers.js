import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

// creamos nuestro proveedor, puede ser de Google, Twitter, Facebook, etc
const googleProvider = new GoogleAuthProvider();

// y aca tratamos de logearnos con la conexion a la autenticacion y el proveedor
export const singInWithGoogle = async() => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult(result);
    const { displayName, email, photoURL, uid } = result.user;
    
    return {
      ok: true,
      // user info
      displayName, email, photoURL, uid
    }
  } catch (error) {
    const { code, message } = error;

    return {
      ok: false,
      message, code
    }
  }
}

export const registerUserWithEmailPassword = async({ email, password, displayName }) => {
  try {
    const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, photoURL } = resp.user;
    await updateProfile(FirebaseAuth.currentUser, {displayName});

    return {
      ok: true,
      uid, photoURL, email, displayName
    }

  } catch (error) {

    let errorResponse;

    if (error.code === "auth/email-already-in-use") {
      errorResponse = "Email already in use";
    } else {
      errorResponse = "Unkown error";
    }

    return {
      ok: false,
      errorMessage: errorResponse
    }
  }
}

export const loginWithEmailPassword = async({ email, password }) => {
  try {
    const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, photoURL, displayName } = resp.user;
    return {
      ok: true,
      uid, photoURL, displayName, email
    }

  } catch(error) {
    let errorResponse;

    if (error.code === "auth/user-not-found") {
      errorResponse = "User not found"
    } else if (error.code === "auth/wrong-password") {
      errorResponse = "Wrogn password"
    }

    return {
      ok: false,
      errorMessage: errorResponse
    }
  }
}

export const logoutFirebase = async() => {
  return await FirebaseAuth.signOut();
}