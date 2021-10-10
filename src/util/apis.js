/**
 * @description      :
 * @author           : ebdie
 * @group            :
 * @created          : 09/10/2021 - 19:13:16
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 09/10/2021
 * - Author          : ebdie
 * - Modification    :
 **/
import axios from "axios";

//Endpoints for this Project

export const resumeInfo = {
  get: async () => {
    const response = axiosGet("http://127.0.0.1:5000/resume/");
    return response;
  },
};

//Axios method wrappers
export const axiosGet = async (url, queryParams) => {
  const response = await axios({
    method: "get",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "x-api-key": "917bac03-ca89-49dc-8c6b-ea1a62ceea11",
    },
    url,
    data: queryParams,
  });
  if (response.status === 200 || response.status === 204) {
    return { ok: true, data: response.data };
  }
  console.log(
    `Error in axios GET at url '${url}. Message: ${response.toString()}`
  );
  return { ok: false, message: response.message };
};
