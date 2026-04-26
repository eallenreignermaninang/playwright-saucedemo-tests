// SauceDemo provides these test credentials on the login page
const users = {
  // Standard user — everything works normally
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
  },

  // Locked out user — should see an error message on login
  lockedOut: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },

  // Problem user — images are broken, some features misbehave
  problem: {
    username: 'problem_user',
    password: 'secret_sauce',
  },

  // Performance glitch user — app runs slowly for this user
  performance: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
  },
};

module.exports = { users };