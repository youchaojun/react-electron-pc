import { numberReg } from './regular';
import locale from 'antd/lib/date-picker/locale/zh_CN';

// modal中form layout
export const modalFormLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

// 页面中一行的form 中的layout
export const normalFormLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 18 },
};

export const datePickerZn = locale;
// antd form正整数校验
export const PositiveNumber = [{ required: true, pattern: numberReg, message: '请输入正整数' }];
