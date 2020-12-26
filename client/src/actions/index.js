import axios from "axios";

import history from "../history";

import {
  FETCH_RECENTTEMP,
  VERIFY_USER,
  FETCH_SENSOR_IDS,
  FETCH_TEMP_BY_SENSOR_IDS,
  FETCH_ALL_TEMP_BY_SENSOR_IDS,
  GET_CHART_DATA
} from "./types";

export const fetchtemp = () => async (dispatch) => {
  const res = await axios.get("/api/gettemp");
  dispatch({ type: FETCH_RECENTTEMP, payload: res.data });
};

export const verifyuser = ({ userid }) => async (dispatch) => {
  dispatch({ type: VERIFY_USER, payload: { user_id: userid } });
  history.push("/sensors");
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
  const res = await axios.post(`/api/getmytempbysid/${id}`, { user_id: userid });
  dispatch({ type: FETCH_ALL_TEMP_BY_SENSOR_IDS, payload: res.data });
};

export const getchartdata = (id, userid) => async (dispatch) => {
  const res = await axios.post(`/api/getchartdata/${id}`, { user_id: userid });
  dispatch({ type: GET_CHART_DATA, payload: res.data });
};