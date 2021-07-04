import React from 'react'
import { Route } from 'react-router-dom';

import useApi from 'shared/hooks/api';
import { isAuth } from 'shared/utils/authToken';

import { PageLoader, PageError } from 'shared/components';

import Layout from 'Layout'
import Private from '../Auth/Private'
import SideBar from './Sidebar';
import CreateProject from './AllProjects/CreateProject'
import AllProjects from './AllProjects'
import Users from './Users'
import CreateUser from './Users/CreateUser'
import Dashboard from './Dashboard'
import { DashBoardPage } from './Styles'

const DashBoard = () => {

  const { username } = isAuth();
  const [{ data, error, isLoading }] = useApi.get(`/user/${username}`);

  if (isLoading) return <PageLoader />;
  if (!data || error) return <PageError />;
  
  const user = data;  

  return (
    <Layout>
      <Private>
        <SideBar />
        <DashBoardPage>
          <Route
            exact path='/dashboard'
            render={() => <Dashboard user={user}/>}
          />
          <Route
            exact path='/dashboard/projects'
            render={() => <AllProjects />}
          />
          <Route
            exact path='/dashboard/create-project'
            render={() => <CreateProject />}
          />
          <Route
            exact path='/dashboard/users'
            render={() => <Users />}
          />
          <Route
            exact path='/dashboard/create-user'
            render={() => <CreateUser />}
          />

        </DashBoardPage>
      </Private>
    </Layout>
  )
}

export default DashBoard;