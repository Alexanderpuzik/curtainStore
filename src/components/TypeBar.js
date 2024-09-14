import React, { useContext } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import ListGroup from "react-bootstrap/ListGroup";

const TypeBar = observer(() => {
  const { curtain } = useContext(Context);
  return (
    <ListGroup>
      {curtain.types.map((type) => (
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          active={type.id === curtain.selectedType.id}
          onClick={() => curtain.setSelectedType(type)}
          key={type.id}
        >
          {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default TypeBar;
