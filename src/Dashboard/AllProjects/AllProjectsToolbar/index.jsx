import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import clsx from 'clsx';
import { Button } from '@material-ui/core';

import { isCurrentUserAdmin } from 'shared/utils/authToken'

import AllProjectsToolbarFilters from './Filters'
import { useStyles } from './Styles'

const propTypes = {
  filters: PropTypes.object.isRequired,
  mergeFilters: PropTypes.func.isRequired,
};

const AllProjectsToolbar = ({ filters, mergeFilters }) => {

  const classes = useStyles();

  return (
    <div className={clsx(classes.root)}>
      <AllProjectsToolbarFilters filters={filters} mergeFilters={mergeFilters} />
      <span className={classes.spacer} />
      {
        (isCurrentUserAdmin())
          ?
          <Link to='/dashboard/create-project'>
            <Button color="primary" variant="contained">
              Add Project
            </Button>
          </Link>
          :
          <div />
      }
    </div>
  );
};

AllProjectsToolbar.propTypes = propTypes;

export default AllProjectsToolbar;
