import React from 'react';
import useApi from 'shared/hooks/api'
import useMergeState from 'shared/hooks/mergeState';

import { PageLoader } from 'shared/components'
import Private from '../../Auth/Private'
import UsersToolbar from './UsersToolbar'
import UserTable from './UserTable'

import { Heading } from './Styles'

const defaultFilters = {
  searchTerm: ''
};

const Users = () => {
  const [filters, mergeFilters] = useMergeState(defaultFilters);

  const [{ data, isLoading }] = useApi.get(`/users`);

  if (!data || isLoading) return <PageLoader />;

  const users = data;
  
  const filteredUsers = filterUsers(users, filters);

  return (
    <Private>
      <Heading>Dashboard/Users</Heading>
      <UsersToolbar
        filters={filters}
        mergeFilters={mergeFilters}
      />
      <UserTable users = {filteredUsers} />
    </Private>
  )
}

const filterUsers = (users, filters) => {
  const { searchTerm } = filters;
  let filteredUsers = users;
  if (searchTerm) {
    filteredUsers = filteredUsers.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  return filteredUsers;
}

export default Users;
