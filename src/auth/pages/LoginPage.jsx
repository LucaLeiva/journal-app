import { Link as RouterLink } from "react-router-dom";
import { Button, Grid, Link, TextField, Typography, Alert } from "@mui/material";
import Google from "@mui/icons-material/Google"
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth/thunks";
import { useMemo } from "react";

export const LoginPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth);
  
  const dispatch = useDispatch();
  const { email, password, onInputChange } = useForm({
    email: "leivazago@gmail.com",
    password: "123456"
  });

  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(startLoginWithEmailPassword(email, password));
  }

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  }

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
        <Grid container>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              //value={email}
              onChange={onInputChange}
            />
          </Grid>
          
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              //value={password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid container
            display={!!errorMessage ? "" : "none"}
            sx={{mt: 2, mb: -1}}
          >
            <Grid
              item
              xs={12}
            >
              <Alert severity="error">
                {errorMessage}
              </Alert>
            </Grid>
          </Grid>

          <Grid container
            spacing={2}
            sx={{ mb: 2, mt: 1 }}
          >
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                type="submit"
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                variant="contained"
                fullWidth
                onClick={onGoogleSignIn}>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container
            direction="row"
            justifyContent="end"
          >
            {/* Este link es de material, pero solo es el estilo, adentro tengo que poner
            el componente de router que quiera, en este caso Link (con un alias) de React-Router-DOM */}
            <Link component={ RouterLink } color="inherit" to="/auth/register">
              Create account
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}
