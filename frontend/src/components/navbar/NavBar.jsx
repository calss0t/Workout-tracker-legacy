import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import UserProfile from "../userProfile/UserProfile";
import LoginSignup from "../LoginSignup";

export default function NavBar({ setView, displayProfile, setDisplayProfile }) {
  function logout() {
    localStorage.clear();
    setDisplayProfile(false);
    setView(<LoginSignup setView={setView}></LoginSignup>)
  }
  return (
    <Box style={{ display: "flex", justifyContent: "center" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Workout tracker</Typography>
          <Button color="inherit" style={{ marginLeft: "auto" }} onClick={() => {
            displayProfile ? logout() : setView(<UserProfile setDisplayProfile={setDisplayProfile} setView={setView}></UserProfile>)
          }}>
            {displayProfile ? "Logout" : "Profile"}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
