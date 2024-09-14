import React, { useEffect, useState } from "react";
import { Col, Card, Image } from "react-bootstrap";
import star from "../assents/star.png";
import { useNavigate } from "react-router-dom";
import { CURTAIN_ROUTE } from "../utils/consts";
import { fetchBrand, fetchOneBrand } from "../http/curtainApi";

const CurtainItem = ({ curtain }) => {
  const [brand, setBrand] = useState("");
  useEffect(() => {
    fetchOneBrand(curtain.brandId).then((data) => setBrand(data.name));
  }, []);
  const navigate = useNavigate();
  console.log(
    `Путь к изображению: ${process.env.REACT_APP_API_URL + curtain.img}`
  );

  return (
    <Col
      md={3}
      className="mt-3"
      onClick={() => navigate(CURTAIN_ROUTE + "/" + curtain.id)}
    >
      <Card style={{ width: 150, cursor: "pointer" }} border={"light"}>
        <Image
          width={150}
          height={150}
          src={process.env.REACT_APP_API_URL + "/" + curtain.img}
        />
        <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
          <div>{brand}</div>
          <div className="d-flex align-items-center">{curtain.rating}</div>
          <Image width={20} height={20} src={star} />
        </div>
        <div>{curtain.name}</div>
      </Card>
    </Col>
  );
};

export default CurtainItem;
