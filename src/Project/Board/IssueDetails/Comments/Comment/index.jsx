import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import api from 'shared/utils/api';
import { isUserAuthenticated } from 'shared/utils/authToken';
import toast from 'shared/utils/toast';
import { formatDateTimeConversational } from 'shared/utils/dateTime';
import { ConfirmModal } from 'shared/components';
import {getUserAvatarUrl} from 'shared/utils/user';
import BodyForm from '../BodyForm';
import {
  Comment,
  UserAvatar,
  Content,
  Username,
  CreatedAt,
  Body,
  EditLink,
  DeleteLink,
} from './Styles';

const propTypes = {
  comment: PropTypes.object.isRequired,
  fetchIssue: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsComment = ({ comment, fetchIssue }) => {

  const [isFormOpen, setFormOpen] = useState(false);
  const [isUpdating, setUpdating] = useState(false);
  const [body, setBody] = useState(comment.body);

  const handleCommentDelete = async () => {
    try {
      await api.delete(`/comments/${get(comment, '_id')}`);
      await fetchIssue();
    } catch (error) {
      toast.error(error);
    }
  };

  const handleCommentUpdate = async () => {
    try {
      setUpdating(true);
      await api.put(`/comments/${get(comment, '_id')}`, { body });
      await fetchIssue();
      setUpdating(false);
      setFormOpen(false);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Comment data-testid="issue-comment">
      <UserAvatar name={comment.user.name} avatarUrl={getUserAvatarUrl(comment.user)} />
      <Content>
        <Username>{comment.user.name}</Username>
        <CreatedAt>{formatDateTimeConversational(comment.createdAt)}</CreatedAt>

        {isFormOpen ? (
          <BodyForm
            value={body}
            onChange={setBody}
            isWorking={isUpdating}
            onSubmit={handleCommentUpdate}
            onCancel={() => setFormOpen(false)}
          />
        ) : (
            <Fragment>
              <Body>{comment.body}</Body>
              {
                isUserAuthenticated(comment.user) ?
                  <div>
                    <EditLink onClick={() => setFormOpen(true)}>Edit</EditLink>
                    <ConfirmModal
                      title="Are you sure you want to delete this comment?"
                      message="Once you delete, it's gone for good."
                      confirmText="Delete comment"
                      onConfirm={handleCommentDelete}
                      renderLink={modal => <DeleteLink onClick={modal.open}>Delete</DeleteLink>}
                    />
                  </div> :
                  <div />
              }
            </Fragment>
          )}
      </Content>
    </Comment>
  );
};

ProjectBoardIssueDetailsComment.propTypes = propTypes;

export default ProjectBoardIssueDetailsComment;
