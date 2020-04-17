import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export default function LoadingIndicator(props) {
  const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin/>;
  return (
    <Spin indicator={antIcon} style={{
      display: 'block',
      textAlign: 'center',
      marginTop: 30
    }}/>
  );
}