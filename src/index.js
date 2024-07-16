const url = new URL(window.location.href);

const component = url.searchParams.get('component') || 'overview';

// eslint-disable-next-line no-async-promise-executor
new Promise(async (resolve) => {
  try {
    await import('./pages/common.js');
    const componentModule = await import(`./pages/${component}.js`);

    resolve(componentModule);

    console.log(`Component ${component} loaded`);
  } catch (error) {
    console.log(`Unknown Component ${component}`);
  }
});
