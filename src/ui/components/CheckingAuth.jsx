import { CircularProgress, Grid } from "@mui/material";


export const CheckingAuth = () => {
  return (
    <Grid container
      spacing={0} // espacio entre los hijos
      direction="column" // esto es como flexbox
      alignItems="center"
      justifyContent="center"
      // sx es como styles, pero puedo acceder al theme del theme provider
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
    >
      <Grid container
        direction="row"
        justifyContent="center"
      >
        <CircularProgress color="warning" />
      </Grid>
    </Grid>
  )
}
