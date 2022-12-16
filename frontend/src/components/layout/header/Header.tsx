import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Logo } from './logo';
import { Account } from './account';
import styles from './Header.module.scss';


const pages = ['Home', 'Mine', 'Audit', 'Upload', 'Search'];

type Props = {
  isAccountVisible: boolean;
};

function Header({ isAccountVisible }: Props) {
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Logo />
            <Box sx={{ flexGrow: 3, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  sx={{ m: 2, color: 'white', display: 'block' }}
                  onClick={() => navigate(`/${page}`)}
                >
                  {page}
                </Button>
              ))}
            </Box>
            {isAccountVisible && <Account />}
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );

}

export { Header };
