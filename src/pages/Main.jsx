import React, { useEffect, useState } from 'react';
import './Main.css';
import { fetchCurtain } from '../http/curtainApi';
import { Col, Row, Image, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CURTAIN_ROUTE } from '../utils/consts';
import number from '../assents/number.png';
import email from '../assents/email.png';
import { change } from '../http/userAPI';

const Main = () => {
  const subscriptions = [
    {
      name: 'Базовая',
      price: '500₽',
      duration: '1 месяц',
      reasons: ['Безграничное публикование', 'Выплаты без комиссий'],
    },
    {
      name: 'Стандартная',
      price: '1000₽',
      duration: '3 месяца',
      reasons: ['Безграничное публикование', 'Выплаты без комиссий'],
    },
    {
      name: 'Премиум',
      price: '1500₽',
      duration: '12 месяцев',
      reasons: ['Безграничное публикование', 'Выплаты без комиссий'],
    },
  ];

  const subscriptionsSeamstress = [
    {
      name: 'Базовая',
      price: '500₽',
      duration: '1 месяц',
      reasons: ['Удобные вазимоотношения', 'Выплаты без комиссий'],
    },
    {
      name: 'Стандартная',
      price: '1000₽',
      duration: '3 месяца',
      reasons: ['Удобные вазимоотношения', 'Выплаты без комиссий'],
    },
    {
      name: 'Премиум',
      price: '1500₽',
      duration: '12 месяцев',
      reasons: ['Удобные вазимоотношения', 'Выплаты без комиссий'],
    },
  ];

  const navigate = useNavigate();
  const [curtains, setCurtains] = useState([]);

  useEffect(() => {
    fetchCurtain(null, null, 1, 8).then(data => setCurtains(data.rows));
  }, []);

  const handleChangeAndRefresh = async () => {
    try {
      await change();
      window.location.reload(); // Refresh the page after change
    } catch (error) {
      console.error('Error updating subscription:', error);
    }
  };

  return (
    <div className="container">
      <div className="about-section">
        <h3>О нас</h3>
        <div className="about-description">
          Мы — команда студентов, стремящаяся к инновациям и качеству в каждой
          детали. Наша миссия — предоставлять лучшие решения.
        </div>
      </div>

      <h3>Лучшие варианты</h3>
      <Row>
        {curtains.map(curtain => (
          <Col
            md={3}
            key={curtain.id}
            className="d-flex align-items-center justify-content-center"
          >
            <Image
              className="image-rounded"
              width={300}
              height={250}
              src={`${process.env.REACT_APP_API_URL}/${curtain.img}`}
              alt={curtain.name}
              onClick={() => navigate(CURTAIN_ROUTE + '/' + curtain.id)}
            />
          </Col>
        ))}
      </Row>

      <div className="vendor-section">
        <h3>Для продавцов</h3>
        <Row>
          {subscriptions.map((subscription, index) => (
            <Col
              md={4}
              key={index}
              className="d-flex justify-content-center align-items-center"
              style={{ height: '350px' }}
            >
              <div className="subscription-card d-flex flex-column w-100 h-100">
                <div className="subscription-title">{subscription.name}</div>
                <div className="subscription-price">
                  {subscription.price}/{subscription.duration}
                </div>
                <ul className="subscription-list">
                  {subscription.reasons.map((reason, idx) => (
                    <li key={idx}>- {reason}</li>
                  ))}
                </ul>
                <Button
                  className="subscription-button"
                  onClick={handleChangeAndRefresh}
                >
                  Купить подписку
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <div className="tailor-section">
        <h3>Для портных</h3>
        <Row>
          {subscriptionsSeamstress.map((subscriptionsSeamstress, index) => (
            <Col
              md={4}
              key={index}
              className="d-flex justify-content-center align-items-center"
              style={{ height: '350px' }}
            >
              <div className="subscription-card d-flex flex-column w-100 h-100">
                <div className="subscription-title">
                  {subscriptionsSeamstress.name}
                </div>
                <div className="subscription-price">
                  {subscriptionsSeamstress.price}/
                  {subscriptionsSeamstress.duration}
                </div>
                <ul className="subscription-list">
                  {subscriptionsSeamstress.reasons.map((reason, idx) => (
                    <li key={idx}>- {reason}</li>
                  ))}
                </ul>
                <Button className="subscription-button">Купить подписку</Button>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <h3>Контакты</h3>
      <Row className="align-items-center">
        <Col md={2} className="text-center">
          <Image src={number} alt="Phone" className="contact-image" />
        </Col>
        <Col md={4} className="contact-info">
          +79045768923
        </Col>
        <Col md={2} className="text-center">
          <Image src={email} alt="Email" className="contact-image" />
        </Col>
        <Col md={4} className="contact-info">
          InfinityTech@gmail.com
        </Col>
      </Row>
    </div>
  );
};

export default Main;
