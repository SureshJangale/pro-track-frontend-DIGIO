import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import toast from 'shared/utils/toast';
import { PageLoader, Button } from 'shared/components'
import useApi from 'shared/hooks/api';
import Layout from '../../../Layout'

import { ActivateAccountDiv } from './Styles'

const ActivateAccount = () => {
  const [values, setValues] = useState({
    userName: '',
    token:'',
    loading: false,
    showButton: true
  });

  const history = useHistory();
  const match = useRouteMatch();
  const [{ isCreating }, signUp] = useApi.post(`/signup`);  

  const { userName, token, loading, showButton } = values;

  useEffect(() => {
    setValues({ ...values, loading:true });
    const {id} = match.params;
    if (id) {
      const { name } = jwt.decode(id);      
      setValues({ ...values, userName:name, token:id, loading:false });      
    }
  }, [match]);


  const clickSubmit = async () => {
    setValues({ ...values, loading: false, showButton: false });    
    try {
      setValues({...values, loading:true});
      await signUp({token});
      toast.success('You have successfully activated your account')
      history.push(`/signin`)
    } catch (error) {
      toast.error(error);
      history.push(`/signin`)
    }
  }

  const showLoading = () => (loading ? <PageLoader /> : '');

  return (
    <Layout>
      <ActivateAccountDiv>
        {
          !loading &&
        <h3>Hey {userName}, Ready to activate your account? </h3>
        }
        {showLoading()}
        {showButton && (
          <Button type="submit" variant="primary" onClick={clickSubmit} isWorking={isCreating}>
            Activate Account
          </Button>
        )}
      </ActivateAccountDiv>
    </Layout>
  );
};

export default ActivateAccount;
