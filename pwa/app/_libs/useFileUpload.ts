import { ContainerClient } from '@azure/storage-blob';
import { FileCreateInput } from '@/graphql/types';
import { useCreateFileMutation } from '@/graphql/mutations/file/createFile.generated';
import { useGetFileUploadLinkLazyQuery } from '@/graphql/queries/storage/getUploadLink.generated';

export default function useFileUpload() {
  const [createFile] = useCreateFileMutation();
  const [getUploadLink] = useGetFileUploadLinkLazyQuery();

  const linkFile = async (inputData: FileCreateInput) => {
    // save a record of the file in the database
    const { data: fileData } = await createFile({
      variables: {
        data: inputData,
      },
    });

    return { fileData };
  };

  const uploadFile = async (containerName: string, file: File) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: uploadLinkData } = await getUploadLink({
      variables: {
        containerName,
        blobName: file.name,
      },
    });

    if (!uploadLinkData?.fileUploadLink) {
      throw new Error('failed to fetch Upload URL');
    }

    const { url, blobName } = uploadLinkData.fileUploadLink;
    const containerClient = new ContainerClient(url);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(file);
    return { containerName, blobName };
  };
  return {
    uploadFile,
    linkFile,
  };
}
