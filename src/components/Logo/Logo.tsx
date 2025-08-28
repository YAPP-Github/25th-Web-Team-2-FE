import Image from 'next/image';
import Link from 'next/link';

import LogoImage from '../../assets/images/logo.svg';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const Logo = ({ width, height, className }: LogoProps) => {
  return (
    <Link href="/">
      <Image
        src={LogoImage}
        alt="로고"
        className={className}
        width={width}
        height={height}
        priority
      />
    </Link>
  );
};

export default Logo;
