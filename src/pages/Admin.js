import React, { useState } from 'react';
import { Button, Container, Card } from 'react-bootstrap';
import CreateBrand from '../components/modals/CreateBrand';
import CreateType from '../components/modals/CreateType';
import CreateCurtain from '../components/modals/CreateCurtain';

const Admin = () => {
  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [curtainVisible, setCurtainVisible] = useState(false);

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card
        style={{
          maxWidth: '400px',
          padding: '20px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
          borderRadius: '15px',
          backgroundColor: '#fff',
        }}
      >
        <div className="d-flex flex-column align-items-center">
          <Button
            variant={'outline-dark'}
            className="mt-4 p-2"
            style={{
              width: '100%',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
            }}
            onClick={() => setTypeVisible(true)}
          >
            Добавить тип
          </Button>
          <Button
            variant={'outline-dark'}
            className="mt-4 p-2"
            style={{
              width: '100%',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
            }}
            onClick={() => setBrandVisible(true)}
          >
            Добавить бренд
          </Button>
          <Button
            variant={'outline-dark'}
            className="mt-4 p-2"
            style={{
              width: '100%',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
            }}
            onClick={() => setCurtainVisible(true)}
          >
            Добавить ткань
          </Button>
        </div>
      </Card>

      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateCurtain
        show={curtainVisible}
        onHide={() => setCurtainVisible(false)}
      />
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
    </Container>
  );
};

export default Admin;
