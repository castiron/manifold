import React, { Component, PropTypes } from 'react';

export default class ProjectFilters extends Component {

  static propTypes = {
    updateAction: PropTypes.function
  };

  filterChange(event) {
    let filter = {};
    switch (event.target.value) {
      case 'featured':
        filter = {featured: true};
        break;
      case 'notFeatured':
        filter = {featured: false};
        break;
      default:
        filter = {};
        break;
    }
    this.props.updateAction({filter: filter});
  }

  render() {
    return (
      <div style={{marginTop: 15, marginBottom: 15}}>
        <select onChange={this.filterChange.bind(this)} >
          <option value="all">Show All</option>
          <option value="featured">Featured</option>
          <option value="notFeatured">Not Featured</option>
        </select>
      </div>
    );
  }
}
