import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';
import { addComma } from '../utils/dataHandler';
import Error from './Error';
import InputTitle from './InputTitle'; // Add this line to import InputTitle

// 價格輸入元件
const PriceInput = ({ value, onChange }) => {
  const [price, setPrice] = useState(value || '');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 處理輸入變更
  const handleChange = (e) => {
    const value = e.target.value.replace(/,/g, ''); // 去掉千分位逗號，獲得原始數字

    // 支持負數和小數點的正則表達式
    if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
      setPrice(value); // 保留未格式化的數字
      setError(false);
      if (onChange) onChange(value); // 將未格式化的原始數字傳遞回父組件
    } else {
      setError(true);
      setErrorMessage('請輸入合法的數字');
    }
  };

  // 處理輸入框失焦時進行格式化
  const handleBlur = () => {
    if (price) {
      setPrice(addComma(price)); // 輸入框失焦後進行格式化
    }
  };

  // 重新聚焦時，將格式化的數字恢復為未格式化狀態
  const handleFocus = () => {
    setPrice(price.replace(/,/g, '')); // 去掉格式化的千分位
  };

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
