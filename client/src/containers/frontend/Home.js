import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { RecentProjects } from './';
import { FilteredProjects } from './';
import { fetchTexts } from '../../actions/shared/collections';


class Home extends Component {

  static propTypes = {
    children: PropTypes.object,
    actions: React.PropTypes.shape({
      fetchTexts: React.PropTypes.func.isRequired
    })
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  static fetchData(getState, dispatch) {
    // If we had to load from mutiple endpoints, we'd want to
    // return Promise.all([an array of promises]), but instead
    // we can return one promise.
    return dispatch(fetchTexts());
  }

  render() {
    return (
        <div>
          <section>
            <div className="container">
              {"Recent Projects"}
              <RecentProjects />
            </div>
          </section>
          <section className="neutral20">
            <div className="container">
              {"Our Projects"}
              <FilteredProjects />
            </div>
          </section>
        </div>
    );
  }
}

function mapStateToProps(stateIgnored) {
  return {
  };
}

function mapDispatchToProps(dispatchIgnored) {
  return {
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

