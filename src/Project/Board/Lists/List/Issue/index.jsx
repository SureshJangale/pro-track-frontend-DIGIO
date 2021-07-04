import React from 'react';
import PropTypes from 'prop-types';
import {get} from 'lodash'
import { useRouteMatch } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';

import { IssueTypeIcon, IssuePriorityIcon } from 'shared/components';
import {getUserAvatarUrl} from 'shared/utils/user';
import { IssueLink, Issue, Title, Bottom, Assignees, AssigneeAvatar } from './Styles';

const propTypes = {
  projectUsers: PropTypes.array.isRequired,
  issue: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

const ProjectBoardListIssue = ({ projectUsers, issue, index }) => {
  const match = useRouteMatch();

  const assignees = issue.assignees.map(userId => projectUsers.find(user => get(user, "_id") === userId));
  
  return (
    <Draggable draggableId={get(issue, '_id').toString()} index={index}>
      {(provided, snapshot) => (
        <IssueLink
          to={`${match.url}/issues/${get(issue, "_id")}`}
          ref={provided.innerRef}
          data-testid="list-issue"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Issue isBeingDragged={snapshot.isDragging && !snapshot.isDropAnimating}>
            <Title>{issue.title}</Title>
            <Bottom>
              <div>
                <IssueTypeIcon type={issue.type} />
                <IssuePriorityIcon priority={(issue.priority)} top={-1} left={4} />
              </div>
              <Assignees>
                {assignees.map(user => (
                  user &&
                  <AssigneeAvatar
                    key={get(user, "_id")}
                    size={24}
                    avatarUrl={getUserAvatarUrl(user)}
                    name={user.name}
                  />
                ))}
              </Assignees>
            </Bottom>
          </Issue>
        </IssueLink>
      )}
    </Draggable>
  );
};

ProjectBoardListIssue.propTypes = propTypes;

export default ProjectBoardListIssue;
