import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { Context } from "../index";
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  CATALOG_ROUTE,
  MAIN_ROUTE,
} from "../utils/consts";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
  };

  return (
    <Navbar style={{ backgroundColor: "#000000", marginTop: "20px" }}>
      <Container>
        <Nav className="ml-auto">
          <NavLink className="ms-2" style={{ color: "white" }} to={MAIN_ROUTE}>
            Главная
          </NavLink>
          <NavLink
            className="ms-2"
            style={{ color: "white" }}
            to={CATALOG_ROUTE}
          >
            Каталог
          </NavLink>
        </Nav>
        {user.isAuth ? (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => navigate(ADMIN_ROUTE)}
            >
              Админ панель
            </Button>
            <Button variant={"outline-light"} className="ms-2" onClick={logOut}>
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => navigate(LOGIN_ROUTE)}
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
