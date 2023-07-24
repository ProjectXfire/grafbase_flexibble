import styles from '../styles/FooterColumn.module.css';

interface Props {
  title: string;
  links: string[];
}

function FooterColumn({ links, title }: Props): JSX.Element {
  return (
    <div className={styles['footer-column']} key={title}>
      <h3>{title}</h3>
      <ul className={styles['footer-column__links']}>
        {links.map((link) => (
          <li key={link}>{link}</li>
        ))}
      </ul>
    </div>
  );
}
export default FooterColumn;
