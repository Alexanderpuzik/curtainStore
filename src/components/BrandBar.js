import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { Card, Col, Row } from 'react-bootstrap';

const BrandBar = observer(() => {
  const { curtain } = useContext(Context);

  return (
    <Row className="d-flex">
      {curtain.brands.map(brand => (
        <Col md={3}>
          <Card
            style={{ cursor: 'pointer' }}
            key={brand.id}
            className="p-3"
            onClick={() => curtain.setSelectedBrand(brand)}
            border={brand.id === curtain.selectedBrand.id ? 'danger' : 'light'}
          >
            {brand.name}
          </Card>
        </Col>
      ))}
    </Row>
  );
});

export default BrandBar;
