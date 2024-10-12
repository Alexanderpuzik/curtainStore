import React, { useContext } from 'react';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import ListGroup from 'react-bootstrap/ListGroup';

const BrandBar = observer(() => {
  const { curtain } = useContext(Context);
  return (
    <ListGroup>
      {curtain.brands.map(brand => (
        <ListGroup.Item
          style={{
            cursor: 'pointer',
            backgroundColor:
              brand.id === curtain.selectedBrand.id ? '#FFC107' : '',
            fontWeight:
              brand.id === curtain.selectedBrand.id ? 'bold' : 'normal', // Сделать текст жирным
          }}
          onClick={() => curtain.setSelectedBrand(brand)}
          key={brand.id}
        >
          {brand.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default BrandBar;
