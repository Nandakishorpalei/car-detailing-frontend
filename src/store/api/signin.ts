import axios from "axios";

export const signin = async ({
  payload,
}: {
  payload: {
    email: string;
    password: string;
  };
}) => {
  try {
    const { data } = await axios.post(
      process.env.NODE_APP_BASE_URL + "/signin",
      payload
    );
    return data;
  } catch (e: any) {
    return e;
  }
};
