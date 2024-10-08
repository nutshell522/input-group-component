import React from 'react';
import { Row, Col } from 'react-bootstrap';
import AgeGroupSelect from './AgeGroupSelect';
import PriceInput from './PriceInput';

const InfoInputGroup = ({ index }) => {
  return (
    <>
      <Row className="my-4">
        <Col className="text-start">
          <h3>{`價格設定 - ${index}`}</h3>
        </Col>
      </Row>
      <Row>
        {/* 年齡區間選擇 */}
        <Col>
          <AgeGroupSelect />
        </Col>
        {/* 金額輸入 */}
        <Col>
          <PriceInput />
        </Col>
      </Row>
    </>
  );
};

export default InfoInputGroup;
