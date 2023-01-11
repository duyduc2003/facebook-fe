import dynamic from 'next/dynamic';
const Image = dynamic(() => import('components/Image'), { ssr: false });
import WrapPost from 'components/WrapPost';
import React from 'react';

interface PostedProps {
  avatar?: string;
  fullName: string;
  content?: string;
  img?: string | null;
}

export default function Posted(props: PostedProps) {
  const { fullName = '', avatar = '', img = '', content = '' } = props;

  return (
    <WrapPost className="my-4">
      <div className="mx-[16px] flex items-center">
        <div className="min-w-[40px] w-[40px] h-[40px] mr-2">
          <Image
            src={avatar || ''}
            alt={fullName}
            rounded
            className="object-cover"
          />
        </div>
        <div className="text-primaryText text-[14px] font-[500]">
          {fullName}
        </div>
      </div>
      <div
        className="mx-4 mt-4"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {img && (
        <div className="my-4 flex justify-center">
          <Image src={img} alt="" className="object-cover" />
        </div>
      )}
    </WrapPost>
  );
}
