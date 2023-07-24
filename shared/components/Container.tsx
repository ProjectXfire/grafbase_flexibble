import { type ReactNode } from 'react';
import styles from '../styles/Container.module.css';

interface Props {
  children: ReactNode | ReactNode[];
}

function Container({ children }: Props): JSX.Element {
  return <div className={styles.container}>{children}</div>;
}
export default Container;
