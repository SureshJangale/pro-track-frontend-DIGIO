import React from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';

import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';

import { getUserAvatarUrl } from 'shared/utils/user'
import { Avatar } from 'shared/components'

import { useStyles } from './Styles'

const UsersTable = ({ users }) => {

  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(user => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={get(user, '_id')}
                    component={Link}
                    to={`/user/profile/${get(user, 'username')}`}
                  >
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Avatar
                          className={classes.avatar}
                          size={30}
                          avatarUrl={getUserAvatarUrl(user)}
                          name={user.name}
                        />
                        <Typography variant="body1">{user.name}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired
};

export default UsersTable;
