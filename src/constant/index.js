// Dialog Header
export const dialogHeader = {
  SELECT_RECORDS: 'Select records',
  SELECT_AN_ACTION_AND_ASSIGNEES: 'Select an action and assignees',
};

// Dialog Type
export const dialogType = {
  RECORD_SELECTION: 'RECORD_SELECTION',
  ACTION_SELECTION: 'ACTION_SELECTION',
  ASSIGNEE_SELECTION: 'ASSIGNEE_SELECTION',
};

// Button
export const btnText = {
  BULK_STATUS_UPDATE: 'Bulk Status Update',
  CANCEL: 'Cancel',
  NEXT: 'Next',
  UPDATE: 'Update',
};

// Button Type
export const btnType = {
  NORMAL: 'normal',
  SUBMIT: 'submit',
};

// Label
export const label = {
  SELECT_AN_ACTION: 'Select an action',
  SELECT_AN_ASSIGNEE: 'Select an assignee from the list take action',
};

// Message
export const msg = {
  MSG_ERR_1: 'Please make sure all selected records have the same status.',
  MSG_ERR_2: 'Please select at least one record to proceed.',
  MSG_ERR_3: 'Please choose an action to continue.',
  MSG_SUCCESS:
    'Records have been successfully updated! Please reload the page to view the new data.',
};

export const processStep = {
  RECORD_SLECTION_STEP: 1,
  ACTION_ASSIGNEE_SELECTION_STEP: 2,
};

export const apiEndpoint = {
  GET_MANAGEMENT_PROCESS_SETTING: '/k/v1/app/status.json',
  GET_USERS: '/v1/users.json',
  UPDATE_STATUSES: '/k/v1/records/status.json',
};

export const tableHeader = {
  RECORD_NUMBER: 'Record number',
  SUMMARY: 'Summary',
  STATUS: 'Status',
  ASSIGNEE: 'Assignee',
};

export const processType = {
  // One assignees in the list must take action
  ANY: 'ANY',
  // User chooses one assignee from the list take action
  ONE: 'ONE',
  // All assignees in the list must take action
  ALL: 'ALL',
};

export const assigneeListLabel = {
  // One assignees in the list must take action
  ANY: 'One assignees in the list must take action',
  // User chooses one assignee from the list take action
  ONE: 'User chooses one assignee from the list take action',
  // All assignees in the list must take action
  ALL: 'All assignees in the list must take action',
};

// Action value
export const actionValue = {
  DEFAULT: 'default',
};

export const initialStatusAssignee = {
  CREATED_BY: {
    label: 'Created by of records will become assignee',
    value: 'Created_by',
    type: 'FIELD_ENTITY',
  },
  ANYBODY: {
    label: "Don't need assignee for next status",
    value: 'Anybody',
  },
};

export const tableConst = {
  TABLE_EMPTY: '(No records need updating)',
};

export const componentClass = {
  DIALOG: '.dialog-bulk-status-update .kuc-dialog-1-17-1__dialog',
};

export const spinnerText = {
  LOADING: 'Loading...',
  UPDATING_RECORD: 'Updating records...',
};
