import {
  Button,
  Dialog,
  Dropdown,
  Notification,
  RadioButton,
  Spinner,
} from 'kintone-ui-component';
import {actionValue, btnText, btnType, label, spinnerText} from '../constant';

// Button
export const bulkStatusUpdateBtn = new Button({
  text: btnText.BULK_STATUS_UPDATE,
  type: btnType.SUBMIT,
  id: 'bulk-status-update-btn',
});

export const nextBtn = new Button({
  text: btnText.NEXT,
  type: btnType.SUBMIT,
});

export const cancelBtn = new Button({
  text: btnText.CANCEL,
  type: btnType.NORMAL,
});

// Dialog
const dialogFooter = () => {
  // Wrap Next and Cancel buttons with a div
  const divEl = document.createElement('div');
  divEl.appendChild(cancelBtn);
  divEl.appendChild(nextBtn);
  divEl.className = 'dialog-footer';
  return divEl;
};

export const dialogComponent = () => {
  const dialogKUC = new Dialog({
    content: '',
    footer: dialogFooter(),
    header: '',
  });

  dialogKUC.className = 'dialog-bulk-status-update';
  return dialogKUC;
};

// Notification
export const errorNotification = (msg) =>
  new Notification({
    text: msg,
    type: 'danger',
    duration: 10000,
  });

export const successNotification = (msg) =>
  new Notification({
    text: msg,
    type: 'success',
    duration: 10000,
  });

// Dropdown
export const dropdownComponent = (items) =>
  new Dropdown({
    items: [{value: actionValue.DEFAULT, label: '---------'}, ...items],
    selectedIndex: 0,
    visible: true,
    disabled: false,
    requiredIcon: true,
  });

export const radioComponent = (items) =>
  new RadioButton({
    label: label.SELECT_AN_ASSIGNEE,
    items,
    selectedIndex: 0,
    itemLayout: 'vertical',
    visible: true,
    disabled: false,
    borderVisible: false,
    requiredIcon: true,
  });

// Spinner
export const spinnerComponent = (elm) =>
  new Spinner({
    text: spinnerText.LOADING,
    container: elm ?? document.body,
  });
