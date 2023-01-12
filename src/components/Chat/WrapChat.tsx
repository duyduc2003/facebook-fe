import { useInputText } from 'hooks-react-custom';
import React from 'react';

import Button from 'components/Button';
import { IconImageColor, IconLike } from 'components/icon';
import Image from 'components/Image';
import Input from 'components/Input';
import fakeData from 'utils/constants/fakeData';
import { IconSend } from 'components/icon';
import Chat from './Chat';

interface WrapChatProps {}

function WrapChat(props: WrapChatProps) {
  const {} = props;

  const inputText = useInputText('');

  return (
    <div className="relative w-full">
      <div className="relative">
        <div className="fixed top-[56px] bg-white !z-[100] left-[360px] right-0 px-4 h-[64px] flex items-center justify-between shadow-[0_0_4px] shadow-shadow2">
          <div>
            <Button rounded="8px" overlay center>
              <div className="flex items-center p-[6px]">
                <div className="w-[40px] h-[40px] mr-2">
                  <Image src={fakeData.avatar} alt="" rounded />
                </div>
                <div>
                  <p className="text-primaryText text-[16px] font-[500]">
                    copecuatoi
                  </p>
                </div>
              </div>
            </Button>
          </div>
          <div></div>
        </div>
      </div>
      <div className="relative h-[calc(100vh_-_56px)] z-[59] overflow-y-scroll">
        <div className="pt-[64px] h-full !z-[50]">
          <div className="flex justify-center mt-10 flex-col items-center">
            <div className="w-[60px] h-[60px]">
              <Image src="" alt="" rounded></Image>
            </div>
            <div className="text-primaryText text-[16px] font-[500] mt-2">
              copecuatoi
            </div>
          </div>
          <Chat />
        </div>
      </div>
      <div className="fixed bottom-0 left-[360px] z-[100] right-0 block">
        <div className="h-[60px] flex items-center justify-between bg-white">
          <div className="mx-5">
            <Button center overlay className="w-[30px] h-[30px]" rounded>
              <IconImageColor />
            </Button>
          </div>
          <div className="bg-commentBackground flex-1 rounded-[16px]">
            <Input
              className="h-[36px] border-none bg-transparent px-4"
              placeholder="Aa"
              {...inputText}
            />
          </div>
          <div className="mx-4">
            {inputText.value ? (
              <Button center overlay className="w-[30px] h-[30px]" rounded>
                <IconSend />
              </Button>
            ) : (
              <Button center overlay className="w-[30px] h-[30px]" rounded>
                <IconLike />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const ChoseChatAccount = () => (
  <div className="bg-webWash h-full flex items-center justify-center text-secondaryText font-[700] text-[20px]">
    Hãy chọn một đoạn chat hoặc bắt đầu cuộc trò chuyện mới
  </div>
);

export default WrapChat;
