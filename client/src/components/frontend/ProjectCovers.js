import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

export default class projectCovers extends Component {

  static propTypes = {
    texts: PropTypes.object,
  };

  static defaultProps = {
    projects: [
      {
        id: 1,
        title: 'Title',
        image: '/placeholder/browse-pCover-blanchot01.jpg'
      },
      {
        id: 2,
        title: 'Title',
        image: '/placeholder/browse-pCover-grusin01.jpg'
      },
      {
        id: 3,
        title: 'Title',
        image: '/placeholder/browse-pCover-nornes01.jpg'
      },
      {
        id: 4,
        title: 'Title',
        image: '/placeholder/browse-pCover-bogost01.jpg'
      },
      {
        id: 5,
        title: 'Title',
        image: '/placeholder/browse-pCover-maoilearca01.jpg'
      },
      {
        id: 6,
        title: 'Title',
        image: '/placeholder/browse-pCover-parikka01.jpg'
      }
    ]
  }

  render() {
    return (
      <nav className="grid-project-covers">
        <ul>
          {this.props.projects.map((project) => {
            return (
              <li key={project.id}>
                <Link to={`/browse/project/${project.id}`}>
                  <img src={project.image} alt={`Click to view ${project.title}`} />
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    );
  }
}
