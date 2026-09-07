const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const sitePath = (path: string): string => {
  const [pathAndQuery, hash] = path.split("#", 2);
  const queryIndex = pathAndQuery.indexOf("?");
  const pathname = queryIndex === -1 ? pathAndQuery : pathAndQuery.slice(0, queryIndex);
  const query = queryIndex === -1 ? "" : pathAndQuery.slice(queryIndex);
  const normalizedPath = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return `${basePath}${normalizedPath}${query}${hash ? `#${hash}` : ""}`;
};
