import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import IconCheckmarkSm from './icons/IconCheckmarkSm';
import IconCamera from '@/app/_components/icons/IconCamera';
import IconXCircleFill from '@/app/_components/icons/IconXCircleFill';

interface SingleFileUploadProps {
  onUploadFile: (file: File) => void;
  onDeleteFile?: () => void;
  label?: string;
  button?: string;
  footnote?: string;
  initialImageUrl?: string;
  isCover?: boolean;
  uploadSuccess?: boolean;
  accept?: (
    | 'image/jpg'
    | 'image/jpeg'
    | 'image/png'
    | 'image/webp'
    | 'image/apng'
    | 'image/gif'
  )[];
}

const SingleFileUpload: React.FC<SingleFileUploadProps> = ({
  onUploadFile: onUploadFile,
  onDeleteFile: onDeleteFile,
  label,
  button,
  footnote,
  initialImageUrl,
  isCover,
  uploadSuccess,
  accept = [
    'image/jpg',
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/apng',
    'image/gif',
  ],
}) => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputFile = useRef<HTMLInputElement>(null);
  const t = useTranslations();
  const [success, setSuccess] = useState(uploadSuccess);
  useEffect(() => {
    setSuccess(uploadSuccess);
  }, [uploadSuccess]);

  const maxFileSize = 5 * 1024 * 1024;

  useEffect(() => {
    if (initialImageUrl) {
      setPreviewUrl(initialImageUrl);
    }
  }, [initialImageUrl]);

  const deleteFile = () => {
    if (inputFile?.current) {
      inputFile.current.value = '';
    }
    setPreviewUrl(null);
    if (onDeleteFile) {
      onDeleteFile();
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Delete') {
      e.preventDefault();
      deleteFile();
      setSuccess(false);
    }
  };

  const handleMouseEvent = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    deleteFile();
    setSuccess(false);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];

    if (!file && !inputFile?.current) {
      setPreviewUrl(null);
      return;
    }

    if (!file) {
      return;
    }

    if (!((accept as string[]) ?? [])?.includes(file.type)) {
      setError('File type is invalid');
      return;
    }

    if (file.size <= maxFileSize) {
      setUploadedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onUploadFile(file);
    } else {
      setError('File is too large');
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <div className="text-sm font-medium text-neutral-700">{label}</div>
      )}
      <label className="relative ">
        <input
          type="file"
          onChange={handleFileUpload}
          className="invisible absolute h-0 w-0"
          ref={inputFile}
        />

        <div
          className={`relative h-[108px] rounded-xl  border border-neutral-100 bg-neutral-100 text-neutral-500 ${
            isCover ? 'w-60 lg:w-80' : 'aspect-square w-[108px]'
          }`}
        >
          {previewUrl && (
            <span
              className="text-secondary-500 absolute -right-2 -top-2 z-10 cursor-pointer rounded-xl bg-white"
              onKeyUp={handleInputKeyDown}
              onClick={handleMouseEvent}
            >
              <IconXCircleFill />
            </span>
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <IconCamera />
          </div>
          {previewUrl && (
            <img
              src={previewUrl}
              alt=""
              className="absolute left-0 top-0 h-full w-full rounded-xl bg-white object-contain"
            />
          )}
        </div>

        <div className="flex">
          <div className="relative mt-3 inline-flex h-8 w-auto cursor-pointer items-center justify-center rounded-lg border border-neutral-200 bg-white px-4 text-sm font-semibold text-neutral-900 shadow-sm transition-all hover:bg-neutral-50">
            {button ?? 'Upload'}
          </div>
          {success && (
            <div className="text-success-400 mt-3 flex flex-nowrap items-center px-4 text-sm">
              <IconCheckmarkSm />
              <p className="text-xs">{t('upload.successMessage')}</p>
            </div>
          )}
        </div>
      </label>
      {footnote && <div className="text-xs text-neutral-500">{footnote}</div>}
      {error && <p className="text-error-600 text-xs font-medium">{error}</p>}
    </div>
  );
};

export default SingleFileUpload;
