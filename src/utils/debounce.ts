import { useCallback, useEffect, useRef } from 'react';

/**
 * 防抖
 * @param fn 方法
 * @param delay 时间（毫秒）
 */
/* eslint-disable */
export const useDebounce = (fn: (args?: any) => void, delay: number): any => {
  const { current } = useRef<any>({ fn, timer: null });
  useEffect(
    function () {
      current.fn = fn;
    },
    [fn]
  );
  return useCallback(function f(...args: any[]) {
    if (current.timer) {
      clearTimeout(current.timer);
    }
    current.timer = setTimeout(() => {
      current.fn.call(useDebounce, ...args);
    }, delay);
    return false;
  }, []);
};

/**
 * 防抖
 * @param fn 方法
 * @param delay 时间（毫秒）
 */
/* eslint-disable */
export const debounce = (fn: (args?: any) => void, delay: number): any => {
  const { current } = useRef<any>({ fn, timer: null });
  useEffect(
    function () {
      current.fn = fn;
    },
    [fn]
  );
  return function f(...args: any[]) {
    if (current.timer) {
      clearTimeout(current.timer);
    }
    current.timer = setTimeout(() => {
      current.fn.call(useDebounce, ...args);
    }, delay);
  };
};
