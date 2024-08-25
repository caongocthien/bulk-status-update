import {errorNotification} from '../components';
import TableCustom from '../components/TableCustom';
import {dialogHeader, msg} from '../constant';

export const renderRecordSelection = (
  dialog,
  recordsSelected,
  states,
  nextBtn,
) => {
  const recordSelection = (records) => new TableCustom(records);
  dialog.header = dialogHeader.SELECT_RECORDS;
  dialog.content = recordSelection(recordsSelected).createTable(
    states,
    nextBtn,
  );
};

const checkStatusesAreSame = (records) => {
  // Get first status to base on
  const firstStatus = records[0].Status;
  const isSame = records.every((record) => record.Status === firstStatus);

  // Show error
  if (!isSame) {
    errorNotification(msg.MSG_ERR_1).open();
  }
  return isSame;
};

const checkHasRecordsSelected = (records) => {
  const hasRecords = records.length > 0;
  if (!hasRecords) {
    errorNotification(msg.MSG_ERR_2).open();
  }
  return hasRecords;
};

export const performCheckRecordSelectionStep = (records) => {
  // Check have records selected and Check statuses are same
  return checkHasRecordsSelected(records) && checkStatusesAreSame(records);
};
