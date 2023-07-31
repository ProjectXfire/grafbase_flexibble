'use client';

import { useEffect, type ChangeEvent, type HTMLInputTypeAttribute, useState } from 'react';
import NextImage from 'next/image';
import { Menu } from '@headlessui/react';
import styles from '../styles/InputForm.module.css';
import { ErrorMessage } from '.';

interface Props {
  type?: HTMLInputTypeAttribute;
  name: string;
  placeholder: string;
  value: string;
  textarea?: boolean;
  errorText?: string;
  select?: boolean;
  selectValues?: string[];
  onSelectValue?: (value: string) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function InputForm({
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  textarea,
  errorText,
  select,
  selectValues = [],
  onSelectValue
}: Props): JSX.Element {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <></>;

  if (textarea)
    return (
      <div className={styles['input-group-container']}>
        <div className={`${styles['input-group']} ${errorText ? styles['border-error'] : ''}`}>
          <textarea
            id={name}
            className={`${styles.input}`}
            name={name}
            value={value}
            onChange={onChange}
            cols={30}
            rows={5}
          ></textarea>
          <label
            htmlFor={name}
            className={`${styles.label} ${value ? styles['has-text'] : ''} ${
              errorText ? styles['text-error'] : ''
            }`}
          >
            {placeholder}
          </label>
        </div>
        {errorText && <ErrorMessage errorMessage={errorText} />}
      </div>
    );

  if (select)
    return (
      <div className={styles['input-group-container']}>
        <div className={styles.select}>
          <label htmlFor={name}>{name[0].toUpperCase() + name.slice(1)}</label>
          <Menu as='div' style={{ position: 'relative' }}>
            <div>
              <Menu.Button
                className={`${styles.select__button} ${errorText ? styles['border-error'] : ''} ${
                  errorText ? styles['text-error'] : ''
                }`}
              >
                {value || placeholder}
                <NextImage width={10} height={5} src='/images/arrow-down.svg' alt='arrow' />
              </Menu.Button>
            </div>
            <Menu.Items className={styles.select__items}>
              {selectValues.map((value) => (
                <Menu.Item key={value}>
                  <button
                    type='button'
                    value={value}
                    onClick={(e) => {
                      if (onSelectValue) {
                        onSelectValue(e.currentTarget.value);
                      }
                    }}
                  >
                    {value}
                  </button>
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>
        </div>
        {errorText && <ErrorMessage errorMessage={errorText} />}
      </div>
    );

  return (
    <div className={styles['input-group-container']}>
      <div className={`${styles['input-group']} ${errorText ? styles['border-error'] : ''}`}>
        <input
          id={name}
          className={`${styles.input}`}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
        />
        <label
          htmlFor={name}
          className={`${styles.label} ${value ? styles['has-text'] : ''} ${
            errorText ? styles['text-error'] : ''
          }`}
        >
          {placeholder}
        </label>
      </div>
      {errorText && <ErrorMessage errorMessage={errorText} />}
    </div>
  );
}
export default InputForm;
