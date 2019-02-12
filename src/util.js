import { message } from 'antd';

/**
 * @function
 * @name notifyError
 * @description Show error message box
 *
 * @param {Object} error  error object
 * @returns {undefined} undefined
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export const notifyError = error => {
  // eslint-disable-next-line
  if (!navigator.onLine) {
    return message.error(
      'You are currently offline, Please ensure Network connection is available'
    );
  }

  return message.error(error);
};

/**
 * @function
 * @name notifySuccess
 * @description Show a success message box
 *
 * @param {string} details information to be displayed on message box
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export const notifySuccess = details => {
  message.success(details);
};

/**
 * @function
 * @name notifyInfo
 * @description Show a info message box
 *
 * @param {string} info information to be displayed on message box
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export const notifyInfo = info => {
  message.info(info);
};
