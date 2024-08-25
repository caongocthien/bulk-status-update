import {tableHeader} from '../../constant';

export const columns = (
  renderHeaderCheckboxAll,
  renderRowCheckbox,
  renderAssignees,
) => [
  {
    title: renderHeaderCheckboxAll(),
    field: 'Is_Check',
    render: (_, rowData) => renderRowCheckbox(rowData),
  },
  {
    title: tableHeader.RECORD_NUMBER,
    field: 'Record_number',
  },
  {
    title: tableHeader.SUMMARY,
    field: 'Summary',
  },
  {
    title: tableHeader.STATUS,
    field: 'Status',
  },
  {
    title: tableHeader.ASSIGNEE,
    field: 'Assignee',
    render: (cellData) => renderAssignees(cellData),
  },
];
