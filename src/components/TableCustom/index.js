import {Checkbox, Table} from 'kintone-ui-component';
import {tableConst} from '../../constant';
import {columns} from './config';

export default class TableCustom {
  constructor(records) {
    this.records = records;
    this.table = null;
  }

  renderAssignees(assignees) {
    // Create a div to hold the anchor
    const divEl = document.createElement('div');

    // Loop with assignee list in record to render
    assignees.forEach((assignee) => {
      const anchorNode = document.createElement('a');
      anchorNode.textContent = assignee.name;
      divEl.appendChild(anchorNode);

      // Break line each element append
      divEl.appendChild(document.createElement('br'));
    });

    return divEl;
  }

  renderHeaderCheckboxAll() {
    // Create a div to hold the checkbox
    const divEl = document.createElement('div');

    // Create the checkbox input element
    const checkbox = new Checkbox({
      borderVisible: false,
      visible: true,
      items: [
        {
          label: null,
          value: 'selected',
        },
      ],
      value: [],
    });
    checkbox.className = 'all-checkbox';

    // Append the checkbox to the div
    divEl.appendChild(checkbox);

    // Listener event check all checkbox
    checkbox.addEventListener('change', (event) => {
      // Update is checked for all records
      this.table.data = [...this.table.data].map((record) => {
        return {
          ...record,
          Is_Check: event.detail.value,
        };
      });
    });

    return divEl;
  }

  renderRowCheckbox(rowData) {
    // Create a div to hold the checkbox
    const divEl = document.createElement('div');
    // Update checkbox value with table data
    const handleUpdateValue = this.table.data.find(
      (record) => record.$id === rowData.$id,
    ).Is_Check;

    // Create the checkbox input element
    const checkbox = new Checkbox({
      borderVisible: false,
      visible: true,
      items: [
        {
          label: null,
          value: 'selected',
        },
      ],
      value: handleUpdateValue,
    });
    checkbox.className = 'row-checkbox';

    // Append the checkbox to the div
    divEl.appendChild(checkbox);

    // Listener event check row checkbox
    checkbox.addEventListener('change', (event) => {
      const selectAllCheckbox = document.querySelector('.all-checkbox');

      // Ensure table is updated
      setTimeout(() => {
        // Check all row is checked
        const allChecked = this.table.data.every(
          (record) => !!record.Is_Check.length,
        );

        // Set Checkbox ALl checked
        selectAllCheckbox.value = allChecked ? ['selected'] : [];
      });
    });

    return divEl;
  }

  convertToTableData() {
    // Get user logging in to check assignee
    const userLoggedIn = kintone.getLoginUser();

    // Covert data get from event app.record.index.show to data show on table
    const tableData = [...this.records]
      // Sort data with Record number asc
      // .sort((a, b) => a.Record_number.value - b.Record_number.value)
      // Filter data with assignee include user logged in
      .filter(
        (record) =>
          !record.Assignee.value.length ||
          record.Assignee.value.some((item) => item.code === userLoggedIn.code),
      )
      .map((record) => {
        const transformedRecord = {};
        for (const [key, value] of Object.entries(record)) {
          transformedRecord[key] = value.value;
        }
        // Initial isChecked
        transformedRecord.Is_Check = [];

        return transformedRecord;
      });

    return tableData;
  }

  createTable(states, nextBtn) {
    const wrapTable = document.createElement('div');
    if (!this.convertToTableData().length) {
      const node = document.createElement('p');
      node.className = 'no-record';
      node.textContent = tableConst.TABLE_EMPTY;
      wrapTable.appendChild(node);
      // Disable next button when no data to display on list
      nextBtn.disabled = true;
      return wrapTable;
    }
    const table = new Table({
      data: this.convertToTableData(),
      columns: columns(
        this.renderHeaderCheckboxAll.bind(this),
        this.renderRowCheckbox.bind(this),
        this.renderAssignees,
      ),
      actionButton: false,
    });
    this.table = table;

    wrapTable.appendChild(table);

    table.addEventListener('change', () => {
      // Filter records are selected
      const filterRecordSelected = this.table.data.filter(
        (record) => record.Is_Check.length,
      );
      states.setRecordSelection(filterRecordSelected);
    });
    return wrapTable;
  }
}
