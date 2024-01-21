import Header from '@/components/Header'
import Provider from '@/components/Provider';
import '@/style/globals.scss'
import type { Metadata } from 'next'
import { Noto_Sans_KR } from "next/font/google";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export const notoSansKr = Noto_Sans_KR({
  weight: ['500'],
  subsets: ['latin'],
})

const description = `다양한 기본 상식을 배우고 공유할 수 있는 플랫폼입니다. 사용자들은 새로운 지식을 읽고, 자신의 지식을 공유하며 서로의 지식을 키울 수 있습니다. A platform to learn and share various general knowledge topics. Users can read new facts, share their own insights, and enhance each other's understanding.`
const siteName = '─상식선─'

export const metadata: Metadata = {
  title: siteName,
  description,
  keywords: ['general knowledge', 'learning', 'sharing', 'education', 'quiz', 'facts', 'information', 'common knowledge', '상식', '지식', '학습', '공유', '교육', '퀴즈', '일반 지식', '공통 지식', '사실', '정보', '지식 공유', '교육 플렛폼', '지식 공유 플렛폼'],
  creator: 'KAWAN426',
  publisher: 'KAWAN426',
  authors: [{
    name: 'KAWAN', url: 'https://github.com/KAWAN426'
  }],
  icons: {
    icon: '/images/icon.png',
    shortcut: '/images/icon.png',
    apple: '/images/icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/images/icon.pn',
    },
  },
  openGraph: {
    title: siteName,
    description,
    url: 'sangsiksun.com',
    siteName,
    images: [
      {
        url: '/images/og.png',
        width: 800,
        height: 600,
      },
    ],
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className={notoSansKr.className}>
        <Provider>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            {children}
          </div>
        </Provider>
        <ToastContainer />
      </body>
    </html>
  )
}
