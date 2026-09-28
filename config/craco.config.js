module.exports = {
  devServer: {
    client: {
      overlay: {
        runtimeErrors: (error) => {
          // Suppress ResizeObserver errors - these are harmless browser behavior
          if (
            error.message === 'ResizeObserver loop completed with undelivered notifications.' ||
            error.message === 'ResizeObserver loop limit exceeded'
          ) {
            return false;
          }
          return true;
        },
      },
    },
  },
};
