import { Link as RouterLink } from "react-router-dom";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import Google from "@mui/icons-material/Google"
import { AuthLayout } from "../layout/AuthLayout";

export const RegisterPage = () => {
    return (
        <AuthLayout title="Sign in">
            <form>
                <Grid container>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField label="Nombre completo" type="text" placeholder="Nombre completo" fullWidth />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField label="Correo" type="email" placeholder="correo@google.com" fullWidth />
                    </Grid>
                    
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField label="Contraseña" type="password" placeholder="Contraseña" fullWidth />
                    </Grid>

                    <Grid container
                        spacing={2}
                        sx={{ mb: 2, mt: 1 }}
                    >
                        <Grid item xs={12} sm={12}>
                            <Button variant="contained" fullWidth>
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

