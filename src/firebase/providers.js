import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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