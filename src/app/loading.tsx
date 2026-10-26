export default function Loading() {
  return (
    <div className="loading-screen" role="status" aria-label="Loading page">
      <p>Just a moment.</p>
      <div className="skeleton-line" />
      <div className="skeleton-photo" />
      <div className="skeleton-row" />
      <div className="skeleton-row" />
    </div>
  );
}
