import {getProcessManagementSettings} from '../api';
import {
  bulkStatusUpdateBtn,
  cancelBtn,
  dialogComponent,
  nextBtn,
  spinnerComponent,
} from '../components';
import {AssigneeSelectionCustom} from '../components/AssigneeSelectionCustom';
import DropdownCustom from '../components/DropdownCustom';
import {btnText, componentClass, processStep} from '../constant';
import {
  performCheckActionAssigneeSelectionStep,
  performUpdateStatuses,
  renderActionAndAssigneeSelection,
} from '../handler/actionAndAssigneeSelection';
import {
  performCheckRecordSelectionStep,
  renderRecordSelection,
} from '../handler/recordSelection';

const handleNextStep = async (states, submitButton, dialog) => {
  const actionSelection = (actions) => new DropdownCustom(actions);
  const assigneeSelection = (assigness) =>
    new AssigneeSelectionCustom(assigness);
  switch (states.getStep()) {
    case processStep.RECORD_SLECTION_STEP:
      // Pass all cases error
      if (performCheckRecordSelectionStep(states.getRecordSelection())) {
        // Init spinner when click next
        const spinnerNext = spinnerComponent(
          document.querySelector(componentClass.DIALOG),
        );
        spinnerNext.open();
        // Set new step
        states.setStep(processStep.ACTION_ASSIGNEE_SELECTION_STEP);
        const processManagementInfo = await getProcessManagementSettings();

        // Render next dialog
        renderActionAndAssigneeSelection(
          dialog,
          actionSelection(processManagementInfo.actions),
          assigneeSelection(processManagementInfo),
          states,
          spinnerNext,
        );
        // Update button text
        submitButton.text = btnText.UPDATE;
      }
      break;
    case processStep.ACTION_ASSIGNEE_SELECTION_STEP:
      // Check error
      if (performCheckActionAssigneeSelectionStep(states)) {
        // Update status
        performUpdateStatuses(states, dialog, handleCancelDialog);
      }
      break;
    default:
    // Do something
  }
};

// Check process management enable
const isProcessManagementEnabled = async () => {
  const processManagementInfo = await getProcessManagementSettings();
  return processManagementInfo.enable;
};

const handleCancelDialog = (states, dialog) => {
  states.setStep(null);
  dialog.close();
};

const setupEventListeners = (event, dialog, states) => {
  // Event click button in list screen
  bulkStatusUpdateBtn.addEventListener('click', () => {
    console.log('event', event);
    console.log('states.getIndexEventRecord()', states.getIndexEventRecord());

    states.setStep(processStep.RECORD_SLECTION_STEP);
    renderRecordSelection(
      dialog,
      // Get record when event index change
      states.getIndexEventRecord() ?? event.records,
      states,
      nextBtn,
    );
    nextBtn.text = btnText.NEXT;
    dialog.open();
  });

  nextBtn.addEventListener('click', () => {
    handleNextStep(states, nextBtn, dialog);
  });

  cancelBtn.addEventListener('click', () => {
    handleCancelDialog(states, dialog);
  });

  dialog.addEventListener("close", () => {
    states.resetStates();
  });
};

export const initializeApp = async (event, states) => {
  // Prevent element duplicate
  if (document.getElementById('bulk-status-update-btn') !== null) {
    states.setIndexEventRecord(event.records);
    return event;
  }

  if (!(await isProcessManagementEnabled())) {
    return event;
  }

  // Init dialog
  const dialog = dialogComponent();

  const header = kintone.app.getHeaderMenuSpaceElement();
  header.appendChild(bulkStatusUpdateBtn);

  setupEventListeners(event, dialog, states);

  return event;
};
