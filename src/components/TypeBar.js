import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { Card, Col, Row } from 'react-bootstrap';

const TypeBar = observer(() => {
  const { curtain } = useContext(Context);

  return (
    <Row>
      {curtain.types.map(type => (
        <Col md={3} key={type.id}>
          {' '}
          <Card
            style={{
              cursor: 'pointer',
              textAlign: 'center',
              fontWeight: 'bold',
              padding: '1rem',
              border: 'none',
              display: 'flex',
              justifyContent: 'center', // Центрирует содержимое horizontally
              alignItems: 'center', // Центрирует содержимое vertically
            }}
            className="p-1"
            onClick={() => curtain.setSelectedType(type)} // Обновляем функцию выбора типа
          >
            <span
              style={{
                borderBottom:
                  type.id === curtain.selectedType.id // Проверка для selectedType
                    ? '4px solid #FFC107'
                    : 'none',
                lineHeight: '1', // Устраняем лишний вертикальный отступ
              }}
            >
              {type.name}
            </span>
          </Card>
        </Col>
      ))}
    </Row>
  );
});

export default TypeBar;
