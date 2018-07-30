import axios from 'axios';

export const ADD_REMINDER = 'ADD_REMINDER';
export const ONE_REMINDER = 'ONE_REMINDER';
export const DELETED_SMS = 'DELETED_SMS';

const token = localStorage.getItem('id');
axios.defaults.headers.common.Authorization = `bearer ${token}`;

export function addReminder(content, history) {
  return (dispatch, getState) => {
    const { _id } = getState().invoice.currentInvoice;
    axios
      .post(`/api/sms/${_id}`, content, {
        headers: {
          Authorization: `bearer ${localStorage.getItem('id')}`,
        },
      })
      .then(res => {
        console.log(res.data);
        history.push('/reminders');
        dispatch({
          type: ADD_REMINDER,
          payload: res.data,
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

export function getReminder(id) {
  return dispatch => {
    axios
      .get(`/api/sms/${id}`, {
        headers: {
          Authorization: `bearer ${localStorage.getItem('id')}`,
        },
      })
      .then(res => {
        dispatch({ type: ONE_REMINDER, payload: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };
}
