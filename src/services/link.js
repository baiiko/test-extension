export function createLink(init) {
  return new URLSearchParams(init);
}

export function redirect(init) {
  const url = createLink(init);

  document.location = `?${url.toString()}`;
}
