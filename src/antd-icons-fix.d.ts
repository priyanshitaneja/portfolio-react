// Fix for @ant-design/icons type incompatibility with @types/react@18
// See: https://github.com/ant-design/ant-design-icons/issues/632
import type {} from 'react';

declare module '@ant-design/icons/lib/components/AntdIcon' {
  import type { ForwardRefExoticComponent, RefAttributes } from 'react';
  interface AntdIconProps {
    onPointerEnterCapture?: unknown;
    onPointerLeaveCapture?: unknown;
  }
}
