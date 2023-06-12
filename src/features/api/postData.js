import axios from "axios";
import { ErrorPopup } from "examples/ErrorPopup";

async function postData(url, info) {
  try {
    const response = await axios.post(url, info);

    return response.data;
  } catch (error) {
    ErrorPopup({ message: error });
    return error;
  }
}

export default postData;
