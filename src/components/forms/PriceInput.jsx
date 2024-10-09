import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState, useEffect } from 'react';
import { addComma } from '../../utils/dataHandler';
import InputTitle from '../common/InputTitle';
import Error from '../common/Error';

// 價格輸入元件
const PriceInput = ({ value, onChange }) => {
  const [price, setPrice] = useState(value || '');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [onFocus, setOnFocus] = useState(false);

  // TODO 開頭不可為0

  // 欄位驗證
  useEffect(() => {
    // 價格不可為空
    if (price === '') {
      setError(true);
      setErrorMessage('不可以為空白');
    } else {
      setError(false);
      setErrorMessage('');
    }
  }, [price]);

  // 處理輸入變更
  const handleChange = (e) => {
    if (onChange) onChange(e.target.value);
  };

  const handleBlur = () => {
    setOnFocus(false);
  };

  const handleFocus = () => {
    setOnFocus(true);
  };

  useEffect(() => {
    if (!onFocus) {
      // 輸入框失焦時格式化 (加上千分位逗號)
      setPrice(addComma(value));
    } else {
      // 重新聚焦時，將格式化的數字恢復為未格式化狀態
      setPrice(value.toString().replace(/,/g, ''));
    }
  }, [onFocus, value]);

  return (
    <>
      <InputTitle title="入住費用(每人每晚)" />
      <InputGroup size="lg">
        <InputGroup.Text>TWD</InputGroup.Text>
        <Form.Control
          className={`py-4 ${error ? 'is-invalid' : ''}`} // 錯誤時樣式
          placeholder="請輸入費用"
          aria-label="TWD"
          value={price}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
      </InputGroup>
      <Error error={error} errorMessage={errorMessage} />
      <p className="w-100 text-secondary text-end fs-5 mt-1">輸入0表示免費</p>
    </>
  );
};

export default PriceInput;
