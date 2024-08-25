import {apiEndpoint} from '../constant';

export const getProcessManagementSettings = async () => {
  const result = await kintone.api(
    kintone.api.url(apiEndpoint.GET_MANAGEMENT_PROCESS_SETTING, true),
    'GET',
    {
      app: kintone.app.getId(),
    },
  );
  return result;
};

export const getUsers = async (codes) => {
  const result = await kintone.api(
    kintone.api.url(apiEndpoint.GET_USERS, true),
    'GET',
    {
      codes,
    },
  );
  return result;
};

export const updateStatuses = async (body) => {
  const result = await kintone.api(
    kintone.api.url(apiEndpoint.UPDATE_STATUSES, true),
    'PUT',
    body,
  );

  return result;
};
