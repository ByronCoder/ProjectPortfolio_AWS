import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { createProject } from "../../src/graphql/mutations";
import { getProject, listProjects } from "../../src/graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

const EditForm = () => {
  const { id } = useParams();

  const projectDetails = async () => {
    try {
      const projectData = await API.graphql({
        query: getProject,
        variables: { id },
      });
      const project = projectData.data.getProject;
      return project;
    } catch (err) {
      console.error("error fetching project: " + err);
    }
  };

  const editProject = async () => {
    console.log("not implemented");
  };

  useEffect(() => {
    projectDetails();
  }, []);

  return <div></div>;
};

export default EditForm;
