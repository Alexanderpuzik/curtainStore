import React, { useContext, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import CurtainList from '../components/CurtainList';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchBrand, fetchCurtain, fetchType } from '../http/curtainApi';
import Pages from '../components/Pages';

const Catalog = observer(() => {
  const { curtain } = useContext(Context);
  useEffect(() => {
    fetchType().then(data => curtain.setTypes(data));
    fetchBrand().then(data => curtain.setBrands(data));
    fetchCurtain(null, null, 1, 3).then(data => {
      curtain.setCurtains(data.rows);
      curtain.setTotalCount(data.count);
    });
  }, []);

  useEffect(() => {
    fetchCurtain(
      curtain.selectedType.id,
      curtain.selectedBrand.id,
      curtain.page,
      9
    ).then(data => {
      curtain.setCurtains(data.rows);
      curtain.setTotalCount(data.count);
    });
  }, [curtain.page, curtain.selectedType, curtain.selectedBrand]);

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <CurtainList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
});

export default Catalog;
