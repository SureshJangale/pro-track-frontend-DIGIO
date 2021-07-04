import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import {
  Typography,
  Divider
} from '@material-ui/core';

import { Avatar, PageLoader } from 'shared/components'
import { getUserAvatarUrl } from 'shared/utils/user'
import useApi from 'shared/hooks/api'
import { useStyles } from './Styles'

const propTypes = {
  user: PropTypes.object.isRequired,
};

const AccountProfilePublic = ({ user }) => {
  const userId = get(user, '_id');
  const classes = useStyles();

  const [{ data, isLoading }] = useApi.get(`/projects/${userId}`);
  if (isLoading) return <PageLoader />;
  const projects = data;

  return (
    <div>
      <div className={classes.nameContainer}>
        <Avatar className={classes.avatar} size={37} avatarUrl={getUserAvatarUrl(user)} name={user.name} />
        <Typography variant="h5">
          {get(user, 'name')}
        </Typography>
      </div>
      <Divider />
      <div className={classes.summary}>
        <Typography variant='h6'>Summary</Typography>
        <Typography className={classes.summary} variant='body1'>Details:</Typography>
        <div className={classes.details}>
          <Typography className={classes.summary} variant='body2'>
            Username : {get(user, 'username')}
          </Typography>
          <Typography className={classes.summary} variant='body2'>
            Full name : {get(user, 'name')}
          </Typography>
          <Typography className={classes.summary} variant='body2'>
            Email : {get(user, 'email')}
          </Typography>
        </div>
        <Typography className={classes.summary} variant='body1'>
          Assigned Projects:
        </Typography>
        <div className={classes.details}>
          {
            projects.map(project => (
              <Link key={get(project, '_id')} to={`/project/${project.slug}`}>
                <Typography> {project.title} </Typography>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  );
};

AccountProfilePublic.propTypes = propTypes;

export default AccountProfilePublic;
