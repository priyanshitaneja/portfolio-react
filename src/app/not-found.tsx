import './not-found.scss';

export default function NotFound() {
  return (
    <div className="error">
      <h1>404</h1>
      <h3>
        Please select a page from header &nbsp;{' '}
        {/* was `class=`, which React ignored with a warning and TS rejects outright */}
        <i className="fa-solid fa-arrow-up fa-bounce" aria-hidden="true" />
      </h3>
    </div>
  );
}
