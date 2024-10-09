import React from 'react';
import { Row, Col } from 'react-bootstrap';
import AgeGroupSelect from '../forms/AgeGroupSelect';
import PriceInput from '../forms/PriceInput';
import IconButton from '../common/IconButton';

// 年齡區間價格設定組件
const AgeGroupPriceSettings = ({ index, onRemove, onChange, value, agesOverlap, ageDisabled }) => {
  const currentIndex = index + 1; // 當前項目索引
  const isNotFirstItem = index !== 0; // 是否為第一個列表項目

  return (
    <>
      {isNotFirstItem && <hr />}
      <Row className="my-4">
        <Col className="text-start">
          <h3>{`價格設定 - ${currentIndex}`}</h3>
        </Col>
        {/* 非第一個列表項目顯示移除按鈕 */}
        {isNotFirstItem && (
          <Col className="text-end">
            <IconButton
              type="close"
              onClick={onRemove}
              label="移除"
              className="text-danger close-button"
            />
          </Col>
        )}
      </Row>
      <Row>
        {/* 年齡區間選擇 */}
        <Col>
          <AgeGroupSelect
            startAge={value.ageGroup[0]}
            endAge={value.ageGroup[1]}
            setStartAge={(startAge) =>
              onChange({ ...value, ageGroup: [startAge, value.ageGroup[1]] })
            }
            setEndAge={(endAge) => onChange({ ...value, ageGroup: [value.ageGroup[0], endAge] })}
            agesOverlap={agesOverlap}
            ageDisabled={ageDisabled}
          />
        </Col>
        {/* 金額輸入 */}
        <Col>
          <PriceInput value={value.price} onChange={(price) => onChange({ ...value, price })} />
        </Col>
      </Row>
    </>
  );
};

export default AgeGroupPriceSettings;
