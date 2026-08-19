const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const publicAsset = (path: string): string => `${basePath}${path}`;
