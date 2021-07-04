import React from 'react';
import { useHistory } from 'react-router-dom';

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

const ForgotPassword = () => {
  const [{ isUpdating }, forgotPassword] = useApi.put('/forgot-password');
  const history = useHistory();

  return (
    <Layout>
      <Form
        initialValues={{
          email: '',
        }}
        validations={{
          email: [Form.is.required(), Form.is.email()],
        }}
        onSubmit={async (values) => {
          try {
            await forgotPassword(values);
            toast.success('Password reset Link sent on provided email. Please check mail.');
            history.push('/signin');
          }
          catch (error) {
            toast.error(error);
          }
        }}
      >
        <FormCont>
          <FormElement>
            <FormHeading>Please Enter Registered Email</FormHeading>

            <Form.Field.Input type="email" name="email" label="Email" />
            <ActionButton type="submit" variant="primary" isWorking={isUpdating}>
              Submit
            </ActionButton>
          </FormElement>
        </FormCont>
      </Form>
    </Layout>
  );
};

export default ForgotPassword;
