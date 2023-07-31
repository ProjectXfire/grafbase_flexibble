import styles from '../styles/Navbar.module.css';
import NextLink from 'next/link';
import NextImage from 'next/image';
import { getCurrentUser } from '../lib';
import { navLinks } from '../constants';
import { AuthProvider, Container, ProfileMenu } from '.';

async function Navbar(): Promise<JSX.Element> {
  const { data } = await getCurrentUser();

  return (
    <div className={styles['navbar-container']}>
      <Container>
        <nav className={styles.navbar}>
          <div className={styles.navbar__links}>
            <NextLink href='/'>
              <NextImage width={115} height={43} src='/images/logo.svg' alt='logo' />
            </NextLink>
            <ul>
              {navLinks.map((link) => (
                <NextLink key={link.key} href={link.href}>
                  {link.text}
                </NextLink>
              ))}
            </ul>
          </div>
          <div className={styles.navbar__actions}>
            {data ? (
              <ProfileMenu avatarUrl={data.user.avatarUrl ?? ''} userId={data.user.id} />
            ) : (
              <AuthProvider />
            )}
          </div>
        </nav>
      </Container>
    </div>
  );
}
export default Navbar;
