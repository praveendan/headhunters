export const Roles = {
  MEMBER: 'member',
  SUPREME_USER: 'supreme',
};

export const RolesDropdownList = [
  {
    key: 'member',
    displayName: 'Member',
  },
  {
    key: 'supreme',
    displayName: 'Admin',
  },
];

export const AppData = {
  VERSION: '1.0',
  USER_SUFFIX: '@headhuntersnz.com',
};

export const Constants = {
  NEWS_LIMIT: 7,
  NEWS_SHOW_LIMIT: 20,
  EVENTS_LIMIT: 100,

};

export const StorageValueKeys = {
  USER_ID: 'userId',
  IS_AUTHORIZED: 'isAuthorized',
};

export const StartupMessages = {
  VALIDATION_ERROR: 'Error validating Magic word. Please try again later',
  WRONG_MAGIC_WORD: 'Wrong Magic word.!',
  SETUP_BUTTON: 'ENTER.!',
  SETTING_UP_BUTTON: 'PLEASE WAIT..',
};

export const LoginMessages = {
  WRONG_USER_ID: 'Wrong User Id. please contact Administrator',
  INVALID_USER_KEY: 'Invalid User Key. please contact Administrator',
  EMPTY_USER_ID: 'User Id cannot be empty',
  LOGIN_ERROR: 'Error logging in. Please contact Administrator',
  SETUP_ERROR: 'Error setting up. Please try again later',
  SETUP_BUTTON: 'SETUP',
  SETTING_UP_BUTTON: 'SETTING UP..',
  CRITICAL_ERROR: 'Critical error.! Please contact Administrator',
  EMPTY_USER_KEY_ERROR: 'User key should not be empty.!',
  RESTART_APP_MESSAGE: 'Error.! Please restart the app',
  LOG_IN_BUTTON: 'LOGIN',
  LOGGING_IN_BUTTON: 'LOGGING IN..',
};

export const MemberItemType = {
  EVENTS: 'events',
  NEWS: 'news',
};

export const LocalizedEventsGroups = {
  GLOBAL: 'global',
};

export const AdminMemberListMessages = {
  MEMBER_ID_INVALID_ERROR: 'Member Id cannot contain special characters',
  MEMBER_ID_EXISTS_ERROR: 'Member Id already exists',
  MEMBER_KEY_LENGTH_ERROR: 'Key length should not be less than 6 character',
  EMPTY_FIELDS_ERROR: 'Please fill up all the fields',
  SAVED_SUCCESS: 'Saved successfully',
  SAVE_ERROR: 'Error saving. Please try again later',
  DELETE_SUCCESS: 'User deleted successfully. Please close the modal',
  DELETE_ERROR: 'Error deleting. Please close the modal and retry',
};

export const AdminNewsListMessages = {
  EMPTY_FIELDS_ERROR: 'Please fill up all the fields',
  SAVED_SUCCESS: 'Sent successfully',
  SAVE_ERROR: 'Error sending. Please try again later',
};

export const SaveButtonText = {
  SAVE: 'Save',
  SAVING: 'Saving..',
};

export const DeleteButtonText = {
  DELETE: 'Delete',
  DELETING: 'Deleting..',
};

export const SendMessageButtonText = {
  SEND: 'Send',
  SENDING: 'Sending..',
};
