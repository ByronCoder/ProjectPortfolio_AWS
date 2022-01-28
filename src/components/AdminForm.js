import React, { useEffect, useState } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import {
  createProject,
  deleteProject,
  updateProject,
} from "../../src/graphql/mutations";
import { listProjects } from "../../src/graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import { Link } from "react-router-dom";
const initialState = {
  title: "",
  description: "",
  sourceLink: "",
  demoLink: "",
};

const AdminForm = () => {
  const [formState, setFormState] = useState(initialState);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const setInput = (key, value) => {
    setFormState({ ...formState, [key]: value });
  };

  const fetchProjects = async () => {
    try {
      const projectData = await API.graphql({
        query: listProjects,
        variables: {},
        authMode: "AMAZON_COGNITO_USER_POOLS", // Using AMAZON_COGNITO_USER_POOLS for private read as user should be authenticated at this point
      });
      const projects = projectData.data.listProjects.items;
      setProjects(projects);
    } catch (err) {
      console.error("error fetching projects: ",err);
    }
  };

  const addProject = async (evt) => {

    evt.preventDefault(); // Done to prevent refresh of page

    try {
      if (
        (!formState.title || !formState.description || !formState.sourceLink,
        !formState.demoLink)
      )
        return;

      const project = { ...formState };
      setProjects([...projects, project]);
      setFormState(initialState);
      await API.graphql({
        query: createProject,
        variables: { input: project },
        authMode: "AMAZON_COGNITO_USER_POOLS"
      });
    } catch (err) {
      console.error("error creating project: ", err); // Changed to console.error
    }
  };

  const removeProject = async ({ id }) => {
    const newProjectArray = projects.filter((proj) => proj.id !== id);
    setProjects(newProjectArray);
    try {
      await API.graphql({ query: deleteProject, variables: { input: { id } } });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Authenticator>
      {({ signOut }) => (
        <main>
          <div className="row">
            <h3 className="form-title">Portfolio Administration</h3>
            <div className="col-lg-8 mx-auto">
              <form
                name="createProject"
                id="projectForm"
                noValidate="novalidate"
              >
                <div className="control-group">
                  <div className="form-group floating-label-form-group controls mb-0 pb-2">
                    <label>Title</label>
                    <input
                      onChange={(event) =>
                        setInput("title", event.target.value)
                      }
                      value={formState.title}
                      className="form-control"
                      id="title"
                      name="title"
                      type="text"
                      placeholder="Title"
                      required="required"
                      data-validation-required-message="Please enter a title for this project."
                    ></input>
                    <p className="help-block text-danger"></p>
                  </div>
                </div>
                <div className="control-group">
                  <div className="form-group floating-label-form-group controls mb-0 pb-2">
                    <label>Description</label>
                    <input
                      onChange={(event) =>
                        setInput("description", event.target.value)
                      }
                      value={formState.description}
                      className="form-control"
                      id="description"
                      name="description"
                      type="text"
                      placeholder="Description"
                      required="required"
                      data-validation-required-message="Please enter a description for this project."
                    ></input>
                    <p className="help-block text-danger"></p>
                  </div>
                </div>
                <div className="control-group">
                  <div className="form-group floating-label-form-group controls mb-0 pb-2">
                    <label>Source Link</label>
                    <input
                      onChange={(event) =>
                        setInput("sourceLink", event.target.value)
                      }
                      value={formState.sourceLink}
                      className="form-control"
                      id="sourceLink"
                      name="sourceLink"
                      type="text"
                      placeholder="Source Link"
                      required="required"
                      data-validation-required-message="Please enter a source link for this project."
                    ></input>
                    <p className="help-block text-danger"></p>
                  </div>
                </div>
                <div className="control-group">
                  <div className="form-group floating-label-form-group controls mb-0 pb-2">
                    <label>Demo Link</label>
                    <input
                      onChange={(event) =>
                        setInput("demoLink", event.target.value)
                      }
                      value={formState.demoLink}
                      className="form-control"
                      id="demoLink"
                      name="demoLink"
                      type="text"
                      placeholder="Demo Link"
                      required="required"
                      data-validation-required-message="Please enter a demo link for this project."
                    ></input>
                    <p className="help-block text-danger"></p>
                  </div>
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-primary btn-xl"
                    id="createProjectBtn"
                    onClick={addProject}
                  >
                    Create Project
                  </button>
                  <h2>Projects Table</h2>
                  <div className="table-responsive">
                    <table className="table table-dark table-portfolio w-auto">
                      <thead>
                        <tr>
                          <th scope="col">Project Name</th>
                          <th scope="col">Description</th>
                          <th scope="col">Source</th>
                          <th scope="col">Demo</th>
                          <th scope="col"></th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {projects.map((proj) => (
                          <tr key={proj.id}>
                            <td className="cell-left">{proj.title}</td>
                            <td className="cell-left">{proj.description}</td>
                            <td>
                              <a href={proj.sourceLink}>Click Here</a>
                            </td>
                            <td>
                              {proj.demoLink !== "N/A" ? (
                                <a href={proj.demoLink}>Click Here</a>
                              ) : (
                                proj.demoLink
                              )}
                            </td>
                            <td>
                              <Link
                                className="btn btn-primary"
                                to={{
                                  pathname: "/edit/" + proj.id,
                                }}
                              >
                                Edit
                              </Link>
                            </td>
                            <td>
                              <button
                                onClick={() => removeProject(proj)}
                                className="btn btn-danger"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
};

export default AdminForm;
