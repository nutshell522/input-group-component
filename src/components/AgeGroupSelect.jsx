import { InputGroup } from 'react-bootstrap';
import { useState } from 'react';
import AgeSelect from './AgeSelect'; // 引入剛剛抽出的 AgeSelect 組件
import Error from './Error'; // 引入 Error 組件
import InputTitle from './InputTitle'; // 引入 InputTitle 組件

const AgeGroupSelect = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [startAge, setStartAge] = useState('');
  const [endAge, setEndAge] = useState('');

  const handleStartAgeChange = (e) => {
    const value = e.target.value ? parseInt(e.target.value, 10) : '';
    setStartAge(value);
  };

  const handleEndAgeChange = (e) => {
    const value = e.target.value ? parseInt(e.target.value, 10) : '';
    setEndAge(value);
  };

  return (
    <>
      <InputTitle title="年齡" />
      <InputGroup size="lg">
        {/* 開始年齡選擇 */}
        <AgeSelect
          label="Start Age"
          value={startAge}
          onChange={handleStartAgeChange}
          placeholder="請選擇開始年齡"
          disableCondition={(age) => endAge !== '' && age > endAge} // 動態禁用大於結束年齡的選項
        />

        <InputGroup.Text>～</InputGroup.Text>

        {/* 結束年齡選擇 */}
        <AgeSelect
          label="End Age"
          value={endAge}
          onChange={handleEndAgeChange}
          placeholder="請選擇結束年齡"
          disableCondition={(age) => startAge !== '' && age < startAge} // 動態禁用小於開始年齡的選項
        />
      </InputGroup>
      <Error error={error} errorMessage={errorMessage} />
    </>
  );
};

export default AgeGroupSelect;
