import { Component } from "react";
import type { ReactNode } from "react";

export class ErrorBoundary extends Component<{
  children: ReactNode;
}> {
  state: {
    error: Error | null;
  } = { error: null };

  componentDidCatch(error: Error) {
    this.setState({ error });
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error?.toString()}
            <br />
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}
