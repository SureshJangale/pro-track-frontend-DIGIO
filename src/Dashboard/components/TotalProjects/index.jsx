import React from 'react';
import clsx from 'clsx';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';

import useApi from 'shared/hooks/api';
import { PageError, PageLoader } from 'shared/components';

import { useStyles } from './Styles';

const propTypes = {
  user: PropTypes.object.isRequired,
};

const TotalProjects = ({ user }) => {

  const [{ data, error, isLoading }] = useApi.get(`/projects/${get(user, '_id')}`)
  const classes = useStyles();
  if (isLoading) return <PageLoader />
  if (error) return <PageError />

  const projects = data;
  console.log(projects);

  return (
    <Card className={clsx(classes.root)}>
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              MY PROJECTS
            </Typography>
            <Typography variant="h3">{projects.length ? projects.length : "No projects assigned."}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MoneyIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalProjects.propTypes = propTypes;

export default TotalProjects;
