import React, { Component, PropTypes } from 'react';
// import {Link} from 'react-router';

export default class projectCovers extends Component {

  static propTypes = {
    texts: PropTypes.object,
  };

  static defaultProps = {
    projects: [
      {
        title: 'Title',
        url: '#',
        image: '/placeholder/browse-pCover-blanchot01.jpg'
      },
      {
        title: 'Title',
        url: '#',
        image: '/placeholder/browse-pCover-grusin01.jpg'
      },
      {
        title: 'Title',
        url: '#',
        image: '/placeholder/browse-pCover-nornes01.jpg'
      },
      {
        title: 'Title',
        url: '#',
        image: '/placeholder/browse-pCover-bogost01.jpg'
      },
      {
        title: 'Title',
        url: '#',
        image: '/placeholder/browse-pCover-maoilearca01.jpg'
      },
      {
        title: 'Title',
        url: '#',
        image: '/placeholder/browse-pCover-parikka01.jpg'
      }
    ]
  }

  render() {
    return (
        <nav className="grid-project-covers">
          <ul>
            {this.props.projects.map(function(project) {
              return (
                  <li>
                    <a href={project.url}>
                      <img src={project.image} alt={`Click to view ${project.title}`} />
                    </a>
                  </li>
              )
            })}
          </ul>
        </nav>
    );
  }
}
