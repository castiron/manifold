import React, { Component, PropTypes } from 'react';
import {ProjectThumb} from './';

export default class ProjectGrid extends Component {

  static propTypes = {
    entities: PropTypes.array,
    projects: PropTypes.object,
    makers: PropTypes.object
  };

  lookupProject(id) {
    return this.props.projects[id];
  }

  render() {
    return (
      <nav className="grid-project">
        <ul>
          {this.props.entities.map((projectId) => {
            const project = this.lookupProject(projectId);
            return (
              <li>
                <ProjectThumb makers={this.props.makers}
                              project={project}
                              /* This works, change to true to see boolean error */
                              showMeta={false}
                />
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}
