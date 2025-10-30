import { useDeleteFileMutation } from '@/graphql/queries/storage/deleteFile.generated';

export default function useFileUpload() {
  const [deleteFileMutation] = useDeleteFileMutation();

  const deleteFile = async (containerName: string, blobName: string) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: isFileDeleted, errors } = await deleteFileMutation({
      variables: {
        containerName,
        blobName: blobName,
      },
    });

    if (errors) {
      throw new Error('failed to fetch Upload URL');
    }

    return isFileDeleted;
  };

  return {
    deleteFile,
  };
}
