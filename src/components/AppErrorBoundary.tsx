import { Component, type ErrorInfo, type ReactNode } from "react";

type AppErrorBoundaryProps = {
  children: ReactNode;
};

type AppErrorBoundaryState = {
  hasError: boolean;
};

export default class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Application crashed during render", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            padding: "2rem",
            textAlign: "center",
            background: "#05070b",
            color: "#fff",
            fontFamily: "Inter, system-ui, -apple-system, sans-serif",
          }}
        >
          <section>
            <h1 style={{ marginBottom: "0.75rem" }}>InnoWeb couldn&apos;t load this page.</h1>
            <p style={{ maxWidth: "48ch", margin: "0 auto" }}>
              A runtime error prevented the app from rendering. Check the browser console for details and refresh after fixing
              the issue.
            </p>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
