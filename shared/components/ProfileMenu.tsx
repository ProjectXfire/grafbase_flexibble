'use client';

import NextLink from 'next/link';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from '../styles/ProfileMenu.module.css';
import { Avatar, Button, Menu } from '.';
import { useEffect, useRef, useState } from 'react';

interface Props {
  avatarUrl: string;
  userId: string;
}

function ProfileMenu({ avatarUrl, userId }: Props): JSX.Element {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const checkIfClickedOutsideMenu = (e: any): void => {
    if (menuRef.current === null || menuRef.current === null) return;
    if (menuRef.current.contains(e.target)) return;
    if (!menuRef.current.contains(e.target)) {
      setOpenMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', checkIfClickedOutsideMenu);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutsideMenu);
    };
  }, []);

  return (
    <div className={styles['profile-menu']}>
      <button
        className={styles['profile-menu__action']}
        type='button'
        onClick={() => {
          setOpenMenu(true);
        }}
      >
        <Avatar urlImg={avatarUrl} />
      </button>
      <Menu isOpen={openMenu} menuRef={menuRef}>
        <Menu.Item
          text='Work Preference'
          onClick={() => {
            setOpenMenu(false);
          }}
        />
        <Menu.Item
          text='Settings'
          onClick={() => {
            setOpenMenu(false);
          }}
        />
        <Menu.Item
          text='Profile'
          onClick={() => {
            setOpenMenu(false);
            router.push(`/profile/${userId}`);
          }}
        />
        <Button
          text='Sign Out'
          textColor='white'
          bgColor='rgb(71, 114, 173)'
          onClick={() => {
            signOut();
          }}
        />
      </Menu>
      <NextLink href='/create-project'>Share work</NextLink>
    </div>
  );
}
export default ProfileMenu;
