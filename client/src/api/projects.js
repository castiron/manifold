import apiClient from './client';

export default {

  projects(query = {}, page = {}) {
    return apiClient('/api/v1/projects.json', query, page);
  },

  project(id) {
    return apiClient(`/api/v1/project/${id}.json` );
  },

  filteredProjects(query = {}, page = {}) {
    return apiClient('/api/v1/projects.json', query, page);
  },

  featuredProjects(limit = 5) {
    const query = {
      filter: { featured: true },
      page: { limit: limit }
    };
    return apiClient('/api/v1/projects.json', query);
  }

};

