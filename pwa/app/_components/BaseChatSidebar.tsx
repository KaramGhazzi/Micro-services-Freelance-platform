import React, { useRef, useEffect } from 'react';
import IconPaperPlaneFill from '@/app/_components/icons/IconPaperPlaneFill';

type Props = {
  assignment: Object;
};

const ChatSidebar: React.FC<Props> = () => {
  const messagesRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };

  useEffect(
    () => {
      scrollToBottom();
    },
    [
      /* Add any dependency that triggers new content */
    ]
  );
  return (
    <div className="flex hidden h-full flex-col xl:block">
      <div
        ref={messagesRef}
        className="sticky top-36 h-[calc(100vh-200px)] min-h-0 overflow-y-auto bg-white"
      >
        <div className="relative flex h-fit flex-col">
          <div className="sticky top-0 bg-white">
            <div className="flex h-12 items-center border-b border-neutral-100 px-6 text-sm font-semibold text-neutral-900">
              Gesprek met Gerald
            </div>
          </div>
          <div className="flex grow flex-col gap-2 ">
            <div className="grid gap-[22px] p-6">
              <div className="grid gap-2">
                <div className="max-w-[238px] rounded-lg bg-neutral-100 p-3 text-sm font-medium text-neutral-900">
                  Goedemiddag, ik heb een vraag. Is het mogelijk om de opdracht
                  deels remote uit te voeren?
                </div>
                <div className="flex items-center gap-x-1">
                  <div className="relative h-5 w-5 shrink-0 rounded-full bg-neutral-100"></div>
                  <div className="text-xs text-neutral-500">
                    Gerald, Vandaag 12:34
                  </div>
                </div>
              </div>

              <div className="grid justify-items-end gap-2">
                <div className="bg-info-500 max-w-[238px] rounded-lg p-3 text-sm font-medium text-white">
                  Hi Gerald, leuk dat je contact opneemt! Het is mogelijk om de
                  opdracht voor 2 dagen per week remote uit te voeren.
                </div>
                <div className="flex items-center gap-x-1">
                  <div className="relative h-5 w-5 shrink-0 rounded-full bg-neutral-100"></div>
                  <div className="text-xs text-neutral-500">
                    Jij, Vandaag 13:42
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <div className="max-w-[238px] rounded-lg bg-neutral-100 p-3 text-sm font-medium text-neutral-900">
                  Goedemiddag, ik heb een vraag. Is het mogelijk om de opdracht
                  deels remote uit te voeren?
                </div>
                <div className="flex items-center gap-x-1">
                  <div className="relative h-5 w-5 shrink-0 rounded-full bg-neutral-100"></div>
                  <div className="text-xs text-neutral-500">
                    Gerald, Vandaag 12:34
                  </div>
                </div>
              </div>

              <div className="grid justify-items-end gap-2">
                <div className="bg-info-500 max-w-[238px] rounded-lg p-3 text-sm font-medium text-white">
                  Hi Gerald, leuk dat je contact opneemt! Het is mogelijk om de
                  opdracht voor 2 dagen per week remote uit te voeren.
                </div>
                <div className="flex items-center gap-x-1">
                  <div className="relative h-5 w-5 shrink-0 rounded-full bg-neutral-100"></div>
                  <div className="text-xs text-neutral-500">
                    Jij, Vandaag 13:42
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <div className="max-w-[238px] rounded-lg bg-neutral-100 p-3 text-sm font-medium text-neutral-900">
                  Goedemiddag, ik heb een vraag. Is het mogelijk om de opdracht
                  deels remote uit te voeren?
                </div>
                <div className="flex items-center gap-x-1">
                  <div className="relative h-5 w-5 shrink-0 rounded-full bg-neutral-100"></div>
                  <div className="text-xs text-neutral-500">
                    Gerald, Vandaag 12:34
                  </div>
                </div>
              </div>

              <div className="grid justify-items-end gap-2">
                <div className="bg-info-500 max-w-[238px] rounded-lg p-3 text-sm font-medium text-white">
                  Hi Gerald, leuk dat je contact opneemt! Het is mogelijk om de
                  opdracht voor 2 dagen per week remote uit te voeren.
                </div>
                <div className="flex items-center gap-x-1">
                  <div className="relative h-5 w-5 shrink-0 rounded-full bg-neutral-100"></div>
                  <div className="text-xs text-neutral-500">
                    Jij, Vandaag 13:42
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <div className="max-w-[238px] rounded-lg bg-neutral-100 p-3 text-sm font-medium text-neutral-900">
                  Goedemiddag, ik heb een vraag. Is het mogelijk om de opdracht
                  deels remote uit te voeren?
                </div>
                <div className="flex items-center gap-x-1">
                  <div className="relative h-5 w-5 shrink-0 rounded-full bg-neutral-100"></div>
                  <div className="text-xs text-neutral-500">
                    Gerald, Vandaag 12:34
                  </div>
                </div>
              </div>

              <div className="grid justify-items-end gap-2">
                <div className="bg-info-500 max-w-[238px] rounded-lg p-3 text-sm font-medium text-white">
                  Hi Gerald, leuk dat je contact opneemt! Het is mogelijk om de
                  opdracht voor 2 dagen per week remote uit te voeren.
                </div>
                <div className="flex items-center gap-x-1">
                  <div className="relative h-5 w-5 shrink-0 rounded-full bg-neutral-100"></div>
                  <div className="text-xs text-neutral-500">
                    Jij, Vandaag 13:42
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <div className="max-w-[238px] rounded-lg bg-neutral-100 p-3 text-sm font-medium text-neutral-900">
                  Goedemiddag, ik heb een vraag. Is het mogelijk om de opdracht
                  deels remote uit te voeren?
                </div>
                <div className="flex items-center gap-x-1">
                  <div className="relative h-5 w-5 shrink-0 rounded-full bg-neutral-100"></div>
                  <div className="text-xs text-neutral-500">
                    Gerald, Vandaag 12:34
                  </div>
                </div>
              </div>

              <div className="grid justify-items-end gap-2">
                <div className="bg-info-500 max-w-[238px] rounded-lg p-3 text-sm font-medium text-white">
                  Hi Gerald, leuk dat je contact opneemt! Het is mogelijk om de
                  opdracht voor 2 dagen per week remote uit te voeren.
                </div>
                <div className="flex items-center gap-x-1">
                  <div className="relative h-5 w-5 shrink-0 rounded-full bg-neutral-100"></div>
                  <div className="text-xs text-neutral-500">
                    Jij, Vandaag 13:42
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 flex grow items-end bg-white p-6 pt-0">
              <div className="flex w-full items-center rounded-lg border border-neutral-200 bg-white px-3">
                <input
                  type="text"
                  className="flex-grow rounded-lg py-3 text-sm font-medium text-neutral-500 placeholder:font-normal placeholder:text-neutral-300 focus:outline-none"
                  placeholder="Typ hier een bericht..."
                />

                <IconPaperPlaneFill className="text-neutral-300 hover:cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
