import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

export default class ProjectCovers extends Component {

  static propTypes = {
    entities: PropTypes.array,
    projects: PropTypes.object,
    makers: PropTypes.object
  };

  lookupProject(id) {
    return this.props.projects[id];
  }

  lookupMaker(id) {
    return this.props.makers[id];
  }

  render() {
    return (
      <nav className="grid-project-covers">
        <ul>
          {this.props.entities.map((projectId) => {
            const project = this.lookupProject(projectId);
            return (
              <li key={project.id}>
                <Link to={`/browse/project/${project.id}`}>
                  <img src={project.attributes.coverUrl}
                       alt={`Click to view ${project.attributes.title}`} />
                  <span style={{display: 'block', fontSize: 12}}>{project.attributes.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}
