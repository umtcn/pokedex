import axios from "axios";
import { ErrorPopup } from "examples/ErrorPopup";

async function getData(url) {
  try {
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    ErrorPopup({ message: error });
    return error;
  }
}

export default getData;
