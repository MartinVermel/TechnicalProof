import React from "react";
import { useParams } from "react-router-dom";
import { useGetRepoBranchesQuery, useGetRepoContributorsQuery } from './api';

const RepoDetailsPage: React.FC = () => {
  const { owner, repo } = useParams<{owner: string, repo: string}>();
  const { data: branches, error: branchesError, isLoading: branchesLoading } = useGetRepoBranchesQuery({ owner, repo });
  const { data: contributors, error: contributorsError, isLoading: contributorsLoading } = useGetRepoContributorsQuery({ owner, repo });

  return (
    <div className="horizontal-list">
      <h1>{owner}/{repo}</h1>
      <h2>Branches</h2>
      {branchesLoading && <p>Loading branches...</p>}
      {branches && (
        <ul>
          {branches.map((branch) => (
            <li className="horizontal-branche" key={branch.name}>{branch.name}</li>
          ))}
        </ul>
      )}
      <h2>Contributors</h2>
      {contributorsLoading && <p>Loading contributors...</p>}
      {contributors && (
        <ul>
          {contributors.map((contributor) => (
            <li key={contributor.login}>
              <img src={contributor.avatar_url} alt={contributor.login} width="50" height="50" />
              <a href={contributor.html_url} target="_blank" rel="noreferrer">
                {contributor.login}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RepoDetailsPage;