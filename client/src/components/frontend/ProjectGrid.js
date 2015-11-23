import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

export default class ProjectGrid extends Component {

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
      <nav className="grid-project">
        <ul>
          {this.props.entities.map((projectId) => {
            const project = this.lookupProject(projectId);
            return (
              <li key={project.id}>
                <Link to={`/browse/project/${project.id}`}>
                  {/* Figure wrapper, controls maximum width of figure */}
                  <div style={{maxWidth: 135}}>
                    <figure>
                      <img src={project.attributes.coverUrl}
                           alt={`Click to view ${project.attributes.title}`} />
                      <i className="manicon manicon-plus"></i>
                    </figure>
                  </div>
                  <h3 className="title">{project.attributes.title}</h3>
                  <div className="makers">
                    {project.relationships.creators.data.map((makerRel) => {
                      const maker = this.lookupMaker(makerRel.id);
                      return (
                       <span key={maker.id}>
                         {maker.attributes.name}
                       </span>
                      );
                    })}
                  </div>
                  <div className="date">
                    Published June, 2016
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}
