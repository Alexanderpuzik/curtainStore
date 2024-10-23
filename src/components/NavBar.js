import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import { Context } from '../index';
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  CATALOG_ROUTE,
  MAIN_ROUTE,
  KONSTRUKT_ROUTE,
} from '../utils/consts';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import Konstrukt from '../pages/Konstrukt';

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
  };

  return (
    <Navbar
      style={{
        backgroundColor: '#000000',
        marginTop: '20px',
        height: '60px', // Увеличенная высота
        padding: '0.75rem', // Немного увеличенный отступ
      }}
    >
      <Container>
        <Nav className="ml-auto">
          <NavLink
            className="ms-2"
            style={{ color: '#FFC107', fontSize: '1rem' }} // Средний размер шрифта
            to={MAIN_ROUTE}
          >
            Главная
          </NavLink>
          <NavLink
            className="ms-2"
            style={{ color: '#FFC107', fontSize: '1rem' }} // Средний размер шрифта
            to={CATALOG_ROUTE}
          >
            Каталог
          </NavLink>
          <NavLink
            className="ms-2"
            style={{ color: '#FFC107', fontSize: '1rem' }} // Средний размер шрифта
            to={KONSTRUKT_ROUTE}
          >
            Конструктор
          </NavLink>
        </Nav>
        {user.isAuth ? (
          <Nav className="ml-auto" style={{ color: '#FFC107' }}>
            <Button
              variant={'outline-warning'}
              onClick={() => navigate(ADMIN_ROUTE)}
              className="me-2"
              size="sm"
              style={{ fontSize: '0.9rem' }} // Средний размер шрифта
            >
              Админ панель
            </Button>
            <Button
              variant={'outline-warning'}
              className="ms-2"
              onClick={logOut}
              size="sm"
              style={{ fontSize: '0.9rem' }} // Средний размер шрифта
            >
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto" style={{ color: '#FFC107' }}>
            <Button
              variant={'outline-warning'}
              onClick={() => navigate(LOGIN_ROUTE)}
              size="sm"
              style={{ fontSize: '0.9rem' }} // Средний размер шрифта
            >
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
