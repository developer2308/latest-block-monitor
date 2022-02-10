import "./App.css";
import { Box, AppBar, Container, Toolbar, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <Container>
      <AppBar>
        <Toolbar>
          <Link
            to="/"
            style={{ flex: 1, textDecoration: "none", color: "white" }}
          >
            <Typography variant="h6">Full Stack Web Challenge</Typography>
          </Link>
          <Link
            to="/aboutme"
            style={{ textDecoration: "none", color: "white" }}
          >
            <Typography variant="h6">Sebastian</Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 10 }}>
        <Outlet />
      </Box>
    </Container>
  );
}

export default App;
