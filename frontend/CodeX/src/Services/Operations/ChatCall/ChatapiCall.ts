import { apiConnector } from "../../apiConnector";
import { ChatEndPoints } from "../../apis";

// @ts-ignore
export const CREATE_CHAT_BY_ID_API = (body, { token }) => {
  return async () => {
    try {
      console.log("geting AllUserData");
      const response = await apiConnector(
        "POST",
        ChatEndPoints.CREATE_CHAT_BY_ID_API,
        body,
        {
          Authorization: `Bearer ${token}`,
        },
        null
      );
      console.log("CREATE_CHAT_BY_ID_API response", response);
      return response;
    } catch (error) {
      console.log("CREATE_CHAT_BY_ID_API failed", error);
    }
  };
};

// @ts-ignore
export const getAll_Messages_ByID = (data) => {
  console.log("geting AllUserData", data.id, data.requestedUserID);
  return async () => {
    try {
      const body_ = { id: data.id, requestedUserID: data.requestedUserID };
      console.log("///////////////////////////////////////////////", body_);
      const response = await apiConnector(
        "POST",
        `${ChatEndPoints.GET_ALL_MESSAGES_BY_ID_API}`,
        body_,
        null,
        null
      );
      console.log("GET_ALL_MESSAGES_BY_ID_API response", response);
      return response;
    } catch (error) {
      console.log("GET_ALL_MESSAGES_BY_ID_API failed", error);
    }
  };
};
