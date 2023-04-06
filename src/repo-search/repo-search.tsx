import { useState } from "react";
import { graphql } from "react-relay"
import { useLazyLoadQuery } from "react-relay"

import type { repoSearchQuery } from './__generated__/repoSearchQuery.graphql'

const repoSearchQueryString = graphql`
  query repoSearchQuery($query: String!) {
    search(query: $query, type: REPOSITORY, first: 10) {
      edges {
        node {
          ... on Repository {
            id
            name
            url
            description
            owner {
              login
              url
            }
          }
        }
      }
    }
  }
`;

export const RepoSearch = () => {
  const [ search, setSearch ] = useState('');

  const data = useLazyLoadQuery<repoSearchQuery>(repoSearchQueryString, { query: search });

  return (
    <>
      <input onChange={e => setSearch(e.target.value)} />
      {data.search && (
        <ul>
          {data.search?.edges?.map((maybeValue) => maybeValue?.node ? (
            <li key={maybeValue.node.id}>
              <h3>
                <a href={maybeValue.node.url} target='_blank'>{maybeValue.node.name}</a>
              </h3>
              <p>{maybeValue.node.description}</p>
              <p>
                <a href={maybeValue.node.owner?.url} target='_blank'>
                  @{maybeValue.node.owner?.login}
                </a>
              </p>
            </li>
          ) : <></>)}
        </ul>
      )}
    </>
  );
}
