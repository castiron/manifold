import React, { Component, PropTypes } from 'react';
import { ProjectGrid } from '../../components/frontend';
// import {Link} from 'react-router';

export default class extends Component {

  static propTypes = {
    texts: PropTypes.object
  };

  render() {
    return (
        <div>
          <ProjectGrid />
        </div>
    );
  }
}
