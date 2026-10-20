import "server-only";

// Public address of a console page: /<ADMIN_PATH>/<path>. The proxy maps it
// onto app/(console)/console. Client components get the base from
// ConsoleBaseProvider instead (components/console/base).

export function consoleBase() {
  const value = process.env.ADMIN_PATH?.trim().replace(/^\/+|\/+$/g, "") ?? "";
  return `/${value}`;
}

export function consoleHref(path = "") {
  return `${consoleBase()}${path && !path.startsWith("/") ? "/" : ""}${path}`;
}
