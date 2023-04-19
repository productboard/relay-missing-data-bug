import { useState, Suspense, useCallback, startTransition } from "react";
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

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      setSearch(e.target.value);
    });
  }, []);

  return (
    <>
      <input onChange={handleInputChange} />
      <Suspense fallback='Loading results...'>
        <ResultList search={search} queryRef={queryRef} />
      </Suspense>
    </>
  );
}
