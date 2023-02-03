import {
  useAsync,
  useInput,
  useKeyPressHandler,
  useScrollToElement,
} from 'hooks-react-custom';
import React, { useCallback, useRef } from 'react';

import Button from '@/components/Button';
import { IconImageColor, IconLike } from '@/components/icon';
import Image from '@/components/Image';
import Input from '@/components/Input';
import { IconSend } from '@/components/icon';
import Chat from './Chat';
import { sendChat } from '@/services/chat';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { UserModel } from '@/interfaces/auth';
import Link from 'next/link';

interface WrapChatProps {
  friendData?: UserModel;
}

function WrapChat(props: WrapChatProps) {
  const { friendData } = props;

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>();

  const { currentUser } = useAuth();

  const { eventBind, hasValue, value, setValue } = useInput('');

  const chatID = router.query.chatID;

  const { execute } = useAsync(async () => {
    return sendChat(`${chatID}`, {
      sender_id: currentUser?.id || '',
      message: value,
      image: null,
    });
  });

  useKeyPressHandler('enter', () => {
    handleSendChat();
  });

  const handleSendChat = useCallback(() => {
    execute();
    setValue('');
    inputRef.current?.focus();
  }, [execute, setValue]);

  return (
    <div className="relative w-full">
      <div className="relative">
        <div className="fixed top-[56px] bg-white !z-[100] left-0 custom_md:left-[360px] right-0 px-4 h-[64px] flex items-center justify-between shadow-[0_0_4px] shadow-shadow2">
          <div>
            <Link href={`/${friendData?.id}`}>
              <Button rounded="8px" overlay center>
                <div className="flex items-center p-[6px]">
                  <div className="w-[40px] h-[40px] mr-2">
                    <Image src={friendData?.avatar || ''} alt="" rounded />
                  </div>
                  <div>
                    <p className="text-primaryText text-[16px] font-[500]">
                      {friendData?.firstName || ''} {friendData?.lastName || ''}
                    </p>
                  </div>
                </div>
              </Button>
            </Link>
          </div>
          <div></div>
        </div>
      </div>
      <div className="relative h-[calc(100vh_-_56px)] z-[59] overflow-y-scroll">
        <div className="pt-[64px] h-full !z-[50]">
          <div className="flex justify-center mt-10 flex-col items-center">
            <div className="w-[60px] h-[60px]">
              <Image src={friendData?.avatar || ''} alt="" rounded></Image>
            </div>
            <div className="text-primaryText text-[16px] font-[500] mt-2">
              {friendData?.firstName || ''} {friendData?.lastName || ''}
            </div>
          </div>
          <Chat friendData={friendData} chatID={`${chatID}`} />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 custom_md:left-[360px] z-[100] right-0 block">
        <div className="h-[60px] flex items-center justify-between bg-white">
          {/* <div className="mx-5">
            <Button center overlay className="w-[30px] h-[30px]" rounded>
              <IconImageColor />
            </Button>
          </div> */}
          <div className="bg-commentBackground flex-1 rounded-[16px] ml-5">
            <Input
              ref={inputRef}
              className="h-[36px] border-none bg-transparent px-4"
              placeholder="Aa"
              {...eventBind}
            />
          </div>
          <div className="mx-4">
            {hasValue ? (
              <Button
                center
                overlay
                className="w-[30px] h-[30px]"
                rounded
                onClick={handleSendChat}
              >
                <IconSend />
              </Button>
            ) : (
              // <Button center overlay className="w-[30px] h-[30px]" rounded>
              //   <IconLike />
              // </Button>
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WrapChat;
