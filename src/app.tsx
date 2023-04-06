import { Suspense } from "react"

import { RepoSearch } from "./repo-search/repo-search"
import { ErrorBoundary } from "./repo-search/error-boundary"

export const App = () => (
  <div id="app">
    <h1>App</h1>
    <ErrorBoundary>
      <Suspense fallback={<>Loading...</>}>
        <RepoSearch />
      </Suspense>
    </ErrorBoundary>
  </div>
)
