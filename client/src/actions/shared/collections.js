import {createAction} from 'redux-actions';
import {textsAPI, projectsAPI} from '../../api';
import { apiClient } from '../../api/client';

export const actions = {
  FETCH_TEXTS: 'FETCH_TEXTS',
  FETCH_ONE_TEXT: 'FETCH_ONE_TEXT',
  FETCH_ONE_PROJECT: 'FETCH_ONE_PROJECT',
  FETCH_FEATURED_PROJECTS: 'FETCH_FEATURED_PROJECTS',
  FETCH_FILTERED_PROJECTS: 'FETCH_FILTERED_PROJECTS'
};

const createApiAction = function(type, apiMethod) {
  return function() {
    const apiMethodArgs = arguments;
    return function(dispatch, getState) {
      const token = getState().authentication.authToken;
      const {endpoint, method, options} = apiMethod(...apiMethodArgs);
      options.authToken = token;
      const action = createAction(type, () => apiClient(endpoint, method, options))();
      return dispatch(action);
    }
  }
};

export const fetchTexts = createApiAction(actions.FETCH_TEXTS, textsAPI.texts);
export const fetchOneText = createApiAction(actions.FETCH_ONE_TEXT, textsAPI.text);
export const fetchOneProject = createApiAction(actions.FETCH_ONE_PROJECT, projectsAPI.projects);
export const fetchFeaturedProjects = createApiAction(actions.FETCH_FEATURED_PROJECTS, projectsAPI.featuredProjects);
export const fetchFilteredProjects = createApiAction(actions.FETCH_FILTERED_PROJECTS, projectsAPI.filteredProjects);
export const testAction = createApiAction('TEST_ACTION', projectsAPI.testProjects);

