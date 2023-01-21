import { Link as RouterLink } from "react-router-dom";
import { Button, Grid, Link, TextField, Typography, Alert } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";
import { useMemo } from "react";


const formData = {
  email: "",
  password: "",
  displayName: ""
}

const formValidations = {
  email: [(value) => value.includes("@"), "Email must have a @"],
  password: [(value) => value.length >= 6, "Password must have at least 6 characters"],
  displayName: [(value) => value.length > 0, "Name is mandatory"]
}

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector(state => state.auth);
  const isCheckingAuthentication = useMemo(() => status === "checking", [status]);

  const {
    formState, displayName, email, password, onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid
  } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;
    
    dispatch(startCreatingUserWithEmailPassword(formState));
  }

  return (
    <AuthLayout title="Sign in">      
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
        <Grid container>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Name"
              type="text"
              placeholder="Name"
              fullWidth
              name="displayName"
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={formSubmitted ? displayNameValid : ""}
              value={displayName}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={formSubmitted ? emailValid : ""}
              value={email}
            />
          </Grid>
          
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="Password"
              fullWidth
              name="password"
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={formSubmitted ? passwordValid : ""}
              value={password}
            />
          </Grid>

          <Grid container
            spacing={2}
            sx={{ mb: 2, mt: 1 }}
          >
            <Grid
              item
              xs={12}
              display={!!errorMessage ? "" : "none"}
            >
              <Alert severity="error">
                {errorMessage}
              </Alert>
            </Grid>
            <Grid item xs={12}>
              <Button
                disabled={isCheckingAuthentication}
                type="submit"
                variant="contained"
                fullWidth
              >
                Create account
              </Button>
            </Grid>
          </Grid>

          <Grid container
            direction="row"
            justifyContent="end"
            sx={{ mt: 1 }}
          >
            <Typography sx={{ mr: 1 }} >Already registered?</Typography>
            {/* Este link es de material, pero solo es el estilo, adentro tengo que poner
            el componente de router que quiera, en este caso Link (con un alias) de React-Router-DOM */}
            <Link component={ RouterLink } color="inherit" to="/auth/login">
              Login
            </Link>
              
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}

