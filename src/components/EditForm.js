import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { createProject } from "../../src/graphql/mutations";
import { getProject, listProjects } from "../../src/graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

const EditForm = () => {
  const [projects, setProjects] = useState([]);
  const { id } = useParams();
  console.log(id);
  const fetchProjects = async () => {
    try {
      const projectData = await API.graphql({
        query: getProject,
        variables: { id },
      });
      const projects = projectData.data.getProject;
      console.log(projects);
      setProjects(projects);
    } catch (err) {
      console.log("error fetching project: " + err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      <p>{projects.title}</p>
      <p>{projects.description}</p>
      <p>{projects.sourceLink}</p>
      <p>{projects.demoLink}</p>
    </div>
  );
};

export default EditForm;
