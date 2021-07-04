import React from 'react';
import { useHistory } from 'react-router-dom';
import { get } from 'lodash'

import { ProjectCategory, ProjectCategoryCopy } from 'shared/constants/projects';
import toast from 'shared/utils/toast';
import useApi from 'shared/hooks/api';
import {getUserAvatarUrl} from 'shared/utils/user'
import useCurrentUser from 'shared/hooks/currentUser';
import {
  Form,
  PageLoader,
  Icon,
  Avatar
} from 'shared/components';
import Private from '../../../Auth/Private'
import Admin from '../../../Auth/Admin'

import {
  FormCont,
  FormHeading,
  FormElement,
  ActionButton,
  SelectItem,
  SelectItemLabel
} from './Styles';


const CreateProject = () => {
  const history = useHistory();
  const [{ data, isLoading }] = useApi.get(`/users`);

  const [{ isCreating }, createProject] = useApi.post(`/create-project`);
  const { currentUserId } = useCurrentUser();

  if (isLoading) return <PageLoader />;

  const users = data;

  const userOptions = users.map(user => ({ value: get(user, "_id"), label: get(user, 'name') }))

  const renderUser = ({ value: userId, removeOptionValue }) => {
    const user = users.find(({ _id }) => _id === userId);
    return (
      <SelectItem
        key={get(user, '_id')}
        withBottomMargin={!!removeOptionValue}
        onClick={() => removeOptionValue && removeOptionValue()}
      >
        <Avatar size={20} avatarUrl={getUserAvatarUrl(user)} name={user.name} />
        <SelectItemLabel>{user.name}</SelectItemLabel>
        {removeOptionValue && <Icon type="close" top={2} />}
      </SelectItem>
    );
  };


  return (
    <Private>
      <Admin>
        <Form
          initialValues={{
            title: '',
            slug: '',
            category: '',
            description: '',
            users: []
          }}
          validations={{
            title: [Form.is.required(), Form.is.maxLength(100)],
            category: Form.is.required(),
            slug: Form.is.required()
          }}
          onSubmit={async (values) => {
            try {
              await createProject({
                ...values,
                createdBy: currentUserId,
                users: values.users.map(_id => ({ _id }))
              });
              toast.success('Project created successfully.');
              history.push(`/dashboard/projects`)
            } catch (error) {
              toast.error(error);
            }
          }}
        >
          <FormCont>
            <FormElement>
              <FormHeading>Dashboard/Create New Project</FormHeading>

              <Form.Field.Input name="title" label="Title" tip="Title of the project." />
              <Form.Field.Input
                name="slug"
                label="Key"
                tip="**Please provide unique key to refer the project."
              />
              <Form.Field.TextEditor
                name="description"
                label="Description"
                tip="Describe the project in as much detail as you'd like."
              />
              <Form.Field.Select name="category" label="Project Category" options={categoryOptions} />
              <Form.Field.Select
                isMulti
                name="users"
                label="Users"
                tip="People who will be working on this project."
                options={userOptions}
                renderOption={renderUser}
                renderValue={renderUser}
              />
              <ActionButton type="submit" variant="primary" isWorking={isCreating}>
                Create
              </ActionButton>
            </FormElement>
          </FormCont>
        </Form>
      </Admin>
    </Private>
  );
};

const categoryOptions = Object.values(ProjectCategory).map(category => ({
  value: category,
  label: ProjectCategoryCopy[category],
}));


export default CreateProject;
