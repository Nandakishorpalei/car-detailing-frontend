import axios from "axios";
import { UserPayload } from "../model/User";

export const signup = async ({ payload }: { payload: UserPayload }) => {
  try {
    const data = await axios.post(
      process.env.NODE_APP_BASE_URL! + "/signup",
      payload
    );
    return data;
  } catch (e: any) {
    return e;
  }
};
