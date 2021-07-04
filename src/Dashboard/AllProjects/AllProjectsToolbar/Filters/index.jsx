import React from 'react';
import PropTypes from 'prop-types';
// import clsx from 'clsx';

import { SearchInput, useStyles } from './Styles'

const propTypes = {
  filters: PropTypes.object.isRequired,
  mergeFilters: PropTypes.func.isRequired,
};

const AllProjectsToolbarFilters = ({filters, mergeFilters}) => {

  const { searchTerm } = filters;

  const classes = useStyles();

  return (
    <div>
        <SearchInput
          className={classes.searchInput}
          icon="search"
          value={searchTerm}
          placeholder="Search project"
          onChange={value => mergeFilters({ searchTerm: value })}
        />
    </div>
  );
};

AllProjectsToolbarFilters.propTypes = propTypes;

export default AllProjectsToolbarFilters;
