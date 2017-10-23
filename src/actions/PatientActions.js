import firebase from 'firebase';
import {
  PATIENT_UPDATE,
  PATIENT_CREATE,
  PATIENTS_FETCH_SUCCESS,
  PATIENT_SAVE_SUCCESS
} from './types';

export const patientUpdate = ({ prop, value }) => {
  return {
    type: PATIENT_UPDATE,
    payload: { prop, value }
  };
};

export const patientCreate = ({ name, birth }) => {
  // const { currentUser } = firebase.auth();

  console.log(name, birth);
  return (dispatch) => {
    firebase.database().ref(`/patients`)
      .push({ name, birth })
      .then(() => {
        console.log(name, birth);
        
        dispatch({ type: PATIENT_CREATE });
        // Actions.patientList({ type: 'reset' });
      });
  };
};

export const patientsFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/patients`)
      .on('value', snapshot => {
        dispatch({ type: PATIENTS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const patientSave = ({ name, phone, shift, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/patients/${uid}`)
      .set({ name, phone, shift })
      .then(() => {
        dispatch({ type: PATIENT_SAVE_SUCCESS });
        // Actions.patientList({ type: 'reset' });
      });
  };
};

export const patientDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/patients/${uid}`)
      .remove()
      .then(() => {
        // Actions.patientList({ type: 'reset' });
      });
  };
};
