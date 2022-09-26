import axios from 'axios';
const { REACT_APP_REST_ENDPOINT_BASE: restEndpointBase } = process.env;

const msg = (res, endpoint) => {
  const errMsg = "Coudn't fetch";
  if (res.status === 200) return res.data;
  throw new Error(`${errMsg} ${endpoint}`);
};

const tryLogin = async (userData) => {
  const finalEndPoint = `${restEndpointBase}/login`;
  const res = await axios.post(finalEndPoint, userData);
  const { token } = res.data;
  localStorage.setItem('token', token);
  return msg(res, finalEndPoint);
};

export { tryLogin };
