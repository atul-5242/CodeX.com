import { Router, Request, Response } from "express";
import { approveRequest, getAllUserInConnection, rejectRequest, sendRequest } from "../../controller/ConnectionRequestHandle/RequestController";

const RequestHandleRoute = Router();

RequestHandleRoute.post("/sent-request", async (req: Request, res: Response) => {
  try {
    await sendRequest(req, res);  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong while sending the request." });
  }
});

RequestHandleRoute.post("/approve-request", async (req: Request, res: Response) => {
  try {
    await approveRequest(req, res);  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong while approving the request." });
  }
});

RequestHandleRoute.post("/reject-request", async (req: Request, res: Response) => {
  try {
    await rejectRequest(req, res);  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong while rejecting the request." });
  }
});

RequestHandleRoute.get("/all-user-in-connection", async (req: Request, res: Response) => {
  try {
    await getAllUserInConnection(req, res);  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong while fetching all users." });
  }
});

export default RequestHandleRoute;
