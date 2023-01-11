import classNames from 'classnames';
import Button from 'components/Button';
import { IconClose, IconCloseLg } from 'components/icon';
import React, {
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { searchUser } from 'services/user';
import { TypeOnClickBtn } from '../Button/index';

interface ModalPopupProps {
  visible?: boolean;
  children: ReactNode;
  className?: string;
  btnClose?: boolean;
  onClickOverlay?: TypeOnClickBtn;
  onClickBtnClose?: TypeOnClickBtn;
}

export default memo(function ModalPopup(props: ModalPopupProps) {
  const {
    visible = false,
    children,
    className,
    btnClose,
    onClickOverlay,
    onClickBtnClose,
  } = props;

  return (
    <div>
      <div
        className={classNames(
          'fixed top-0 left-0 right-0 bottom-0 z-[99999] transition-all duration-200 ease-linear ',
          visible ? '' : '!z-[-100]'
        )}
      >
        <div className="h-full">
          <div
            className={classNames(
              'absolute top-1/2 left-1/2 -translate-x-1/2 max-w-[500px] w-full -translate-y-1/2 z-[999999] transition-all duration-200 ease-linear bg-white shadow-[rgba(50,50,93,0.25)_0px_13px_27px_-5px,rgba(0,0,0,0.3)_0px_8px_16px_-8px] rounded-[8px]',
              visible ? 'opacity-100' : 'opacity-0',
              className
            )}
          >
            {children}
            {btnClose && (
              <Button
                overlay
                rounded
                center
                onClick={onClickBtnClose}
                className="bgImg-color-secondary !absolute top-3 right-3 w-[36px] h-[36px]"
              >
                <IconCloseLg />
              </Button>
            )}
          </div>
        </div>
        <div
          className={classNames(
            'bg-overlayAlpha80 absolute z-[10000] top-0 right-0 bottom-0 left-0 transition-all duration-200 ease-linear',
            visible ? 'opacity-100' : 'opacity-0'
          )}
          onClick={onClickOverlay}
        ></div>
      </div>
    </div>
  );
});
