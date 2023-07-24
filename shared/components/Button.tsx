'use client';

import { type ButtonHTMLAttributes } from 'react';
import styles from '../styles/Button.module.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  full?: boolean;
  bgColor?: string;
  textColor?: string;
}

function Button({ text, full, bgColor, textColor, ...props }: Props): JSX.Element {
  return (
    <button
      style={{ background: bgColor, color: textColor }}
      className={`${styles.button} ${full ? styles.full : ''}`}
      {...props}
    >
      {text}
    </button>
  );
}
export default Button;
