import styles from '../styles/ErrorMessage.module.css';

interface Props {
  errorMessage: string;
}

function ErrorMessage({ errorMessage }: Props): JSX.Element {
  return <span className={styles['span-error']}>{errorMessage}</span>;
}
export default ErrorMessage;
