import { useContext } from 'react';
import TalkJSContext from '../../_context/TalkJSContext';

export default function UnreadMessageBubble() {
  const { getTotalMessageCount } = useContext(TalkJSContext);

  return (
    <>
      {getTotalMessageCount() > 0 && (
        <div className="bg-secondary-500 absolute right-[3px] top-[3px] flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-xs font-semibold text-white">
          <span>
            {getTotalMessageCount() > 9 ? '9+' : getTotalMessageCount()}
          </span>
        </div>
      )}
    </>
  );
}
