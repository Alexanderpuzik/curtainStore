import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import {
  Button,
  Col,
  Dropdown,
  DropdownItem,
  Form,
  Row,
} from "react-bootstrap";
import { Context } from "../..";
import { createCurtain, fetchBrand, fetchType } from "../../http/curtainApi";
import { observer } from "mobx-react-lite";

const CreateCurtain = observer(({ show, onHide }) => {
  const { curtain } = useContext(Context);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetchType().then((data) => curtain.setTypes(data));
    fetchBrand().then((data) => curtain.setBrands(data));
  }, []);

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };

  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };

  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const addCurtain = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("img", file);
    formData.append("brandId", curtain.selectedBrand.id);
    formData.append("typeId", curtain.selectedType.id);
    formData.append("info", JSON.stringify(info));
    createCurtain(formData).then((data) => onHide());
  };
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить устройство
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {curtain.selectedType.name || "Выберите тип"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {curtain.types.map((type) => (
                <Dropdown.Item
                  onClick={() => curtain.setSelectedType(type)}
                  key={type.id}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {curtain.selectedBrand.name || "Выберите бренд"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {curtain.brands.map((brand) => (
                <Dropdown.Item
                  onClick={() => curtain.setSelectedBrand(brand)}
                  key={brand.id}
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="mt-3"
            placeholder="Введите название устройства"
          />

          <Form.Control
            value={price}
            onChange={(e) => {
              setPrice(Number(e.target.value));
            }}
            className="mt-3"
            placeholder="Введите стоимость устройства"
          />

          <Form.Control className="mt-3" type="file" onChange={selectFile} />
          <hr />
          <Button variant={"outline-dark"} onClick={addInfo}>
            Добавить новое свойство
          </Button>
          {info.map((i) => (
            <Row className="mt-2" Key={i.number}>
              <Col md={4}>
                <Form.Control
                  value={i.title}
                  onChange={(e) =>
                    changeInfo("title", e.target.value, i.number)
                  }
                  placeholder="Введите название свойства"
                ></Form.Control>
              </Col>
              <Col md={4}>
                <Form.Control
                  value={i.desription}
                  onChange={(e) =>
                    changeInfo("description", e.target.value, i.number)
                  }
                  placeholder="Введите описание свойства"
                ></Form.Control>
              </Col>
              <Col>
                <Button
                  variant={"outline-danger"}
                  onClick={() => removeInfo(i.number)}
                >
                  Удалить
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addCurtain}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateCurtain;
