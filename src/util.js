import { message } from 'antd';
import moment from 'moment';

/**
 * @function
 * @name notifyError
 * @description Show error message box
 *
 * @param {object} error  error object
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

/**
 * @function
 * @name formatTime
 * @description formats date to ddd, MMM DD YYYY hA format
 *
 * @param {object} date date object
 * @returns {string} formatted date
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export const formatTime = date => moment(date).format('ddd, MMM DD YYYY hA');

/**
 * @function
 * @name timeAgo
 * @description creates relative date
 *
 * @param {object} date date object
 * @returns {string} relative time
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export const timeAgo = date => moment(date).fromNow();

/**
 * @function
 * @name formatNumber
 * @description Format number to en-Us format i.e 2000 to 2,000
 *
 * @param {number|string} number Number to be formatted
 *
 * @returns {string} formatted number
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export const formatNumber = number =>
  new Intl.NumberFormat('en-US').format(number);

/**
 * @function
 * @name getRGBAColor
 * @description Return RGBA color from base color and alpha value
 *
 * @param {string} baseColor  Base color i.e #ffddee
 * @param {number} alpha Alpha value should be between 0 and 1
 *
 * @returns {string} rbga(r,b,g,a)
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export const getRGBAColor = (baseColor, alpha) => {
  const values = baseColor.split('');

  if (values.length < 7 || alpha > 1 || alpha < 0) {
    return undefined;
  }

  const r = parseInt(`0x${values[1]}${values[2]}`, 16);
  const g = parseInt(`0x${values[3]}${values[4]}`, 16);
  const b = parseInt(`0x${values[5]}${values[6]}`, 16);

  return `rgba(${r},${g},${b},${alpha})`;
};
