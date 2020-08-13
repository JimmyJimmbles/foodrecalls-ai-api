class UserSafeError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, UserSafeError);
  }
}

export default UserSafeError;
