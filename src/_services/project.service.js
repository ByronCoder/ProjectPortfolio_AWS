import {
  createProject,
  deleteProject,
  updateProject,
} from "../../src/graphql/mutations";
import { listProjects, getProject } from "../../src/graphql/queries";
import { API, Auth } from "aws-amplify";

const checkAuthenticated = async () => {
  let user = null;

  try {
    user = await Auth.currentAuthenticatedUser();
    return user;
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
    const projects = projectData.data.listProjects.items;
    return projects;
  } catch (err) {
    console.error(err);
  }
};

const getById = async ({ id }) => {
  let user = await this.checkAuthenticated();
  try {
    let project = await API.graphql({
      query: getProject,
      variables: { input: { id } },
      authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "API_KEY",
    });
    return project;
  } catch (err) {
    console.error(err.message);
  }
};

const create = async (data) => {
  try {
    await API.graphql({
      query: createProject,
      variables: { input: data },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (err) {
    console.error("error creating project:", err);
  }
};

const update = async (data) => {
  try {
    await API.graphql({
      query: updateProject,
      variables: { input: data },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (err) {
    console.error("error creating project:", err);
  }
};

const _delete = async (id) => {
  try {
    await API.graphql({
      query: deleteProject,
      variables: { input: id },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const projectService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};
