const basedir = __dirname;
const MS_IN_A_MINUTE = 60000;
const MS_IN_AN_HOUR = MS_IN_A_MINUTE * 60;
const MS_IN_A_DAY = MS_IN_AN_HOUR * 24;
const MS_IN_A_WEEK = MS_IN_A_DAY * 7;
const MS_IN_A_MONTH = MS_IN_A_WEEK * 30;
const RESERVED_PAGE_NAMES = ['messages', 'friends', 'settings', 'registration'];

export { basedir, MS_IN_A_MONTH, RESERVED_PAGE_NAMES };
