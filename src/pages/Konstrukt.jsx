import React, { useEffect, useState } from 'react';
import './Konstrukt.css'; // Убедитесь, что этот файл существует
import image from '../assents/room.jpg';
import leftArrow from '../assents/left.png';
import rightArrow from '../assents/right.png';
import curtainBackground from './DMTX_0002.jpg';
import textileDefault from '../assents/white.jpg';
import curtainMask from '../assents/curtain.png';
import { fetchCurtain } from '../http/curtainApi';
import { Col, Row, Card, Image } from 'react-bootstrap';
const Konstrukt = () => {
  const [textile, setTextile] = useState(textileDefault);
  const [curtains, setCurtains] = useState([]);
  const [page, setPage] = useState(1);
  const styles = {
    curtainWrapper: {
      position: 'absolute',
      width: 700,
      height: 702,
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1,
      marginTop: 100,
    },
    room: {
      position: 'relative',
      margin: 'auto',
      width: 700,
      height: 'auto',
      borderRadius: 15,
      boxShadow: `
        inset -5px -5px 10px rgba(255, 255, 255, 0.7),
        inset 5px 5px 15px rgba(0, 0, 0, 0.2),
        5px 5px 15px rgba(0, 0, 0, 0.1)
      `,
      backgroundColor: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 0,
      marginTop: 20,
    },
    image: {
      width: '100%',
      height: 'auto',
      display: 'block',
      borderRadius: 15,
    },
    curtainContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `url(${textile})`,
      backgroundSize: '70px 70px',
      backgroundRepeat: 'repeat',
      WebkitMaskImage: `url(${curtainMask})`,
      WebkitMaskSize: 'cover',
      WebkitMaskRepeat: 'no-repeat',
      WebkitMaskPosition: 'center',
      zIndex: 0,
    },
    curtainShadow: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `url(${curtainMask})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      filter: 'contrast(150%) opacity(0.4)',
      zIndex: 1,
    },
    justifyContentCenter: {
      width: 800,
      margin: 'auto',
    },
    arrowStyle: {
      cursor: 'pointer',
      width: '30px',
      margin: '0 10px', // Центрирование стрелок
    },
  };
  const handleLeftArrowClick = () => {
    if (page > 1) {
      setPage(page - 1);
    } else {
      setPage(page);
    }
  };

  const handleRightArrowClick = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    fetchCurtain(null, null, page, 4).then(data => {
      setCurtains(data.rows);
    });
  }, [page]);

  const handleTextileChange = path => {
    setTextile(path);
  };
  return (
    <div>
      <div className="room" style={styles.room}>
        <img src={image} className="image" style={styles.image}></img>
      </div>
      <div className="curtain-wrapper" style={styles.curtainWrapper}>
        <div
          className="curtain-container"
          style={styles.curtainContainer}
        ></div>
        <div className="curtain-shadow" style={styles.curtainShadow}></div>
      </div>
      <div className="d-flex align-items-center justify-content-center position-relative a">
        <img
          src={leftArrow}
          alt="Left Arrow"
          className="arrow-left"
          style={{ cursor: 'pointer', width: '30px', marginLeft: '10px' }}
          onClick={() => handleLeftArrowClick()} // Функция клика на левую стрелку
        />
        <Row
          className="justify-content-center"
          style={styles.justifyContentCenter}
        >
          {curtains.map(curtain => (
            <Col md={3} key={curtain.id} className="mx-2">
              {' '}
              {/* Добавлен класс mx-2 */}
              <Card
                style={{ width: 150, cursor: 'pointer' }}
                className="card-custom"
                border={'light'}
                onClick={() =>
                  handleTextileChange(
                    `${process.env.REACT_APP_API_URL}/${curtain.img}`
                  )
                }
              >
                <Image
                  width={150}
                  height={150}
                  src={`${process.env.REACT_APP_API_URL}/${curtain.img}`}
                  className="img-custom"
                />
              </Card>
            </Col>
          ))}
        </Row>
        <img
          src={rightArrow}
          alt="Right Arrow"
          className="arrow-right"
          style={{ cursor: 'pointer', width: '30px', marginRight: '10px' }}
          onClick={() => handleRightArrowClick()} // Функция клика на правую стрелку
        />
      </div>
    </div>
  );
};

export default Konstrukt;
