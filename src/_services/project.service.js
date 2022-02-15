import {
  createProject,
  deleteProject,
  updateProject,
} from "../../src/graphql/mutations";
import { listProjects, getProject } from "../../src/graphql/queries";
import { API, Auth } from "aws-amplify";

const checkAuthenticated = async () => {
  try {
    return await Auth.currentAuthenticatedUser();
  } catch (err) {
    console.error("Error validating user", err);
  }
};

const getAll = async () => {
  try {
    let user = await checkAuthenticated();
    const projectData = await API.graphql({
      query: listProjects,
      variables: {},
      authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "API_KEY",
    });
    return projectData.data.listProjects.items;
  } catch (err) {
    console.error(err);
  }
};

const getById = async (id) => {
  try {
    let user = await checkAuthenticated();
    const projectDetails = await API.graphql({
      query: getProject,
      variables: { id: id },
      authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "API_KEY",
    });

    return projectDetails.data.getProject;
  } catch (err) {
    console.error(err);
  }
};

const create = async (data) => {
  try {
    return await API.graphql({
      query: createProject,
      variables: { input: data },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (err) {
    console.error("error creating project:", err);
  }
};

const update = async (data) => {
  console.log(data);
  try {
    return await API.graphql({
      query: updateProject,

      variables: { input: data },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (err) {
    console.error("error updating project:", err);
  }
};

const _delete = async (id) => {
  try {
    return await API.graphql({
      query: deleteProject,
      variables: { input: { id } },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (err) {
    console.error(err);
  }
};

export const projectService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};
