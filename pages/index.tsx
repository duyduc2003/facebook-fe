import Head from 'next/head';

import MainLayout from 'components/common/layout/MainLayout';
import Body from 'components/common/layout/partial/Body';
import Sidebar from 'components/common/layout/partial/Sidebar';
import Content from 'components/common/layout/partial/Content';
import {
  SidebarLeft,
  SidebarRight,
} from 'components/common/layout/partial/Sidebar/modules/HomePage';
import WrapPost from 'components/WrapPost';
import WritePost from 'components/WritePost';
import Posted from 'components/Posted';
import { useAuth } from 'context/auth';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { routes } from '../src/constants/common';

function Home() {
  const { currentAuth } = useAuth();

  const route = useRouter();

  return (
    <>
      <Head>
        <title>Facebook Demo</title>
      </Head>
      <Body className="bg-webWash min-h-[calc(100vh_-_56px)]">
        <Sidebar className="custom_lg:block hidden max-w-[280px]" size="sm">
          <SidebarLeft />
        </Sidebar>
        <Content size="sm">
          <WritePost />
          <Posted
            avatar="https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-1/286414172_1072228776704968_9090821464898167189_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=tKYivTmmFo4AX_BqlaV&tn=5SeIpUa62FYozVB3&_nc_ht=scontent.fsgn8-3.fna&oh=00_AfA7f4N7oCFm1lo-4rP9IqFUDbP1GSFvuOob-p7y_eflfQ&oe=63B83ED6"
            fullName="Đặng Duy Đức"
            img="https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/323258880_593541069445554_7957765843319475832_n.jpg?stp=cp6_dst-jpg_s1080x2048&_nc_cat=105&ccb=1-7&_nc_sid=0debeb&_nc_ohc=zWtk0KVosToAX9_1Lhh&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfCkPtmQxtd2FX4zzMSDjMZMP7BAkwugD1My0l3gilUWDQ&oe=63B7E6D5"
          />
          <Posted
            avatar="https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-1/286414172_1072228776704968_9090821464898167189_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=tKYivTmmFo4AX_BqlaV&tn=5SeIpUa62FYozVB3&_nc_ht=scontent.fsgn8-3.fna&oh=00_AfA7f4N7oCFm1lo-4rP9IqFUDbP1GSFvuOob-p7y_eflfQ&oe=63B83ED6"
            fullName="Đặng Duy Đức"
            img="https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/323258880_593541069445554_7957765843319475832_n.jpg?stp=cp6_dst-jpg_s1080x2048&_nc_cat=105&ccb=1-7&_nc_sid=0debeb&_nc_ohc=zWtk0KVosToAX9_1Lhh&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfCkPtmQxtd2FX4zzMSDjMZMP7BAkwugD1My0l3gilUWDQ&oe=63B7E6D5"
          />
          <Posted
            avatar="https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-1/286414172_1072228776704968_9090821464898167189_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=tKYivTmmFo4AX_BqlaV&tn=5SeIpUa62FYozVB3&_nc_ht=scontent.fsgn8-3.fna&oh=00_AfA7f4N7oCFm1lo-4rP9IqFUDbP1GSFvuOob-p7y_eflfQ&oe=63B83ED6"
            fullName="Đặng Duy Đức"
            img="https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/323258880_593541069445554_7957765843319475832_n.jpg?stp=cp6_dst-jpg_s1080x2048&_nc_cat=105&ccb=1-7&_nc_sid=0debeb&_nc_ohc=zWtk0KVosToAX9_1Lhh&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfCkPtmQxtd2FX4zzMSDjMZMP7BAkwugD1My0l3gilUWDQ&oe=63B7E6D5"
          />
          <Posted
            avatar="https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-1/286414172_1072228776704968_9090821464898167189_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=tKYivTmmFo4AX_BqlaV&tn=5SeIpUa62FYozVB3&_nc_ht=scontent.fsgn8-3.fna&oh=00_AfA7f4N7oCFm1lo-4rP9IqFUDbP1GSFvuOob-p7y_eflfQ&oe=63B83ED6"
            fullName="Đặng Duy Đức"
            img="https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/323258880_593541069445554_7957765843319475832_n.jpg?stp=cp6_dst-jpg_s1080x2048&_nc_cat=105&ccb=1-7&_nc_sid=0debeb&_nc_ohc=zWtk0KVosToAX9_1Lhh&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfCkPtmQxtd2FX4zzMSDjMZMP7BAkwugD1My0l3gilUWDQ&oe=63B7E6D5"
          />
          <Posted
            avatar="https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-1/286414172_1072228776704968_9090821464898167189_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=tKYivTmmFo4AX_BqlaV&tn=5SeIpUa62FYozVB3&_nc_ht=scontent.fsgn8-3.fna&oh=00_AfA7f4N7oCFm1lo-4rP9IqFUDbP1GSFvuOob-p7y_eflfQ&oe=63B83ED6"
            fullName="Đặng Duy Đức"
            img="https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/323258880_593541069445554_7957765843319475832_n.jpg?stp=cp6_dst-jpg_s1080x2048&_nc_cat=105&ccb=1-7&_nc_sid=0debeb&_nc_ohc=zWtk0KVosToAX9_1Lhh&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfCkPtmQxtd2FX4zzMSDjMZMP7BAkwugD1My0l3gilUWDQ&oe=63B7E6D5"
          />
        </Content>
        <Sidebar
          className="custom_md:block hidden max-w-[280px]"
          position="right"
          size="sm"
        >
          <SidebarRight />
        </Sidebar>
      </Body>
    </>
  );
}

Home.Layout = MainLayout;

export default Home;
