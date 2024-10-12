import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  Row,
  ListGroup,
} from 'react-bootstrap';
import bigStar from '../assents/bigStar.png';
import { useParams } from 'react-router-dom';
import { fetchOneCurtain } from '../http/curtainApi';

const CurtainPage = () => {
  const [curtain, setCurtain] = useState({ info: [] });
  const { id } = useParams();

  useEffect(() => {
    fetchOneCurtain(id).then(data => setCurtain(data));
  }, []);

  return (
    <Container className="mt-3">
      <Card
        style={{
          maxWidth: '800px',
          margin: '0 auto', // Центрирование карточки в контейнере
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
          borderRadius: '15px',
          backgroundColor: '#fff',
          padding: '20px',
        }}
      >
        <Row>
          {/* Левая колонка с изображением */}
          <Col
            md={5}
            className="d-flex justify-content-center align-items-start"
          >
            <Image
              width={250}
              height={250}
              src={process.env.REACT_APP_API_URL + '/' + curtain.img}
              style={{
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '15px',
                marginBottom: '20px',
              }}
            />
          </Col>

          {/* Центральная колонка с основной информацией */}
          <Col
            md={7}
            className="d-flex flex-column justify-content-center align-items-center text-center" // Центрирование контента
          >
            <h2 className="mb-4">{curtain.name}</h2>
            <div
              className="mx-auto mb-4"
              style={{
                background: `url(${bigStar}) no-repeat center center`,
                width: 80,
                height: 80,
                backgroundSize: 'contain',
                fontSize: 24,
                color: '#444',
                borderRadius: '50%',
                boxShadow:
                  'inset 0 4px 6px rgba(0, 0, 0, 0.1), inset 0 -4px 6px rgba(0, 0, 0, 0.05)',
                textAlign: 'center',
                lineHeight: '80px',
              }}
            >
              {curtain.rating || 0}
            </div>
            <h4 className="mb-4">
              От: {curtain.price} руб/м<sup>2</sup>
            </h4>
            <Button variant="dark" style={{ width: '100%' }}>
              Купить
            </Button>
          </Col>
        </Row>

        {/* Нижняя часть с дополнительной информацией */}
        <Row className="mt-4">
          <Col>
            <ListGroup>
              {curtain.info.map((info, index) => (
                <ListGroup.Item
                  key={info.id}
                  style={{
                    background: index % 2 === 0 ? 'lightgray' : 'transparent',
                    borderRadius: '10px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <strong>{info.title}</strong>: {info.description}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default CurtainPage;
