const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const sitePath = (path: string): string => {
  const [pathname, hash] = path.split("#", 2);
  const normalizedPath = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return `${basePath}${normalizedPath}${hash ? `#${hash}` : ""}`;
};
