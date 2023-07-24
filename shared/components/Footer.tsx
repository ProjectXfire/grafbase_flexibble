import NextImage from 'next/image';
import styles from '../styles/Footer.module.css';
import { footerLinks } from '../constants';
import { Container, FooterColumn } from '.';

function Footer(): JSX.Element {
  return (
    <div className={styles['footer-container']}>
      <Container>
        <footer className={styles.footer}>
          <div className={styles.footer__heading}>
            <NextImage width={114} height={38} src='/images/logo-purple.svg' alt='flexibble' />
            <p>
              Flexibble is the world&apos;s leading community for creatives to share, grow, and get
              hired.
            </p>
          </div>
          <div className={styles.footer__content}>
            {footerLinks.map((link) => (
              <FooterColumn key={link.title} links={link.links} title={link.title} />
            ))}
          </div>
          <div className={styles.footer__end}>
            <p>@ 2023 Flexibble. All rights reserved</p>
          </div>
        </footer>
      </Container>
    </div>
  );
}
export default Footer;
