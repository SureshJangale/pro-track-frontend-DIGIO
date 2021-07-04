import React from 'react';
import { useHistory } from 'react-router-dom';

import toast from 'shared/utils/toast';
import useApi from 'shared/hooks/api';
import { Form } from 'shared/components';
import Private from '../../../Auth/Private'
import Admin from '../../../Auth/Admin'

import {
  FormCont,
  FormHeading,
  FormElement,
  ActionButton,
} from './Styles';


const CreateUser = () => {
  const history = useHistory();

  const [{ isCreating }, createUser] = useApi.post(`/pre-signup`);

  return (
    <Private>
      <Admin>
        <Form
          initialValues={{
            name: '',
            email: '',
            password: '',
            username: '',
          }}
          validations={{
            name: [Form.is.required()],
            email: [Form.is.required(), Form.is.email()],
            password: Form.is.required(),
            username: Form.is.required(),
          }}
          onSubmit={async (values) => {
            try {
              await createUser(values);
              toast.success('Email has been sent successfully. Please ask to activate the account');
              history.push(`/dashboard/users`)
            } catch (error) {
              toast.error(error);
            }
          }}
        >
          <FormCont>
            <FormElement>
              <FormHeading>Dashboard/Users/Create New User</FormHeading>

              <Form.Field.Input name="name" label="Name" tip="Full name of the user" />
              <Form.Field.Input type="email" name="email" label="Email" tip="Active email adress of the user" />
              <Form.Field.Input name="username" label="Username" tip="Unique username for the user e.g. name.surname" />
              <Form.Field.Input type="password" name="password" label="Password" tip="Temporary password for the user" />

              <ActionButton type="submit" variant="primary" isWorking={isCreating}>
                Submit
          </ActionButton>
            </FormElement>
          </FormCont>
        </Form>
      </Admin>
    </Private>
  );
};

export default CreateUser;
