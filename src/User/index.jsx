import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import useApi from 'shared/hooks/api'
import { PageLoader, PageError } from 'shared/components';

import Private from '../Auth/Private';
import Layout from '../Layout';

import Profile from './Profile';
import { UserPage } from './Styles';

const UserInfo = () => {

  const match = useRouteMatch();

  const { username } = match.params;
  if (!username) return <PageError />;

  const [{ data, error, isLoading }] = useApi.get(`/user/${username}`);

  if (!data || isLoading) return <PageLoader />;
  if (error) return <PageError />;

  const user = data;  

  return (
    <Layout>
      <Private>
        <UserPage>
          <Profile user={user}/>
        </UserPage>
      </Private>
    </Layout>
  )
}

export default UserInfo;