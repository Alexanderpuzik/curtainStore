import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { Row } from 'react-bootstrap';
import CurtainItem from './CurtainItem';

const CurtainList = observer(() => {
  const { curtain } = useContext(Context);

  return (
    <Row className="d-flex">
      {curtain.curtains.map(curtain => (
        <CurtainItem key={curtain.id} curtain={curtain} />
      ))}
    </Row>
  );
});

export default CurtainList;
