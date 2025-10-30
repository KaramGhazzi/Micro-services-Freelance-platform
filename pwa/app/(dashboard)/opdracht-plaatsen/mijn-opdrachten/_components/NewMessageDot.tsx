import React, { useContext, useEffect } from 'react';
import TalkJSContext from '@/app/(dashboard)/_context/TalkJSContext';

interface NewMessageDotProps {
  applicationId: string;
  isRead: boolean;
}

const NewMessageDot = ({ applicationId, isRead }: NewMessageDotProps) => {
  const { getAssignmentHasNewMessages, unreadMessages } =
    useContext(TalkJSContext);

  useEffect(() => {}, [unreadMessages]);

  return (
    <>
      {(getAssignmentHasNewMessages(applicationId) || !isRead) && (
        <div>
          <div className="bg-secondary-500 h-2 w-2 rounded-full"></div>
        </div>
      )}
    </>
  );
};

export default NewMessageDot;
