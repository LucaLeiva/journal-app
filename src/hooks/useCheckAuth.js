import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth/authSlice";
import { startLoadingNotes } from "../store/journal/thunks";


export const useCheckAuth = () => {
    const { status } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
      // creo que esto es lo que mantiene el estado de la autenticacion, no
      // es que se guarda en local storage
      onAuthStateChanged(FirebaseAuth, async(user) => {
        if (!user) return dispatch(logout());
        
        const { uid, email, displayName, photoURL } = user;
        dispatch(login({uid, email, displayName, photoURL}));

        // empiezo a cargar las notas
        dispatch(startLoadingNotes());
      });
    }, []);

    return status;
}
