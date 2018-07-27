import axios from 'axios';

export const SEND_SUCCESS = 'SEND_SUCCESS';
export const SEND_SMS = 'SEND_SMS';
export const DELETED_SMS = 'DELETED_SMS';

const token = localStorage.getItem('id');
axios.defaults.headers.common.Authorization = `bearer ${token}`;

export function sendSms(id, content, history) {
  return dispatch => {
    axios
      .post(`/api/sms/${id}`, content, {
        headers: { Authorization: `bearer ${localStorage.getItem('id')}` },
      })
      .then(res => {
        console.log(res.data);
        history.push('/reminders');
        dispatch({ type: SEND_SUCCESS, payload: 'Message set to send on...' });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function deleteSms(id, history) {
  return dispatch => {
    axios
      .delete(`/api/deletesms/${id}`, {
        headers: { Authorization: `bearer ${localStorage.getItem('id')}` },
      })
      .then(res => {
        console.log(res);
        history.push('/reminders');
        dispatch({ type: DELETED_SMS, payload: 'Reminder deleted' });
      })
      .catch(err => {
        console.log(err);
      });
  };
}