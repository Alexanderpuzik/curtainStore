import React, { useContext, useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  CATALOG_ROUTE,
} from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { observer } from 'mobx-react';
import { Context } from '..';

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  const evaluatePasswordStrength = password => {
    let strength = 'Очень слабый';
    if (password.length >= 8) {
      strength = 'Слабый';
    }
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) {
      strength = 'Средний';
    }
    if (
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    ) {
      strength = 'Сильный';
    }
    if (
      password.length >= 12 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    ) {
      strength = 'Очень сильный';
    }
    return strength;
  };

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(user);
      user.setIsAuth(true);
      navigate(CATALOG_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  const handlePasswordChange = event => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setPasswordStrength(evaluatePasswordStrength(newPassword));
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Введите ваш email..."
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Введите ваш пароль..."
            value={password}
            onChange={handlePasswordChange}
            type="password"
          />
          <div className="mt-1 text-muted">
            Надежность пароля: <strong>{passwordStrength}</strong>
          </div>
          <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
            <Col md={9}>
              {isLogin ? (
                <div>
                  Нет аккаунта?{' '}
                  <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                </div>
              ) : (
                <div>
                  Есть аккаунт?
                  <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                </div>
              )}
            </Col>
            <Col md={3}>
              <Button variant={'outline-success'} onClick={click}>
                {isLogin ? 'Войти' : 'Регистрация'}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
