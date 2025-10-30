export const getCDNUrl = () => {
  return process?.env?.['NEXT_PUBLIC_CDN_URL'];
};

export const getImageUrl = (containerName?: string, blobName?: string) => {
  if (!containerName || !blobName) return undefined;
  const cdnUrl = getCDNUrl();
  return `${cdnUrl}/${containerName}/${blobName}`;
};
