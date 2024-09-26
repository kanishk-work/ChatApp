import { LoginDetails } from "../Types/login";
import { setActiveUser } from "../Redux/slices/activeUserSlice";
import store from "../Redux/store";
import { authApi } from "../apis/authApi";

let chatConfig: LoginDetails | null = null;

export const authenticateUser = async (config: LoginDetails) => {
  chatConfig = config;

  try {
    const response = await store
      .dispatch(authApi.endpoints.logIn.initiate(config))
      .unwrap();
    store.dispatch(setActiveUser(response.user));

    localStorage.setItem("viralEffect", response.accessToken);

    console.log("Login successful:", response);
  } catch (error) {
    console.error("Login error:", error);
  }
};

export const getChatConfig = () => chatConfig;
