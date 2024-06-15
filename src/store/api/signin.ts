import axios from "axios";
import { BACKEND_URL } from "../../Constant/auth";

export const signin = async ({
  payload,
}: {
  payload: {
    email: string;
    password: string;
  };
}) => {
  try {
    const { data } = await axios.post(BACKEND_URL + "/signin", payload);
    return data;
  } catch (e: any) {
    return e;
  }
};
