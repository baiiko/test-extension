const url = new URL(window.location.href);

const component = url.searchParams.get('component') || 'overview';

addEventListener("DOMContentLoaded", () => {
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
