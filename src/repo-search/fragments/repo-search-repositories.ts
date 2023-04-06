import { graphql } from "react-relay"

export const repoSearchRepositoriesFragmentString = graphql`
  fragment repoSearchRepositories on Query
    @argumentDefinitions(
    first: { type: "Int", defaultValue: 10 }
    after: { type: "String" }
    search: { type: "String!" }
    )
    @refetchable(queryName: "repoSearchRepositories_filter") {
      search(query: $search, type: REPOSITORY, first: $first, after: $after)
      @connection(key: "repoItem_search")
      {
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
`
