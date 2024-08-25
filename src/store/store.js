export default class Store {
  constructor() {
    this.step = null;
    this.recordSelection = [];
    this.actionSelection = '';
    this.assigneeSelection = {};
    this.indexEventRecord = null;
  }

  setStep(step) {
    this.step = step;
  }

  getStep() {
    return this.step;
  }

  setRecordSelection(records) {
    this.recordSelection = [...records];
  }

  getRecordSelection() {
    return this.recordSelection;
  }

  setActionSelection(action) {
    this.actionSelection = action;
  }

  getActionSelection() {
    return this.actionSelection;
  }

  setAssigneeSelection(assignees) {
    this.assigneeSelection = assignees;
  }

  getAssignSelection() {
    return this.assigneeSelection;
  }

  setIndexEventRecord(records) {
    this.indexEventRecord = records;
  }

  getIndexEventRecord() {
    return this.indexEventRecord;
  }

  resetStates() {
    this.step = null;
    this.recordSelection = [];
    this.actionSelection = '';
    this.assigneeSelection = {};
  }
}
