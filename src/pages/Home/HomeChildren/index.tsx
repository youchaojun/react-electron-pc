import React, { ReactElement } from 'react';
import { Select } from 'antd';

const { Option } = Select;
export default function HomeChildren(): ReactElement {
  const handleChange = (val: string, option: any) => {
    console.log(val);
    console.log(option);
  };
  const option = [
    { id: 1, value: 'jack', name: '试试' },
    { id: 2, value: 'wds', name: '试试' },
    { id: 3, value: 'df', name: '试试' },
  ];
  return (
    <div className="container-padding">
      <div>首页的子页面</div>
      <p>首页的子页面</p>
      <p>首页的子页面</p>
      <p>首页的子页面</p>
      <p>首页的子页面</p>
      <Select defaultValue="lucy" onChange={handleChange}>
        {option.map((val) => (
          <Option key={val.id} data={val} value={val.id}>
            {val.value}
          </Option>
        ))}
      </Select>
    </div>
  );
}
