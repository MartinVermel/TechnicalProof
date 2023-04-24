import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Repository {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
  language: string;
}

interface Branch {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
}

interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

export const githubApi = createApi({
  reducerPath: "github",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.github.com/" }),
  endpoints: (builder) => ({
    searchRepositories: builder.query<Array<Repository>, string>({
      query: (query) => `search/repositories?q=${query}`,
      transformResponse: (response: { items: Array<Repository> }) => response.items,
    }),
    getRepoBranches: builder.query<Array<Branch>, { owner: string|undefined; repo: string|undefined }>({
      query: ({ owner, repo }) => `repos/${owner}/${repo}/branches`,
    }),
    getRepoContributors: builder.query<Array<Contributor>, { owner: string|undefined; repo: string|undefined }>({
      query: ({ owner, repo }) => `repos/${owner}/${repo}/contributors`,
    }),
  }),
});

export const {
  useSearchRepositoriesQuery,
  useGetRepoBranchesQuery,
  useGetRepoContributorsQuery,
} = githubApi;