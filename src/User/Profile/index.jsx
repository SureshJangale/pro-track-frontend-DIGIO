import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import useCurrentUser from 'shared/hooks/currentUser'

import ProfilePrivate from './Private';
import ProfilePublic from './Public';


const propTypes = {
  user: PropTypes.object.isRequired,
};

const useStyles = makeStyles(() => ({
  root: {
    padding: '4px'
  }
}));

const Profile = ({ user }) => {
  const classes = useStyles();
  const { currentUserId } = useCurrentUser();
  const showPrivateProfile = () => { return (currentUserId === get(user, '_id')) };

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={4}
          md={6}
          xl={4}
          xs={12}
        >
          {
            showPrivateProfile() ?
              <ProfilePrivate user={user} />
              :
              <ProfilePublic user={user} />
          }
        </Grid>
      </Grid>
    </div>
  );
};

Profile.propTypes = propTypes;

export default Profile;
