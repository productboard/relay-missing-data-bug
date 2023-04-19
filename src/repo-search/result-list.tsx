import { usePaginationFragment } from "react-relay";
import { useEffect } from "react";

import type { repoSearchRepositories$key } from './fragments/__generated__/repoSearchRepositories.graphql';
import { repoSearchRepositoriesFragmentString } from "./fragments/repo-search-repositories";

export const ResultList = ({ queryRef, search }: {
  queryRef: repoSearchRepositories$key;
  search: string;
}) => {
  const { data, loadNext, hasNext, refetch } = usePaginationFragment(
    repoSearchRepositoriesFragmentString,
    queryRef
  );

  if (data.search === undefined) {
    console.info(`! missing data from fragment. data is undefined? ${data.search === undefined}`);;
  }

  useEffect(() => {
    refetch({ search });
  }, [search]);



  return (
    <>
      {data.search === undefined && <p>Search is undefined. This should not happen.</p>}
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
      {hasNext && (
        <button onClick={() => loadNext(10)}>Load more</button>
      )}
    </>
  );
}
