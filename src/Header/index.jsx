import React, { Fragment } from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { AppBar, Toolbar, Hidden } from '@material-ui/core';

import useApi from 'shared/hooks/api';
import toast from 'shared/utils/toast';
import { getUserAvatarUrl } from 'shared/utils/user'
import { isAuth, signout } from 'shared/utils/authToken'
import { Avatar } from 'shared/components'

import { useStyles, AuthLink } from './Styles'


const Header = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <AppBar
      className={clsx(classes.root)}
    >
      <Toolbar>
        <RouterLink to="/dashboard">
          <h1 className={clsx(classes.brandHeader)}>
            Pro-Track
          </h1>
        </RouterLink>
        {
          isAuth() ? (
            <Fragment>
              <AuthLink to="/dashboard">
                <p className={classes.routeItem}>Dashboard</p>
              </AuthLink>
              <AuthLink to="/dashboard/projects">
                <p className={classes.routeItem}>Projects</p>
              </AuthLink>
            </Fragment>
          )
            : ''
        }

        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <ul className={classes.authItem}>
            {!isAuth() ? (
              <li>
                <AuthLink to="/signin">
                  <p>Log In</p>
                </AuthLink>
              </li>) : (
                <div className={classes.authItemContainer}>
                  <li>
                    <AuthLink to={`/user/profile/${isAuth().username}`}>
                      <Avatar
                        className={classes.profile}
                        size={30}
                        avatarUrl={getUserAvatarUrl(isAuth())}
                        name={isAuth().name}
                      />
                    </AuthLink>
                  </li>
                  <li>
                    <AuthLink
                      to='/'
                      onClick={async () => {
                        try {
                          await useApi.get('/signout');
                          toast.success('Logged Out successfully.');
                          signout(() => {
                            history.push(`/signin`);
                          })
                        }
                        catch (error) {
                          signout(() => {
                            history.push(`/signin`);
                          })
                        }
                      }}>
                      <p>Log Out</p>
                    </AuthLink>
                  </li>
                </div>)
            }
          </ul>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

export default Header;