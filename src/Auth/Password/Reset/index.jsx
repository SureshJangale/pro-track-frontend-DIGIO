import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import useApi from 'shared/hooks/api';
import toast from 'shared/utils/toast';
import { Form } from 'shared/components'
import Layout from '../../../Layout'

import {
  FormCont,
  FormHeading,
  FormElement,
  ActionButton,
} from './Styles';

const Authenticate = () => {
  const [{ isUpdating }, resetPassword] = useApi.put('/reset-password');
  const history = useHistory();
  const match = useRouteMatch();

  const { id } = match.params;

  return (
    <Layout>
      <Form
        initialValues={{
          newPassword: ''
        }}
        validations={{
          newPassword: Form.is.required(),
        }}
        onSubmit={async (values) => {
          try {
            await resetPassword(
              {
                ...values,
                resetPasswordLink: id
              });
            toast.success('Password reset successfull. Please Signin');
            history.push('/signin');
          }
          catch (error) {
            toast.error(error);
          }
        }}
      >
        <FormCont>
          <FormElement>
            <FormHeading>Please Enter New Password</FormHeading>

            <Form.Field.Input type="password" name="newPassword" label="Password" />
            <ActionButton type="submit" variant="primary" isWorking={isUpdating}>
              Reset Password
            </ActionButton>
          </FormElement>
        </FormCont>
      </Form>
    </Layout>
  );
};

export default Authenticate;
