import axios from "axios";

//Endpoints for this Project
const erikWebAppServerBaseUrl = process.env.VUE_APP_ERIK_WEB_APP_API_HOST;

export const wakeUp = {
  get: async () => {
    const response = axiosGet(erikWebAppServerBaseUrl + "/wake-up");
    return response;
  },
};

export const resumeInfo = {
  get: async () => {
    const response = axiosGet(erikWebAppServerBaseUrl + "/resume");
    return response;
  },
};

export const chessNewGame = {
  get: async () => {
    const response = axiosGet(erikWebAppServerBaseUrl + "/chess/new-game");
    return response;
  },
};

export const chessMakeMove = {
  post: async (body) => {
    const response = axiosPost(
      erikWebAppServerBaseUrl + "/chess/make-move",
      body
    );
    return response;
  },
};

//Axios method wrappers
const defaultHeaders = {
  "Access-Control-Allow-Origin": "*",
  "x-api-key": "917bac03-ca89-49dc-8c6b-ea1a62ceea11", //TODO - replace with env variable and possibly add in frontend proxy to hide from devtools
};
export const axiosGet = async (url, queryParams) => {
  const response = await axios({
    method: "get",
    headers: defaultHeaders,
    url,
    data: queryParams,
  });
  if (response.status === 200) {
    if (response.data) {
      return { ok: true, data: response.data };
    } else {
      return { ok: false, message: "Call succeeded but no data was returned." };
    }
  } else if (response.status === 204) {
    return { ok: true };
  }

  console.log(
    `Error in axios GET at url '${url}. Message: ${response.toString()}`
  );
  return { ok: false, message: response.message };
};

export const axiosPost = async (url, body) => {
  const response = await axios({
    method: "post",
    headers: defaultHeaders,
    url,
    data: body,
  });
  if (response.status === 200 || response.status === 204) {
    return { ok: true, data: response.data };
  }
  console.log(
    `Error in axios POST at url '${url}. Message: ${response.toString()}`
  );
  return { ok: false, message: response.message };
};
