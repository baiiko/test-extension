const url = new URL(window.location.href);

const component = url.searchParams.get('component') || 'overview';

// eslint-disable-next-line no-restricted-globals
addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve) => {
    try {
      const componentModule = await import(`./components/${component}.js`);

      resolve(componentModule);

      console.log(`Component ${component} loaded`);
    } catch (error) {
      console.log(`Unknown Component ${component}`);
    }
  });
});
