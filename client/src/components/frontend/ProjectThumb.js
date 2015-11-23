import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

export default class ProjectGrid extends Component {
  static propTypes = {
    project: PropTypes.object,
    makers: PropTypes.object,
    showMeta: PropTypes.bool,
    showDate: PropTypes.bool,
    showDescription: PropTypes.bool
  };

  static defaultProps = {
    showMeta: true,
    showDate: true,
    showDescription: false
  };

  lookupMaker(id) {
    return this.props.makers[id];
  }

  render() {
    const project = this.props.project;

    let projectDate;
    if (this.props.showDate) {
      projectDate = (
        <div className="date">
          {'Published June, 2016'}
        </div>
      );
    } else {
      projectDate = '';
    }

    let projectDesc;
    if (this.props.showDescription) {
      projectDesc = (
        <p>
          {project.description}
        </p>
      );
    } else {
      projectDesc = '';
    }

    let projectMeta;
    if (this.props.showMeta) {
      projectMeta = (
        <div className="meta">
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

          {projectDate}
          {projectDesc}
        </div>
      );
    } else {
      projectMeta = '';
    }

    return (
      <Link to={`/browse/project/${project.id}`}>
        {/* Figure wrapper, controls maximum width of figure */}
        <div className="figure-wrapper">
          <figure>
            <img src={project.attributes.coverUrl}
                 alt={`Click to view ${project.attributes.title}`} />
            <i className="manicon manicon-plus"></i>
          </figure>
        </div>
        {projectMeta}
      </Link>
    );
  }
}
