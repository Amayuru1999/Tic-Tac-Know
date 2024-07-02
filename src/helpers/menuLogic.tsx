import { Dispatch, SetStateAction } from 'react';
import { MENU_STATUSES } from '../constants';

type SetState<T> = Dispatch<SetStateAction<T>>;

const handleResetClick = (setShowResetConfirm: SetState<boolean>): void => {
  setShowResetConfirm(true);
};

const handleResetCancel = (setShowResetConfirm: SetState<boolean>): void => {
  setShowResetConfirm(false);
};

const handleResetConfirmClick = (setShowResetConfirm: SetState<boolean>, handleResetGameData: () => void): void => {
  setShowResetConfirm(false);
  handleResetGameData();
};

const handleStartClick = (setMenuStatus: SetState<string>): void => {
  setMenuStatus('');
  setTimeout(() => {
    setMenuStatus(MENU_STATUSES.PICK_SIDE);
  }, 750);
};

const handleClickPrev = (menuStatus: string, setMenuStatus: SetState<string>): void => {
  if (menuStatus === MENU_STATUSES.PICK_SIDE) {
    setMenuStatus('');
    setTimeout(() => {
      setMenuStatus(MENU_STATUSES.START);
    }, 750);
  } else {
    setMenuStatus('');
    setTimeout(() => {
      setMenuStatus(MENU_STATUSES.PICK_SIDE);
    }, 750);
  }
};

const handleClickNext = (menuStatus: string, setMenuStatus: SetState<string>): void => {
  if (menuStatus === MENU_STATUSES.PICK_SIDE) {
    setMenuStatus('');
    setTimeout(() => {
      setMenuStatus(MENU_STATUSES.PICK_AI);
    }, 750);
  }
};

export {
  handleResetClick,
  handleResetCancel,
  handleResetConfirmClick,
  handleStartClick,
  handleClickPrev,
  handleClickNext,
};
