import axios from 'axios';

export const ADD_REMINDER = 'ADD_REMINDER';
export const SEND_SMS = 'SEND_SMS';
export const DELETED_SMS = 'DELETED_SMS';

const token = localStorage.getItem('id');
axios.defaults.headers.common.Authorization = `bearer ${token}`;

export function addReminder(content, history) {
  return (dispatch, getState) => {
    const { id } = getState().invoice.currentInvoice;
    axios
      .post(`/api/sms/${id}`, content, {
        headers: {
          Authorization: `bearer ${localStorage.getItem('id')}`,
        },
      })
      .then(res => {
        console.log(res.data);
        history.push('/reminders');
        dispatch({
          type: ADD_REMINDER,
          payload: 'Message set to send on...',
        });
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
        headers: {
          Authorization: `bearer ${localStorage.getItem('id')}`,
        },
      })
      .then(res => {
        console.log(res);
        history.push('/reminders');
        dispatch({
          type: DELETED_SMS,
          payload: 'Reminder deleted',
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
}
