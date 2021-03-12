import axios from "axios";

import history from "../history";

import {
  FETCH_RECENTTEMP,
  VERIFY_USER,
  FETCH_SENSOR_IDS,
  FETCH_TEMP_BY_SENSOR_IDS,
  FETCH_ALL_TEMP_BY_SENSOR_IDS,
  GET_CHART_DATA,
  GET_CONTROLLER_STATUS,
  SET_CONTROLLER_STATUS,
  FETCH_MOISTURE_SENSOR_IDS,

  FETCH_ALL_MOISTURE_BY_SENSOR_IDS,
  FETCH_MOIST_BY_SENSOR_IDS,
  GET_MOIST_CONTROLLER_STATUS,
  SET_MOIST_CONTROLLER_STATUS
  
} from "./types";

export const fetchtemp = () => async (dispatch) => {
  const res = await axios.get("/api/gettemp");
  dispatch({ type: FETCH_RECENTTEMP, payload: res.data });
};

export const verifyuser = ({ userid, userpass }) => async (dispatch) => {
  const res = await axios.post(`/user/userverification`, {
    user_id: userid,
    user_pass: userpass
  });
  dispatch({ type: VERIFY_USER, payload: { user_id: res.data } });
  history.push("/choosetempormoi");
};

export const fetchsensorids = (userid) => async (dispatch) => {
  const res = await axios.post("/api/getdisidofsensors", { user_id: userid });
  dispatch({ type: FETCH_SENSOR_IDS, payload: res.data });
};

export const fetchtempbysensorid = (id, userid) => async (dispatch) => {
  const res = await axios.post(`/api/getmytemp/${id}`, { user_id: userid });
  dispatch({ type: FETCH_TEMP_BY_SENSOR_IDS, payload: res.data });
};

export const alltempbysensorid = (id, userid) => async (dispatch) => {
  const res = await axios.post(`/api/getmytempbysid/${id}`, {
    user_id: userid,
  });
  dispatch({ type: FETCH_ALL_TEMP_BY_SENSOR_IDS, payload: res.data });
};

export const getchartdata = (id, userid) => async (dispatch) => {
  const res = await axios.post(`/api/getchartdata/${id}`, { user_id: userid });
  dispatch({ type: GET_CHART_DATA, payload: res.data });
};

export const getcontrollerdata = (id, userid) => async (dispatch) => {
  const res = await axios.post(`/api/getcontrollerstatus/${id}`, {
    user_id: userid,
  });
  dispatch({ type: GET_CONTROLLER_STATUS, payload: res.data });
};

export const setcontrollerdata = (
  { lowerbound_temp, upperbound_temp },
  user_id,
  sensor_id,
  fan_status,
  light_status
) => async (dispatch) => {
  const res = await axios.post(`/api/setcontrollerstatus`, {
    sensor_id,
    user_id,
    fan_status,
    light_status,
    lowerbound_temp,
    upperbound_temp,
  });
  dispatch({ type: SET_CONTROLLER_STATUS, payload: res.data });
  history.push("/sensors");
};

// ------------------------------ moisture sensors ------------------------------

export const fetchmoisturesensorids = (userid) => async (dispatch) => {
  const res = await axios.post("/api/getdisidofmoisensors", { user_id: userid });
  dispatch({ type: FETCH_MOISTURE_SENSOR_IDS, payload: res.data });
};

// for all moisture by that sensor
export const allmoistbysensorid = (id, userid) => async (dispatch) => {
  const res = await axios.post(`/api/getmymoibysid/${id}`, {
    user_id: userid,
  });
  dispatch({ type: FETCH_ALL_MOISTURE_BY_SENSOR_IDS, payload: res.data });
};

// for last entry of moisture by that sensor
export const fetchmoistbysensorid = (id, userid) => async (dispatch) => {
  const res = await axios.post(`/api/getmymoi/${id}`, { user_id: userid });
  dispatch({ type: FETCH_MOIST_BY_SENSOR_IDS, payload: res.data });
};

export const getmoisturecontrollerdata = (id, userid) => async (dispatch) => {
  const res = await axios.post(`/api/getcontrollerstatusmoi/${id}`, {
    user_id: userid,
  });
  dispatch({ type: GET_MOIST_CONTROLLER_STATUS, payload: res.data });
};

export const setmoisturecontrollerdata = (
  { lowerbound_moi, upperbound_moi },
  user_id,
  sensor_id,
  motor_status
) => async (dispatch) => {
  const res = await axios.post(`/api/setcontrollerstatusmoi`, {
    sensor_id,
    user_id,
    motor_status,
    lowerbound_moi,
    upperbound_moi,
  });
  dispatch({ type: SET_MOIST_CONTROLLER_STATUS, payload: res.data });
  history.push("/moisturesensors");
};