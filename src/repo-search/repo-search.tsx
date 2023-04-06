import { useState, Suspense } from "react";
import { graphql } from "react-relay"
import { useLazyLoadQuery } from "react-relay"

import type { repoSearchQuery } from './__generated__/repoSearchQuery.graphql'
import { ResultList } from "./result-list";

const repoSearchQueryString = graphql`
  query repoSearchQuery($query: String!) {
    ...repoSearchRepositories @arguments(search: $query)
  }
`;

export const RepoSearch = () => {
  const [ search, setSearch ] = useState('');

  const queryRef = useLazyLoadQuery<repoSearchQuery>(repoSearchQueryString, { query: search });

  return (
    <>
      <input onChange={e => setSearch(e.target.value)} />
      <Suspense fallback='Loading results...'>
        <ResultList queryRef={queryRef} />
      </Suspense>
    </>
  );
}
