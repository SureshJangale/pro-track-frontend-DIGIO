import React from 'react';

import useApi from 'shared/hooks/api'
import { PageLoader } from 'shared/components'
import { sortByNewest } from 'shared/utils/javascript';
import useMergeState from 'shared/hooks/mergeState';

import Private from '../../Auth/Private'
import { Heading } from './Styles'
import AllProjectsToolbar from './AllProjectsToolbar'
import Projects from './Projects'

const defaultFilters = {
  searchTerm: '',
  // userIds: [],
  // myOnly: false,
  // recent: false,
};

const AllProjects = () => {

  const [filters, mergeFilters] = useMergeState(defaultFilters);

  const [{ data, isLoading }] = useApi.get(`/projects`);

  if (!data || isLoading) return <PageLoader />;

  const projects = data;

  if (projects.length) sortByNewest(projects, 'updatedAt')

  const filteredProjects = filterProjects(projects, filters);

  return (
    <Private>
      <Heading>Dashboard/Projects</Heading>
      <AllProjectsToolbar
        filters={filters}
        mergeFilters={mergeFilters}
      />
      <Projects projects = {filteredProjects} />
    </Private>
  )
}

const filterProjects = (projects, filters) => {
  const { searchTerm } = filters;
  let filteredProjects = projects;
  if (searchTerm) {
    filteredProjects = filteredProjects.filter(project => project.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  return filteredProjects;
}

export default AllProjects;
