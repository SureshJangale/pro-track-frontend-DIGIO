import React from 'react';
import { get } from 'lodash'
import { Grid } from '@material-ui/core';

import useApi from 'shared/hooks/api'
import { ProjectCard, PageLoader } from 'shared/components'

import Private from '../../../Auth/Private'


const AllProjects = ({projects}) => {

  const [{ data, isLoading }] = useApi.get(`/users`);

  if (isLoading) return <PageLoader />;

  const users = data;

  return (
    <Private>
      <Grid
        container
        spacing={3}
      >
        {projects.map(project => (
          <Grid
            item
            key={get(project, '_id')}
            lg={4}
            md={6}
            xs={12}
          >
            <ProjectCard project={project} users={users}/>
          </Grid>
        ))}
      </Grid>
    </Private>
  )
}

export default AllProjects;
