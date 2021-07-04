import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import useApi from 'shared/hooks/api';
import toast from 'shared/utils/toast';
import { Form } from 'shared/components'
import { authenticate, isAuth } from 'shared/utils/authToken';
import Layout from '../Layout'

import {
  FormCont,
  FormHeading,
  FormElement,
  ActionButton,
  ForgotPasswordLink
} from './Styles';

const SignIn = () => {
  const [{ isCreating }, signIn] = useApi.post('/signin');
  const history = useHistory();

  useEffect(() => {
    if (isAuth())
      history.push(`/dashboard`);
  }, [history]);

  return (
    <Layout>
      <Form
        initialValues={{
          email: '',
          password: ''
        }}
        validations={{
          email: [Form.is.required(), Form.is.email()],
          password: Form.is.required(),
        }}
        onSubmit={async (values) => {
          try {
            const user = await signIn(values);
            toast.success('Signed In successfully.');            
            authenticate(user, () => {
              if (isAuth()) {
                history.push('/dashboard');
              }
            })
          }
          catch (error) {
            toast.error(error);
          }
        }}
      >
        <FormCont>
          <FormElement>
            <FormHeading>Welcome to Pro-Track...</FormHeading>

            <Form.Field.Input type="email" name="email" label="Email" />
            <Form.Field.Input type="password" name="password" label="Password" />
            <ActionButton type="submit" variant="primary" isWorking={isCreating}>
              Sign In
          </ActionButton>
            <ForgotPasswordLink to='/auth/password/forgot'>
              <ActionButton>
                Forgot Password
              </ActionButton>
            </ForgotPasswordLink>
          </FormElement>
        </FormCont>
      </Form>
    </Layout>
  );
};

export default SignIn;
