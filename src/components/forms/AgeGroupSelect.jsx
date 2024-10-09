import React, { useEffect, useState } from 'react';
import { InputGroup } from 'react-bootstrap';
import AgeSelect from './AgeSelect';
import InputTitle from '../common/InputTitle';
import Error from '../common/Error';

// 年齡區間選擇組件
const AgeGroupSelect = ({ startAge, endAge, setStartAge, setEndAge, agesOverlap, ageDisabled }) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 欄位驗證
  useEffect(() => {
    // 年齡區間是否有重疊
    const hasOverlap = agesOverlap.some(
      (age) => (age[0] <= startAge && age[1] >= startAge) || (age[0] <= endAge && age[1] >= endAge)
    );

    if (hasOverlap && startAge !== '' && endAge !== '') {
      setError(true);
      setErrorMessage('年齡區間不可重疊');
    } else {
      setError(false);
      setErrorMessage('');
    }
  }, [startAge, endAge, agesOverlap]);

  const handleAgeChange = (setter) => (e) => {
    const newValue = e.target.value ? parseInt(e.target.value, 10) : '';
    setter(newValue);
  };

  return (
    <>
      <InputTitle title="年齡" />
      <InputGroup size="lg">
        {/* 開始年齡選擇 */}
        <AgeSelect
          label="Start Age"
          onChange={handleAgeChange(setStartAge)}
          placeholder="請選擇開始年齡"
          value={startAge}
          error={error}
          disableCondition={(age) => ageDisabled || (endAge && age > endAge)}
        />

        <InputGroup.Text>～</InputGroup.Text>

        {/* 結束年齡選擇 */}
        <AgeSelect
          label="End Age"
          onChange={handleAgeChange(setEndAge)}
          placeholder="請選擇結束年齡"
          value={endAge}
          error={error}
          disableCondition={(age) => ageDisabled || (startAge && age < startAge)}
        />
      </InputGroup>
      <Error error={error} errorMessage={errorMessage} />
    </>
  );
};

export default AgeGroupSelect;
