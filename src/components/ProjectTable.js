import { API, graphqlOperation } from "aws-amplify";
import React from "react";
import "../../src/App.css";
import { listProjects } from "../../src/graphql/queries";
import { Auth } from "aws-amplify";

class ProjectsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { projectsList: [] };
  }

  checkAuthenticated = async() => {
    let user = null;
    try {
      user = await Auth.currentAuthenticatedUser();
      return user;
    } catch (err) {
      console.error('Error validating user: ', err);
    }
  }

  fetchProjects = async () => {
    let user = await this.checkAuthenticated();
    try {
      const projectData = await API.graphql({
        query: listProjects,
        variables: {},
        authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "API_KEY",
      });
      const projects = projectData.data.listProjects.items;
      this.setState({ projectsList: projects });
    } catch (err) {
      console.error(err);
    }
  };

  componentDidMount() {
    this.fetchProjects();
  }

  render() {
    return (
      <div className="table-responsive">
        <table className="table table-dark table-portfolio w-auto">
          <thead>
            <tr>
              <th scope="col">Project Name</th>
              <th scope="col">Description</th>
              <th scope="col">Source</th>
              <th scope="col">Demo</th>
            </tr>
          </thead>
          <tbody>
            {this.state.projectsList.map((proj) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default ProjectsTable;
