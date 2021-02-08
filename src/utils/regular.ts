//  手机号码验证
export const phoneReg = /^1[3456789]\d{9}$/;

// 邮箱验证
export const mailReg =
  // eslint-disable-next-line
  /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;

// 身份证验证
export const idCardReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

// number验证
export const numberReg = /^[0-9]*$/;

// 座机规则
export const telePhoneReg = /0\d{2,3}-[1-9]\d{6,7}/;

// 座机和手机的校验
export const allPhoneReg = /0\d{2,3}-[1-9]\d{6,7}|^1[3456789]\d{9}$/;

// 钱校验（正数 两位小数）
export const moneyReg = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
