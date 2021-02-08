import { Dayjs } from 'dayjs';

import * as React from 'react';
import DatePicker from './DatePicker';
import { PickerTimeProps, RangePickerTimeProps } from 'antd/es/date-picker/generatePicker';
import { Omit } from 'antd/es/_util/type';

const { TimePicker: InternalTimePicker, RangePicker: InternalRangePicker } = DatePicker;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TimeRangePickerProps extends RangePickerTimeProps<Dayjs> {}

const RangePicker = React.forwardRef<any, TimeRangePickerProps>((props, ref) => {
  return <InternalRangePicker {...props} picker="time" mode={undefined} ref={ref} />;
});

export interface TimePickerProps extends Omit<PickerTimeProps<Dayjs>, 'picker'> {
  addon?: () => React.ReactNode;
}

const TimePicker = React.forwardRef<any, TimePickerProps>(
  // eslint-disable-next-line react/prop-types
  ({ addon, renderExtraFooter, ...restProps }, ref) => {
    const internalRenderExtraFooter = React.useMemo(() => {
      if (renderExtraFooter) {
        return renderExtraFooter;
      }
      if (addon) {
        return addon;
      }
      return undefined;
    }, [addon, renderExtraFooter]);

    return (
      <InternalTimePicker
        {...restProps}
        mode={undefined}
        ref={ref}
        renderExtraFooter={internalRenderExtraFooter}
      />
    );
  }
);

TimePicker.displayName = 'TimePicker';

type MergedTimePicker = typeof TimePicker & {
  RangePicker: typeof RangePicker;
};

(TimePicker as MergedTimePicker).RangePicker = RangePicker;

export default TimePicker as MergedTimePicker;
