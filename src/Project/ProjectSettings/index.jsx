import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash'

import { ProjectCategory, ProjectCategoryCopy } from 'shared/constants/projects';
import toast from 'shared/utils/toast';
import { getUserAvatarUrl } from 'shared/utils/user'
import useApi from 'shared/hooks/api';
import {
  Form,
  Breadcrumbs,
  Icon,
  Avatar,
  PageLoader
} from 'shared/components';
import Private from '../../Auth/Private'

import {
  FormCont,
  FormHeading,
  FormElement,
  ActionButton,
  SelectItem,
  SelectItemLabel
} from './Styles';

const propTypes = {
  project: PropTypes.object.isRequired,
  fetchProject: PropTypes.func.isRequired,
};

const ProjectSettings = ({ project, fetchProject }) => {

  const [{ data, isLoading }] = useApi.get(`/users`);
  const [{ isUpdating }, updateProject] = useApi.put(`/project/${project.slug}`);

  if (isLoading) return <PageLoader />;

  const allUsers = data || []; // All available users

  const userOptions = allUsers.map(user => ({ value: get(user, "_id"), label: user.name }));
  const ownerOptions = project.users.map(user => ({ value: get(user, "_id"), label: user.name }));

  const projectUsers = project.users.map(user => (get(user, "_id")))

  const getUserById = userId => (allUsers.find(user => get(user, "_id") === userId))

  const renderUser = ({ value: userId, removeOptionValue }) => {
    const user = getUserById(userId)
    return (
      user &&
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
      <Form
        initialValues={Form.initialValues(project, get => ({
          title: get('title'),
          category: get('category'),
          description: get('description'),
          ownerId:get('ownerId'),
          users: projectUsers
        }))}
        validations={{
          title: [Form.is.required(), Form.is.maxLength(100)],
          category: Form.is.required(),
        }}
        onSubmit={async (values) => {
          try {
            await updateProject({
              ...values,
              users: values.users.map(_id => ({ _id }))
            });
            await fetchProject();
            toast.success('Changes have been saved successfully.');
          } catch (error) {
            toast.error(error);
          }
        }}
      >
        <FormCont>
          <FormElement>
            <Breadcrumbs items={['Projects', project.title, 'Project Details']} />
            <FormHeading>Project Details</FormHeading>

            <Form.Field.Input name="title" label="Title" />
            <Form.Field.TextEditor
              name="description"
              label="Description"
              tip="Describe the project in as much detail as you'd like."
            />
            <Form.Field.Select
              name="category"
              label="Project Category"
              options={categoryOptions} 
            />
            <Form.Field.Select
              name="ownerId"
              label="Project Leader"
              tip="Person who will be leading this project."
              options={ownerOptions}
              renderOption={renderUser}
            />
            <Form.Field.Select
              isMulti
              name="users"
              label="Project Users"
              tip="People who will be working on this project."
              options={userOptions}
              renderOption={renderUser}
              renderValue={renderUser}
            />
            <ActionButton type="submit" variant="primary" isWorking={isUpdating}>
              Save changes
            </ActionButton>
          </FormElement>
        </FormCont>
      </Form>
    </Private>
  );
};

const categoryOptions = Object.values(ProjectCategory).map(category => ({
  value: category,
  label: ProjectCategoryCopy[category],
}));

ProjectSettings.propTypes = propTypes;

export default ProjectSettings;
