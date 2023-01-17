import { Grid, Typography } from "@mui/material";

export const AuthLayout = ({ children, title = "" }) => {
    return (
        <Grid container
            spacing={0} // espacio entre los hijos
            direction="column" // esto es como flexbox
            alignItems="center"
            justifyContent="center"
            // sx es como styles, pero puedo acceder al theme del theme provider
            sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
        >
            <Grid item
                className="box-shadow"
                xs={3} // este es tamaño de pantalla, es parecido a bootstrap, cada elemento tiene 12 posiciones
                sx={{ width: {sm: 500}, backgroundColor: "white", padding: 3, borderRadius: 2 }}
            >
                <Typography variant="h5" sx={{ mb: 1 }}>{ title }</Typography>
            
                { children }
            
            </Grid>
        </Grid>
    )
}
