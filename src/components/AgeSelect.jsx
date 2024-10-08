import React from 'react';
import { Form } from 'react-bootstrap';

// 年齡選擇組件
const AgeSelect = ({
  error,
  label,
  value,
  onChange,
  options = null,
  placeholder,
  disableCondition,
  className,
}) => {
  // 預設選項為 0 到 20 歲
  if (!options) {
    options = [...Array(21).keys()];
  }

  return (
    <>
      <Form.Select
        className={`py-4 ${className} ${error ? 'is-invalid' : ''}`}
        aria-label={label}
        value={value}
        onChange={onChange}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((age) => (
          <option key={age} value={age} disabled={disableCondition(age)}>
            {age}
          </option>
        ))}
      </Form.Select>
    </>
  );
};

export default AgeSelect;
