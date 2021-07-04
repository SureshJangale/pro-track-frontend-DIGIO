import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import {
  Typography,
  Divider
} from '@material-ui/core';

import { Avatar, PageLoader } from 'shared/components';
import toast from 'shared/utils/toast';
import { getUserAvatarUrl } from 'shared/utils/user'
import useApi from 'shared/hooks/api'
import { useStyles, ActionButton, ForgotPasswordLink } from './Styles';

const propTypes = {
  user: PropTypes.object.isRequired,
};

const AccountProfilePrivate = ({ user }) => {
  const userId = get(user, '_id');
  const classes = useStyles();
  const [{ data, isLoading }] = useApi.get(`/projects/${userId}`);
  const [{ isUpdating }, updateUserAvatar] = useApi.put(`/user/photo/${user.username}`);

  if (isLoading) return <PageLoader />;

  const projects = data;
  return (
    <div>
      <div className={classes.nameContainer}>
        <Avatar className={classes.avatar} size={40} avatarUrl={getUserAvatarUrl(user)} name={user.name} />
        <Typography variant="h5">
          {user.name}
        </Typography>
      </div>
      <Divider />
      <ActionButton>
        <label>
          Change Avatar
        <input
            type="file"
            accept="image/*" hidden
            onChange={async (e) => {
              const userPhoto = e.target.files[0];
              const userData = new FormData();
              userData.set('photo', userPhoto);

              try {
                await updateUserAvatar(userData);
                window.location.reload(true);
                toast.success('Avatar have been changed successfully.');
              } catch (error) {
                toast.error(error);
              }
            }}
          />
        </label>
      </ActionButton>
      <ForgotPasswordLink to='/auth/password/change'>
        <ActionButton>
          Change Password
        </ActionButton>
      </ForgotPasswordLink>

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

AccountProfilePrivate.propTypes = propTypes;

export default AccountProfilePrivate;
