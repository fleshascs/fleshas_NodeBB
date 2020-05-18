import moment from 'moment';

export function messageDate(timestamp) {
  return moment(new Date(timestamp), 'YYYY-MM-DD HHmmss').fromNow();
}

export function dateTime(timestamp) {
  return moment(new Date(timestamp), 'YYYY-MM-DD HHmmss').format('LLL');
}
