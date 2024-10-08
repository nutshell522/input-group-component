import React from 'react';
import { Card } from 'react-bootstrap';

// 錯誤提示框
const Error = ({ error, errorMessage }) => {
  return (
    <>
      {error && (
        <Card className="text-bg-error w-100 text-start px-3 py-1" size="sm">
          {errorMessage}
        </Card>
      )}
    </>
  );
};

export default Error;
