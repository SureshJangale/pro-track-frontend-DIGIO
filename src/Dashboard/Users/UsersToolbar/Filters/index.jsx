import React from 'react';
import PropTypes from 'prop-types';

import { SearchInput, useStyles } from './Styles'

const propTypes = {
  filters: PropTypes.object.isRequired,
  mergeFilters: PropTypes.func.isRequired,
};

const UsersToolbarFilters = ({filters, mergeFilters}) => {

  const { searchTerm } = filters;

  const classes = useStyles();

  return (
    <div>
        <SearchInput
          className={classes.searchInput}
          icon="search"
          value={searchTerm}
          placeholder="Search user"
          onChange={value => mergeFilters({ searchTerm: value })}
        />
    </div>
  );
};

UsersToolbarFilters.propTypes = propTypes;

export default UsersToolbarFilters;
