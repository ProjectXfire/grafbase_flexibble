import NextImage from 'next/image';
import { BiSolidUserCircle } from 'react-icons/bi';
import styles from '../styles/Avatar.module.css';

interface Props {
  urlImg?: string | null;
}

function Avatar({ urlImg }: Props): JSX.Element {
  if (!urlImg)
    return (
      <div className={styles.avatar}>
        <BiSolidUserCircle />
      </div>
    );

  return (
    <div className={styles.avatar}>
      <NextImage fill src={urlImg} alt='avatar' />
    </div>
  );
}
export default Avatar;
