import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import "../../src/App.css";
import { projectService } from "../_services/project.service";
import { theme } from "../theme";

export const ProjectsView = () => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      let projects = await projectService.getAll();
      setProjects(projects);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Stack
      direction="row"
      spacing={6}
      sx={{ display: "flex", justifyContent: "center" }}
    >
      {projects.map((proj) => (
        <Box sx={{ paddingBottom: 2 }}>
          <Card
            key={proj.id}
            sx={{
              paddingTop: 2,
              backgroundColor: "black",
              border: 1,
              borderColor: theme.palette.primary.main,
              height: 200,
              width: 400,
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                sx={{ paddingBottom: 2 }}
              >
                {proj.title}
              </Typography>
              <Typography variant="body2">{proj.description}</Typography>
            </CardContent>
            <CardActions sx={{ paddingTop: 2 }}>
              <Button href={proj.sourceLink} size="small">
                Source
              </Button>
              <Button href={proj.demoLink} size="small">
                Demo
              </Button>
            </CardActions>
          </Card>
        </Box>
      ))}
    </Stack>
  );
};
