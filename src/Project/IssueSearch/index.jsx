import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { get } from 'lodash';

import useApi from 'shared/hooks/api';
import { sortByNewest } from 'shared/utils/javascript';
import { IssueTypeIcon } from 'shared/components';

import NoResultsSVG from './NoResultsSvg';
import {
  IssueSearch,
  SearchInputCont,
  SearchInputDebounced,
  SearchIcon,
  SearchSpinner,
  Issue,
  IssueData,
  IssueTitle,
  IssueTypeId,
  SectionTitle,
  NoResults,
  NoResultsTitle,
  NoResultsTip,
} from './Styles';

const propTypes = {
  project: PropTypes.object.isRequired,
};

const ProjectIssueSearch = ({ project }) => {
  const [isSearchTermEmpty, setIsSearchTermEmpty] = useState(true);

  const [{ data, isLoading }, fetchIssues] = useApi.get(`/project/${project.slug}/issues`, {}, { lazy: true });

  const matchingIssues = data || [];
  
  const recentIssues = (project.issues) ? (sortByNewest(project.issues, 'createdAt').slice(0, 10)) : [];

  const handleSearchChange = value => {
    const searchTerm = value.trim();

    setIsSearchTermEmpty(!searchTerm);

    if (searchTerm) {
      fetchIssues({ searchTerm });
    }
  };

  const renderIssue = (issue) => (
  
    <Link key={get(issue, '_id')} to={`/project/${project.slug}/board/issues/${get(issue, '_id')}`}>
      <Issue>
        <IssueTypeIcon type={issue.type} size={25} />
        <IssueData>
          <IssueTitle>{issue.title}</IssueTitle>
          <IssueTypeId>{`${issue.type}-${get(issue, '_id')}`}</IssueTypeId>
        </IssueData>
      </Issue>
    </Link>
  );
  

  return (
    <IssueSearch>
      <SearchInputCont>
        <SearchInputDebounced
          autoFocus
          placeholder="Search issues by summary, description..."
          onChange={handleSearchChange}
        />
        <SearchIcon type="search" size={22} />
        {isLoading && <SearchSpinner />}
      </SearchInputCont>

      {isSearchTermEmpty && recentIssues.length > 0 && (
        <Fragment>
          <SectionTitle>Recent Issues</SectionTitle>
          {recentIssues.map(renderIssue)}
        </Fragment>
      )}

      {!isSearchTermEmpty && matchingIssues.length > 0 && (
        <Fragment>
          <SectionTitle>Matching Issues</SectionTitle>
          {matchingIssues.map(renderIssue)}
        </Fragment>
      )}

      {!isSearchTermEmpty && !isLoading && matchingIssues.length === 0 && (
        <NoResults>
          <NoResultsSVG />
          <NoResultsTitle>We couldn&apos;t find anything matching your search</NoResultsTitle>
          <NoResultsTip>Try again with a different term.</NoResultsTip>
        </NoResults>
      )}
    </IssueSearch>
  );
};


ProjectIssueSearch.propTypes = propTypes;

export default ProjectIssueSearch;
