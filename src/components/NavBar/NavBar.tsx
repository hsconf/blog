import {AppBar, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";

const NavBar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <NavLink to="/">Blog</NavLink>
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;