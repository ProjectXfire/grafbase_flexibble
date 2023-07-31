'use client';

import { type ReactNode, useCallback, useRef, type MouseEvent } from 'react';
import NextImage from 'next/image';
import { useRouter } from 'next/navigation';
import styles from '../styles/Modal.module.css';

interface Props {
  children: ReactNode;
  headingTitle?: string;
}

function Modal({ children, headingTitle }: Props): JSX.Element {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.push('/');
  }, [router]);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
      if (e.target === overlay.current) {
        onDismiss();
      }
    },
    [onDismiss, overlay]
  );

  return (
    <div className={styles['modal-container']} ref={overlay} onClick={handleClick}>
      <button className={styles['modal-dismiss']} type='button' onClick={onDismiss}>
        <NextImage width={20} height={20} src='/images/close.svg' alt='close' />
      </button>
      <div className={styles.modal} ref={wrapper}>
        {headingTitle && <h1 className={styles['modal-heading']}>{headingTitle}</h1>}
        {children}
      </div>
    </div>
  );
}

export default Modal;
