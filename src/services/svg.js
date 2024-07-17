export default (url) => fetch(
  url,
)
  .then((res) => res.text())
  .then((text) => new DOMParser().parseFromString(text, 'image/svg+xml')?.childNodes?.[0]);
