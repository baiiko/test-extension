const url = new URL(window.location.href);

const component = url.searchParams.get('component') || 'overview';

new Promise(async (resolve, reject) => {
    try {
        const componentModule = await import(`./components/${component}.js`);

        resolve(componentModule);

        console.log(`Component ${component} loaded`);
    } catch (error) {
        console.log(`Unknown Component ${component}`);
    }
});