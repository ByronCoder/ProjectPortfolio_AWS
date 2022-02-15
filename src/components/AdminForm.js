import React, { useEffect, useState } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { projectService } from "../_services/project.service";

const AdminForm = () => {
  const { id } = useParams();
  const isAddMode = !id;

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    sourceLink: Yup.string().required("Source Link is required"),
    demoLink: Yup.string().required("Demo Link is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    return isAddMode ? addProject(data) : editProject(data);
  };
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      let projects = await projectService.getAll();
      setProjects(projects);
    } catch (err) {
      console.error(err);
    }
  };

  const addProject = (data) => {
    return projectService
      .create(data)
      .then(() => {
        const project = { ...data };
        console.log(project);
        setProjects([...projects, project]);
      })
      .catch(() => {
        console.error("Error adding project");
      });
  };

  const editProject = (data) => {
    return projectService
      .update(data)
      .then(() => {
        const newProjectArray = projects.map((proj) =>
          proj.id === id ? data : proj
        );
        setProjects(newProjectArray);
      })
      .catch(() => {
        console.error("Error updating project");
      });
  };

  const removeProject = async (id) => {
    projectService
      .delete(id)
      .then(() => {
        const newProjectArray = projects.filter((proj) => proj.id !== id);
        setProjects(newProjectArray);
      })
      .catch(() => {
        console.error("Error deleting project");
      });
  };

  useEffect(() => {
    fetchProjects();
    if (!isAddMode) {
      console.log(id);
      projectService.getById(id).then((project) => {
        const fields = ["id", "title", "description", "sourceLink", "demoLink"];
        fields.forEach((field) =>
          setValue(field, project[field], { shouldValidate: true })
        );
      });
    }
  });

  return (
    <Authenticator>
      {({ signOut }) => (
        <main>
          <div className="row">
            <h1 className="form-title">
              {isAddMode ? "Add Project" : "Edit Project"}
            </h1>
            <div className="col-lg-8 mx-auto">
              <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
                <div className="control-group">
                  <div className="form-group floating-label-form-group controls mb-0 pb-2">
                    {!isAddMode && (
                      <input name="id" type="hidden" {...register("id")} />
                    )}
                    <label>Title</label>
                    <input
                      name="title"
                      className="form-control"
                      {...register("title")}
                    />
                  </div>
                </div>
                <div className="control-group">
                  <div className="form-group floating-label-form-group controls mb-0 pb-2">
                    <label>Description</label>
                    <input
                      className="form-control"
                      {...register("description")}
                    />
                  </div>
                </div>
                <div className="control-group">
                  <div className="form-group floating-label-form-group controls mb-0 pb-2">
                    <label>Source Link</label>
                    <input
                      className="form-control"
                      {...register("sourceLink")}
                    />
                  </div>
                </div>
                <div className="control-group">
                  <div className="form-group floating-label-form-group controls mb-0 pb-2">
                    <label>Demo Link</label>
                    <input className="form-control" {...register("demoLink")} />
                  </div>
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    disabled={formState.isSubmitting}
                    className="btn btn-primary"
                  >
                    {formState.isSubmitting && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                    Save
                  </button>
                  <Link to={isAddMode ? "." : ".."} className="btn btn-link">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
            <div>
              {" "}
              <h2 className="form-title">Projects Table</h2>
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
                            reloadDocument="true"
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
                            onClick={() => removeProject(proj.id)}
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
          </div>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
};
export default AdminForm;
