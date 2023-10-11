import axios from "axios";
import {
  GET_JOB_API_ERR,
  GET_JOB_API_REQ,
  GET_JOB_API_SUC,
  SET_PAGINATION,
} from "./job.types";

const getJobApiReq = () => {
  return {
    type: GET_JOB_API_REQ,
  };
};

const getJobApiSuc = (payload) => {
  return {
    type: GET_JOB_API_SUC,
    payload,
  };
};

const getJobApiErr = () => {
  return {
    type: GET_JOB_API_ERR,
  };
};

export const setPagination = (currentPage, itemsPerPage) => ({
  type: SET_PAGINATION,
  payload: { currentPage, itemsPerPage },
});

export const fetchJobData =
  (selectedLanguage) => async (dispatch) => {
    dispatch(getJobApiReq());
    try {
      const response = await axios.get(
        `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=b5115117&app_key=019c9a0e876ffe91894ca6d3c0131381&results_per_page=100&what=${selectedLanguage}&content-type=application/json`
      );
      dispatch(getJobApiSuc(response.data.results));
    } catch (error) {
      dispatch(getJobApiErr());
    }
  };
