import {updateStatuses} from '../api';
import {
  errorNotification,
  spinnerComponent,
  successNotification,
} from '../components';
import {
  actionValue,
  componentClass,
  dialogHeader,
  initialStatusAssignee,
  msg,
  processType,
  spinnerText,
} from '../constant';

export const renderActionAndAssigneeSelection = (
  dialog,
  actionSelection,
  assigneeSelection,
  states,
  spinnerNext,
) => {
  // Update dialog content
  dialog.header = dialogHeader.SELECT_AN_ACTION_AND_ASSIGNEES;
  dialog.content = actionSelection.createDropdown(states);

  // Event listening when action change, set time out ensure event listen after action selection mount
  setTimeout(() => {
    document
      .querySelector('.action-dd')
      .addEventListener('change', async (event) => {
        // Reset state assignee before set new state
        states.setAssigneeSelection({});
        const assigneeListElm = document.querySelector(
          '.assignee-list-wrapper',
        );

        // Remove element before create new DOM for assignee slection
        if (assigneeListElm) {
          assigneeListElm.remove();
        }

        // Waiting loading render assignee selection
        const spinnerChangeAction = spinnerComponent(
          document.querySelector(componentClass.DIALOG),
        );
        spinnerChangeAction.open();

        // Mount assignee selection to DOM (next to action selection)
        document
          .querySelector('.wrapper-action')
          .insertAdjacentElement(
            'afterend',
            await assigneeSelection.createAssigneeCustom(
              states,
              spinnerChangeAction,
            ),
          );
      });
  });
  spinnerNext.close();
};

// Check action has select
const isActionSelected = (action) => {
  // Handle error
  if (action === actionValue.DEFAULT) {
    errorNotification(msg.MSG_ERR_3).open();
  }
  // Not default, return true
  return action !== actionValue.DEFAULT;
};

export const performCheckActionAssigneeSelectionStep = (states) => {
  // Check action is select
  return isActionSelected(states.getActionSelection());
};

const transformBodyRecordsUpdate = (
  recordsSelected,
  assigneesSelected,
  actionSelected,
) => {
  return recordsSelected.map((record) => {
    if (assigneesSelected.type === processType.ONE) {
      // Assignee to user Created by if initial Assignee list is Set to anybody
      if (
        assigneesSelected.assignees[0].value ===
        initialStatusAssignee.ANYBODY.value
      ) {
        return {
          id: record.$id,
          action: actionSelected,
        };
      }
      // Type ONE
      return {
        id: record.$id,
        action: actionSelected,
        assignee:
          // Assignee to user Created by if initial Assignee list is Set to Created by
          record[assigneesSelected.assignees[0].value]?.code ??
          // Assignee choose one from list
          assigneesSelected.assignees[0].value,
      };
    }
    // Type ALL, ANY
    return {
      id: record.$id,
      action: actionSelected,
    };
  });
};

export const performUpdateStatuses = async (
  states,
  dialog,
  handleCancelDialog,
) => {
  // Spinner display when submit update
  const spinnerUpdate = spinnerComponent(
    document.querySelector(componentClass.DIALOG),
  );
  spinnerUpdate.open();
  spinnerUpdate.text = spinnerText.UPDATING_RECORD;

  // Get data from states
  const recordsSelected = states.getRecordSelection();
  const actionSelected = states.getActionSelection();
  const assigneesSelected = states.getAssignSelection();

  // Transform to records field in body api
  const bodyRecords = transformBodyRecordsUpdate(
    recordsSelected,
    assigneesSelected,
    actionSelected,
  );

  // Body of update request
  const body = {
    app: kintone.app.getId(),
    records: bodyRecords,
  };

  try {
    // Call api update statuses
    await updateStatuses(body);
    // Show notification success
    successNotification(msg.MSG_SUCCESS).open();
  } catch (error) {
    // Show notication fail
    errorNotification(error.message).open();
  }

  // Close spinner and cancel dialog
  spinnerUpdate.close();
  handleCancelDialog(states, dialog);
};
