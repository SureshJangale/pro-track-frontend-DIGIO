import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash'
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import {
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import { ProjectCategoryCopy } from 'shared/constants/projects';
import { formatDateTimeConversational } from 'shared/utils/dateTime';

import { ProjectAvatar } from 'shared/components'
import { Project, useStyles, Username } from './Styles'

const propTypes = {
  project: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
};

const ProjectCard = ({ project, users }) => {

  const classes = useStyles();

  const getUserById = userId => (users.find(user => get(user, "_id") === userId))

  const renderUser = (userId) => {
    const user = getUserById(userId);
    return (
      user && <Username>Project Lead: {user.name}</Username>
    );
  }

  const showIssueCount = () => {
    return (
      <Typography align="right" variant="body1">
        {project.issues.length} issues
      </Typography>
    )
  }

  return (
    <Project className={clsx(classes.root)}>
      <CardContent>
        {showIssueCount()}
        <Link to={`/project/${project.slug}`}>
          <div className={classes.imageContainer}>
            {
              project.imageUrl ?
                <img alt="Project" src={project.imageUrl} />
                :
                <ProjectAvatar size={70} />
            }
          </div>
          <Typography align="center" gutterBottom variant="h4">
            {project.title}
          </Typography>
          <Typography align="center" variant="body1" >
            {ProjectCategoryCopy[project.category]} project
          </Typography>
        </Link>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid container justify="space-between">
          <Grid item className={classes.statsItem}>
            <AccessTimeIcon className={classes.statsIcon} />
            <Typography display='inline' variant='body2'>
              Updated {formatDateTimeConversational(project.updatedAt)}
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            {renderUser(project.ownerId)}
          </Grid>
        </Grid>
      </CardActions>
    </Project>
  );
};

ProjectCard.propTypes = propTypes;

export default ProjectCard;
