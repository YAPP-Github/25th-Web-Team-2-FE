import localFont from 'next/font/local';

/*
Copyright (c) 2021 Kil Hyung-jin, with Reserved Font Name Pretendard.
https://github.com/orioncactus/pretendard

This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
http://scripts.sil.org/OFL
*/

const pretendard = localFont({
  src: [
    {
      path: '../../public/fonts/Pretendard-Bold.subset.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-SemiBold.subset.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-Medium.subset.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-Regular.subset.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-pretendard',
  display: 'swap',
});

export default pretendard;
