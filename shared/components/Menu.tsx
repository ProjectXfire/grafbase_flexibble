'use client';

import { type RefObject, type ReactNode } from 'react';
import styles from '../styles/Menu.module.css';

interface Props {
  children: ReactNode | ReactNode[];
  isOpen: boolean;
  menuRef: RefObject<HTMLDivElement>;
}

interface ItemProps {
  text: string;
  onClick: () => void;
}

function Menu({ children, isOpen, menuRef }: Props): JSX.Element {
  return (
    <div ref={menuRef} style={{ display: isOpen ? 'flex' : 'none' }} className={styles.menu}>
      {children}
    </div>
  );
}

function Item({ onClick, text }: ItemProps): JSX.Element {
  return (
    <div className={styles['menu-item']} onClick={onClick}>
      <p>{text}</p>
    </div>
  );
}

Menu.Item = Item;

export default Menu;
