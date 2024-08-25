import {radioComponent} from '..';
import {getUsers} from '../../api';
import {
  actionValue,
  assigneeListLabel,
  initialStatusAssignee,
  processType,
} from '../../constant';

export class AssigneeSelectionCustom {
  constructor(processInfo) {
    this.processInfo = processInfo;
    this.processAction = null;
    this.assignessState = null;
  }

  getStateWithActionSelect() {
    this.assignessState = this.processInfo.states[this.processAction.to];
  }

  getActionObject(action, status) {
    this.processAction = this.processInfo.actions.find(
      (actionObject) =>
        actionObject.name === action && actionObject.from === status,
    );
  }

  async getUserName(codes) {
    const users = await getUsers(codes);
    return users;
  }

  async convertAssigneeData(assignees, spinner) {
    // If next status is the Initial status
    if (this.assignessState.index === '0') {
      if (assignees.entities.length) {
        spinner.close();
        return [
          {
            label: initialStatusAssignee.CREATED_BY.label,
            value: assignees.entities[0].entity.code,
          },
        ];
      }
      spinner.close();
      return [
        {
          label: initialStatusAssignee.ANYBODY.label,
          value: initialStatusAssignee.ANYBODY.value,
        },
      ];
    }

    // Transform user entity to array code
    const userCodes = assignees.entities.map((assignee) => {
      const entity = assignee.entity;
      return entity.code;
    });

    // Get user info (get name to display)
    const {users} = await this.getUserName(userCodes);

    // Transform users data to display in list
    const transformData = users.map((user) => {
      return {
        label: `${user.name} (${user.code})`,
        value: user.code,
      };
    });
    spinner.close();

    return transformData;
  }

  // Element Radio button, render when assignee list is type ONE.
  createRadioButtonCaseONE(assignees, states) {
    const radioBtn = radioComponent(assignees);
    radioBtn.className = 'assignee-rbtn';

    // Set state with default
    states.setAssigneeSelection({
      type: this.assignessState.assignee.type,
      assignees: [{value: radioBtn.value}],
    });

    radioBtn.addEventListener('change', (event) => {
      // Set state when radio button change
      states.setAssigneeSelection({
        type: this.assignessState.assignee.type,
        assignees: [{value: event.detail.value}],
      });
    });
    return radioBtn;
  }

  // Element List view with lable, render when assignee list is type ALL, ANY
  createListViewAssignee(assignees, label, states) {
    // Wrapper element
    const wrapList = document.createElement('div');
    wrapList.className = 'wrapper-assignee-list';

    // Create label element
    const labelElm = document.createElement('p');
    labelElm.className = 'assignee-list-label';
    labelElm.textContent = label;

    // Create list Element
    const listElm = document.createElement('ul');
    listElm.className = 'assignee-list-view';

    // Create assignee item
    assignees.forEach((assignee) => {
      const listItem = document.createElement('li');
      listItem.textContent = assignee.label;
      listElm.appendChild(listItem);
    });

    wrapList.appendChild(labelElm);
    wrapList.appendChild(listElm);

    states.setAssigneeSelection({
      type: this.assignessState.assignee.type,
      assignees: assignees,
    });

    return wrapList;
  }

  async createAssigneeCustom(states, spinner) {
    // Wrapper elemtn
    const wrapper = document.createElement('div');
    wrapper.className = 'assignee-list-wrapper';

    // Action default is not display assignee selection
    if (states.getActionSelection() === actionValue.DEFAULT) {
      spinner.close();
      return wrapper;
    }

    // Get action base on status
    this.getActionObject(
      states.getActionSelection(),
      states.getRecordSelection()[0].Status,
    );

    // Get state with next status
    this.getStateWithActionSelect();

    // Data of assignees after convert
    const data = await this.convertAssigneeData(
      this.assignessState.assignee,
      spinner,
    );

    // Render with each assignee list type
    if (this.assignessState.assignee.type === processType.ONE) {
      wrapper.appendChild(this.createRadioButtonCaseONE(data, states));
      return wrapper;
    } else if (this.assignessState.assignee.type === processType.ALL) {
      wrapper.appendChild(
        this.createListViewAssignee(data, assigneeListLabel.ALL, states),
      );
      return wrapper;
    }
    wrapper.appendChild(
      this.createListViewAssignee(data, assigneeListLabel.ANY, states),
    );
    return wrapper;
  }
}
