import logo from "./mypic.jpeg";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { ProjectsView } from "./components/ProjectsView";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Stack } from "@mui/material";
import { main } from "@popperjs/core";

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#0f0",
    },
    background: {
      default: "#111111",
      paper: "#212121",
    },
    text: {
      primary: "rgba(255,255,255,0.87)",
      secondary: "rgba(255,215,215,0.54)",
    },
  },
  typography: {
    fontFamily: "Open Sans",
    h1: {
      fontFamily: "Ubuntu Mono",
    },
    h2: {
      fontFamily: "Ubuntu Mono",
    },
    h3: {
      fontFamily: "Ubuntu Mono",
    },
    h4: {
      fontFamily: "Ubuntu Mono",
    },
    h6: {
      fontFamily: "Ubuntu Mono",
    },
    h5: {
      fontFamily: "Ubuntu Mono",
    },
    subtitle1: {
      fontFamily: "Ubuntu Mono",
    },
    subtitle2: {
      fontFamily: "Ubuntu Mono",
    },
    button: {
      fontFamily: "Ubuntu Mono",
      fontWeight: 900,
    },
    overline: {
      fontFamily: "Ubuntu Mono",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Byron Blank's Project Portfolio
            </Typography>
            <Button>Test</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ flexGrow: 1, paddingTop: 5 }}>
        <Paper elevation={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="h3"
                component="div"
                sx={{
                  flewGrow: 1,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Byron Blank's Project Portfolio
              </Typography>{" "}
              <Grid item xs={12}>
                <Avatar
                  alt="Byron Blank"
                  src={logo}
                  sx={{ width: 200, height: 200, margin: "auto" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h3"
                  component="div"
                  sx={{
                    flewGrow: 1,
                    textAlign: "center",
                  }}
                >
                  I am a web developer.
                </Typography>{" "}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Box sx={{ flexGrow: 1, paddingTop: 5 }}>
        <Paper elevation={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  flewGrow: 1,
                  textAlign: "center",
                }}
              >
                Projects
              </Typography>{" "}
            </Grid>
            <Grid item xs={12}>
              <ProjectsView />
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Box sx={{ flexGrow: 1, paddingTop: 5 }}>
        <Paper elevation={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  flewGrow: 1,
                  textAlign: "center",
                }}
              >
                Contact Me
              </Typography>{" "}
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Stack direction="row" spacing={2}>
                  <IconButton aria-label="linkedin">
                    <FontAwesomeIcon
                      icon={faLinkedin}
                      size="3x"
                      color={theme.palette.primary.main}
                    />
                  </IconButton>
                  <IconButton aria-label="github">
                    <FontAwesomeIcon
                      icon={faGithub}
                      size="3x"
                      color={theme.palette.primary.main}
                    />
                  </IconButton>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
export default App;
