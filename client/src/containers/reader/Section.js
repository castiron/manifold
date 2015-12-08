import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import config from '../../config';
import { BodyClass } from '../../components/shared';
import connectData from '../../decorators/connectData';
import { fetchOneSection } from '../../actions/shared/collections';
import {Link} from 'react-router';

function fetchData(getState, dispatch, location, params) {
  return Promise.all([
    fetchOneSection(params.section_id)(dispatch, getState)
  ]);
}

function mapStateToProps(state) {
  return {
    fetchOneSection: state.collections.results.fetchOneSection.entities,
    sections: state.collections.entities.text_sections
  };
}

@connectData(fetchData)
@connect(mapStateToProps)

class Reader extends Component {

  static propTypes = {
    children: PropTypes.object,
    text: PropTypes.object,
    fetchOneSection: PropTypes.string
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  constructor() {
    super();
  }

  getSection = () => {
    return this.props.sections[this.props.fetchOneSection];
  };

  render() {
    const section = this.getSection();
    return (
        <div>
          <h3 style={{padding: 20, marginTop: 0, backgroundColor: '#DDD'}}>
            {section.attributes.name}
          </h3>
          <div style={{padding: 20}}>
            <div dangerouslySetInnerHTML={{__html: section.attributes.body}} />
          </div>
        </div>
    );
  }
}

export default connect(
)(Reader);

