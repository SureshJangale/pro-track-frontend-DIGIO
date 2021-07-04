import React from 'react';
import PropTypes from 'prop-types';
import { isNil } from 'lodash';

import { TrackingWidget, WatchIcon, Right, BarCont, Bar, Values } from './Styles';

const propTypes = {
  issue: PropTypes.object.isRequired,
};

const ProjectBoardIssueDetailsTrackingWidget = ({ issue }) => (
  <TrackingWidget>
    <WatchIcon type="stopwatch" size={26} top={-1} />
    <Right>
      <BarCont>
        <Bar width={calculateTrackingBarWidth(issue)} />
      </BarCont>
      <Values>
        <div>{issue.timeSpent ? `${issue.timeSpent}h logged` : 'No time logged'}</div>
        {renderRemainingOrEstimate(issue)}
      </Values>
    </Right>
  </TrackingWidget>
);

const calculateTrackingBarWidth = ({ timeSpent, timeRemaining, estimate }) => {
  if (!timeSpent) {
    return 0;
  }
  if (isNil(timeRemaining) && isNil(estimate)) {
    return 100;
  }
  // if (!isNil(timeRemaining)) {
  //   return (timeSpent / (timeSpent + timeRemaining)) * 100;
  // }
  if (!isNil(estimate)) {
    return Math.min((timeSpent / estimate) * 100, 100);
  }
};

const renderRemainingOrEstimate = ({ timeSpent, timeRemaining, estimate }) => {  
  if (!isNil(timeSpent) && !isNil(estimate)) {
    if (timeSpent > estimate) {
      return <div>{`Out of time by ${timeSpent - estimate} hour(s)`}</div>
    }
    if (timeSpent === 0) {
      return <div>{`${estimate}h estimated`}</div>
    }
    if(timeSpent > 0) {
      return <div>{`${estimate - timeSpent}h remaining`}</div>
    }
  }
  if (isNil(estimate)) {
    return null;
  }
  if (isNil(timeSpent)) {
    return <div>{`${estimate}h estimated`}</div>;
  }
  if (!isNil(timeRemaining)) {
    return <div>{`${timeRemaining}h remaining`}</div>;
  }
};

ProjectBoardIssueDetailsTrackingWidget.propTypes = propTypes;

export default ProjectBoardIssueDetailsTrackingWidget;
