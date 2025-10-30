import React from 'react';
import IconCheckmarkMd from '@/app/_components/icons/IconCheckmarkMd';

const ModalConfirmCheckmark = () => {
  return (
    <div className="flex justify-center">
      <i className="bg-success-50 mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full">
        <span className="bg-success-100 flex h-14 w-14 items-center justify-center rounded-full">
          <IconCheckmarkMd className="text-success-500 h-10 w-10" />
        </span>
      </i>
    </div>
  );
};

export default ModalConfirmCheckmark;
