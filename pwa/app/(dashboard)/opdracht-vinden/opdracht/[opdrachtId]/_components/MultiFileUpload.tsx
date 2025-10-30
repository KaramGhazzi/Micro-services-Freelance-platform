import React, { useCallback, useEffect, useState } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import IconArrowUpOut from '@/app/_components/icons/IconArrowUpOut';
import IconDocument from '@/app/_components/icons/IconDocument';
import IconXCircleFill from '@/app/_components/icons/IconXCircleFill';
import { File as GraphqlFile } from '@/graphql/types';

interface FilePreviewProps {
  file: FileType;
  onDelete: (file: FileType) => void;
}

type FileType = File | GraphqlFile;

const FilePreview: React.FC<FilePreviewProps> = ({ file, onDelete }) => (
  <div className="border-secondary-500 relative flex h-20 flex-col items-center justify-center gap-2 rounded-xl border px-3">
    <IconDocument className="text-secondary-500" />
    <span className="text-secondary-600 w-full truncate text-center text-xs font-medium">
      {file.name}
    </span>
    <span
      className="text-secondary-500 absolute -right-2 -top-2 cursor-pointer bg-white"
      onClick={() => onDelete(file)}
    >
      <IconXCircleFill />
    </span>
  </div>
);

interface MultiFileUploadProps {
  initialFiles?: GraphqlFile[];
  onFilesAdded: (files: File[]) => void;
  onFilesDeleted?: (files: GraphqlFile[]) => void;
  accept: Accept;
  maxSize?: number;
  maxFiles?: number;
}

const MultiFileUpload: React.FC<MultiFileUploadProps> = ({
  initialFiles = [],
  onFilesAdded,
  onFilesDeleted,
  accept,
  maxSize = undefined,
  maxFiles = undefined,
}) => {
  const [files, setFiles] = useState<FileType[]>([]);
  const [deletedFiles, setDeletedFiles] = useState<GraphqlFile[]>([]);

  const [initialFilesLoaded, setInitialFilesLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (initialFiles.length > 0 && !initialFilesLoaded) {
      setInitialFilesLoaded(true);
    }
    setFiles(initialFiles);
  }, [initialFiles]);

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const updatedFiles = [...files, ...acceptedFiles] as FileType[];

      setFiles(updatedFiles);

      //Filter out the files that are already in the database
      onFilesAdded(
        updatedFiles.filter((file) => file instanceof File) as File[]
      );
    },
    [files, onFilesAdded]
  );

  const handleDelete = (fileToDelete: FileType) => {
    if (onFilesDeleted && !(fileToDelete instanceof File)) {
      const filesDeleted = [...deletedFiles, fileToDelete];
      setDeletedFiles(filesDeleted);
      onFilesDeleted(filesDeleted);
    }

    if (onFilesAdded && fileToDelete instanceof File) {
      // We need this code to only remove 1 file from the files array if there are multiple files with the same values it will remove all of them.
      const doNotUploadFileIndex = files.findIndex(
        (file) => file === fileToDelete
      );

      onFilesAdded(
        files.filter(
          (file, index) =>
            index !== doNotUploadFileIndex && file instanceof File
        ) as File[]
      );
    }

    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToDelete));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept,
    maxSize,
    maxFiles,
  });

  return (
    <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
      <div
        {...getRootProps()}
        className="flex h-20 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-neutral-200 transition-all hover:border-neutral-300"
      >
        <input {...getInputProps()} />
        <IconArrowUpOut />
        <p className="text-xs font-medium text-neutral-400">Upload</p>
      </div>
      {files.map((file, index) => (
        <FilePreview
          key={`${index}_${file.name}`}
          file={file}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default MultiFileUpload;
