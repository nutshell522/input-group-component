import React, { useState, useEffect, useCallback } from 'react';
import AgeGroupPriceSettings from './AgeGroupPriceSettings';
import { Col, Row } from 'react-bootstrap';
import IconButton from '../common/IconButton';
import { getNumberIntervals } from '../../utils/dataHandler';

// 年齡區間價格輸入框的群組
const AgeGroupPriceList = ({ onChange }) => {
  // 輸入框群組的值，output。格式：[{ageGroup: [0, 0], price: 0}, ...]
  const [ageGroupPriceValues, setAgeGroupPriceValues] = useState([
    { ageGroup: ['', ''], price: 0 },
  ]);
  // 重疊的年齡區間
  const [agesOverlap, setAgesOverlap] = useState([]);
  // 未包含的年齡區間
  const [agesNotInclude, setAgesNotInclude] = useState([]);
  // 控制年齡區間選擇是否禁用
  const [itemsAgeDisabled, setItemsAgeDisabled] = useState([false]);

  useEffect(() => {
    if (onChange) {
      onChange(ageGroupPriceValues);
    }

    // 檢查年齡範圍
    // 1. 保證至少傳入一個空陣列
    // 2. 只檢查皆有值的年齡區間
    let rangeList = ageGroupPriceValues
      .filter((item) => item.ageGroup[0] !== '' && item.ageGroup[1] !== '')
      .map((item) => item.ageGroup);

    rangeList = rangeList.length === 0 ? [[]] : rangeList;
    const { overlap, notInclude } = getNumberIntervals(rangeList);
    setAgesOverlap(overlap);
    setAgesNotInclude(notInclude);
  }, [ageGroupPriceValues, onChange]);

  const handleAddClick = useCallback(() => {
    setAgeGroupPriceValues((prevValue) => [...prevValue, { ageGroup: ['', ''], price: 0 }]);
    // 年齡全都包含時，新增時禁用年齡區間選擇
    setItemsAgeDisabled((prevValue) => [...prevValue, agesNotInclude.length === 0]);
  }, [agesNotInclude.length]);

  const handleRemoveClick = useCallback((removeIndex) => {
    setAgeGroupPriceValues((prevValues) => prevValues.filter((_, index) => index !== removeIndex));
    setItemsAgeDisabled((prev) => prev.filter((_, index) => index !== removeIndex));
  }, []);

  const handleOnChange = useCallback((changeIndex, value) => {
    setAgeGroupPriceValues((prevValues) =>
      prevValues.map((item, index) => (index === changeIndex ? { ...item, ...value } : item))
    );
  }, []);

  // 有未包含的年齡區間時，解鎖所有年齡區間選擇
  useEffect(() => {
    if (agesNotInclude.length !== 0) {
      setItemsAgeDisabled((prev) => prev.map(() => false));
    }
  }, [agesNotInclude.length]);

  return (
    <>
      {ageGroupPriceValues.map((item, index) => (
        <AgeGroupPriceSettings
          key={index}
          index={index}
          value={item}
          onChange={(value) => handleOnChange(index, value)}
          onRemove={() => handleRemoveClick(index)}
          agesOverlap={agesOverlap}
          agesNotInclude={agesNotInclude}
          ageDisabled={itemsAgeDisabled[index]}
        />
      ))}
      <Row className="mt-3">
        <Col className="d-flex justify-content-start align-items-center">
          <IconButton
            type="plus"
            onClick={handleAddClick}
            label="新增價格設定"
            className="text-primary add-button"
          />
        </Col>
      </Row>
    </>
  );
};

export default AgeGroupPriceList;
