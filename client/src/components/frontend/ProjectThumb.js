import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

export default class ProjectGrid extends Component {

  static propTypes = {
    project: PropTypes.object,
    makers: PropTypes.object
  };

  lookupMaker(id) {
    return this.props.makers[id];
  }

  render() {
    const project = this.props.project;
    return (
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
    );
  }
}
