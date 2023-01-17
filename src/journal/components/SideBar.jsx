import { TurnedInNot } from "@mui/icons-material"
import { Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { Box } from "@mui/system"

export const SideBar = ({ drawerWidth = 240 }) => {
    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant="permanent"
                open={ true }
                sx={{
                    display: { xs: "block" },
                    "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth }
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">Luca Leiva</Typography>
                </Toolbar>
                <Divider />

                <List>
                    {
                        ["Enero", "Febrero", "Marzo", "Abril"].map(text => (
                            <ListItem key={ text } disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <TurnedInNot />
                                    </ListItemIcon>
                                    <Grid container>
                                        <ListItemText primary={ text } />
                                        <ListItemText secondary="nasdasdsdadasasdasdds" />
                                    </Grid>
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                    {
                      ["Mayo", "Junio", "Julio", "Agosto"].map(text => (
                        <ListItem key={ text } disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TurnedInNot />
                                </ListItemIcon>
                                <Grid container>
                                    <ListItemText primary={ text } />
                                    <ListItemText secondary="aaa" />
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                    ))
                    }
                </List>

            </Drawer>
        </Box>
    )
}
