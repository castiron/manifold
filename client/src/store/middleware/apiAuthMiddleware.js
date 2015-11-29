export default function apiAuthMiddleware({ getState }) {
  return (next) => (action) => {
    return next(action);
  }
}
