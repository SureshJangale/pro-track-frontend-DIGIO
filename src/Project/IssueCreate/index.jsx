import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash'

import {
  IssueType,
  IssueStatus,
  IssuePriority,
  IssueTypeCopy,
  IssuePriorityCopy,
} from 'shared/constants/issues';
import toast from 'shared/utils/toast';
import { getUserAvatarUrl } from 'shared/utils/user'
import useApi from 'shared/hooks/api';
import useCurrentUser from 'shared/hooks/currentUser';
import { Form, IssueTypeIcon, Icon, Avatar, IssuePriorityIcon } from 'shared/components';

import {
  FormHeading,
  FormElement,
  SelectItem,
  SelectItemLabel,
  Divider,
  Actions,
  ActionButton,
} from './Styles';

const propTypes = {
  project: PropTypes.object.isRequired,
  fetchProject: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const ProjectIssueCreate = ({ project, fetchProject, onCreate, modalClose }) => {
  const [{ isCreating }, createIssue] = useApi.post('/create-issue');

  const { currentUserId } = useCurrentUser();

  const userOptions = project.users.map(user => ({ value: get(user, "_id"), label: get(user, 'name') }))

  const renderUser = ({ value: userId, removeOptionValue }) => {
    const user = project.users.find(({ _id }) => _id === userId);
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
    <Form
      enableReinitialize
      initialValues={{
        type: IssueType.TASK,
        title: '',
        description: '',
        assignees: [],
        priority: IssuePriority.MEDIUM,
      }}
      validations={{
        type: Form.is.required(),
        title: [Form.is.required(), Form.is.maxLength(200)],
        priority: Form.is.required(),
      }}
      onSubmit={async (values) => {
        try {
          await createIssue({
            ...values,
            status: IssueStatus.BACKLOG,
            reporterId: currentUserId,
            projectId: get(project, '_id'),
            assignees: values.assignees.map(_id => ({ _id })),
          });
          await fetchProject();
          toast.success('Issue has been successfully created.');
          onCreate();
        } catch (error) {
          toast.error(error);
        }
      }}
    >
      <FormElement>
        <FormHeading>Create issue</FormHeading>
        <Form.Field.Select
          name="type"
          label="Issue Type"
          tip="Start typing to get a list of possible matches."
          options={typeOptions}
          renderOption={renderType}
          renderValue={renderType}
        />
        <Divider />
        <Form.Field.Input
          name="title"
          label="Short Summary"
          tip="Concisely summarize the issue in one or two sentences."
        />
        <Form.Field.TextEditor
          name="description"
          label="Description"
          tip="Describe the issue in as much detail as you'd like."
        />
        <Form.Field.Select
          isMulti
          name="assignees"
          label="Assignees"
          tip="People who are responsible for dealing with this issue."
          options={userOptions}
          renderOption={renderUser}
          renderValue={renderUser}
        />
        <Form.Field.Select
          name="priority"
          label="Priority"
          tip="Priority in relation to other issues."
          options={priorityOptions}
          renderOption={renderPriority}
          renderValue={renderPriority}
        />
        <Actions>
          <ActionButton type="submit" variant="primary" isWorking={isCreating}>
            Create Issue
          </ActionButton>
          <ActionButton type="button" variant="empty" onClick={modalClose}>
            Cancel
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};

const typeOptions = Object.values(IssueType).map(type => ({
  value: type,
  label: IssueTypeCopy[type],
}));

const priorityOptions = Object.values(IssuePriority).map(priority => ({
  value: priority,
  label: IssuePriorityCopy[priority],
}));

const renderType = ({ value: type }) => (
  <SelectItem>
    <IssueTypeIcon type={type} top={1} />
    <SelectItemLabel>{IssueTypeCopy[type]}</SelectItemLabel>
  </SelectItem>
);

const renderPriority = ({ value: priority }) => (
  <SelectItem>
    <IssuePriorityIcon priority={priority} top={1} />
    <SelectItemLabel>{IssuePriorityCopy[priority]}</SelectItemLabel>
  </SelectItem>
);

ProjectIssueCreate.propTypes = propTypes;

export default ProjectIssueCreate;
