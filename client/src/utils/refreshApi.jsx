import axios from "axios";
import { createRefresh } from "react-auth-kit";

const refreshApi = createRefresh({
  interval: 0.1,
  refreshApiCallback: async (param) => {
    console.log(param);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BASE_URL}/auth/refresh`,
        {
          method: "POST",
          body: JSON.stringify(param),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${param.authToken}`,
          },
        }
      );
      const data = await response.json();

      console.log("Refreshing");
      return {
        isSuccess: true,
        newAuthToken: data.token,
        newAuthTokenExpireIn: 10,
        newRefreshTokenExpiresIn: 60,
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
      };
    }
  },
});

export default refreshApi;
