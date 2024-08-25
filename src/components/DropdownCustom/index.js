import {dropdownComponent} from '..';
import {label} from '../../constant';

export default class DropdownCustom {
  constructor(actions) {
    this.actions = actions;
    this.dropdown = null;
  }

  filterActionWithCurrentStatus(actions, currentStatus) {
    return actions
      .filter((action) => action.from === currentStatus)
      .map((action) => ({value: action.name}));
  }

  createActionLabel() {
    const wrapperLabel = document.createElement('div');
    wrapperLabel.className = 'wrapper-action-label';

    // Create element action label
    const labelAction = document.createElement('span');
    labelAction.textContent = label.SELECT_AN_ACTION;
    labelAction.className = 'action-label';

    // Create element required symbol
    const requiredSymbol = document.createElement('span');
    requiredSymbol.textContent = '*';
    requiredSymbol.className = 'required-symbol';

    wrapperLabel.appendChild(labelAction);
    wrapperLabel.appendChild(requiredSymbol);

    return wrapperLabel;
  }

  createDropdown(states) {
    const wrapperAction = document.createElement('div');
    wrapperAction.className = 'wrapper-action';

    // Append custom action label
    wrapperAction.appendChild(this.createActionLabel());

    // Filter action with status selected
    const actionItems = this.filterActionWithCurrentStatus(
      this.actions,
      states.getRecordSelection()[0].Status,
    );

    // Create dropdown action select
    const dropdown = dropdownComponent(actionItems);
    dropdown.className = 'action-dd';
    this.dropdown = dropdown;
    // Init state default
    states.setActionSelection(this.dropdown.value);

    // Set state when dropdown change
    dropdown.addEventListener('change', () => {
      states.setActionSelection(this.dropdown.value);
    });
    wrapperAction.appendChild(dropdown);
    return wrapperAction;
  }
}
