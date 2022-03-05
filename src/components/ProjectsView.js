import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../../src/App.css";
import { projectService } from "../_services/project.service";

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
    <div>
      {projects.map((proj) => (
        <Card key={proj.id} sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {proj.title}
            </Typography>
            <Typography variant="body2">{proj.description}</Typography>
          </CardContent>
          <CardActions>
            <Button href={proj.sourceLink} size="small">
              Source
            </Button>
            <Button href={proj.demoLink} size="small">
              Demo
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};
