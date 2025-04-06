import { Router } from "express";
import {
  createGroup,
  addMembers,
  getAllGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
  sendGroupMessage,
  getGroupMessages,
  deleteGroupMessage,
  updateGroupMessage,
} from "../../controller/GroupController/GroupControl";
import { authenticateToken } from "../../middleware/auth";

const GroupRoute = Router();

// Route to create a new group
GroupRoute.post("/create_group", authenticateToken, (req, res, next) => {
  try {
    console.log("Creating group...");
    createGroup(req, res);
  } catch (error) {
    next(error);
  }
});

// Route to add members to a group
GroupRoute.post("/add_members", authenticateToken, (req, res, next) => {
  try {
    console.log("Adding members to group...");
    addMembers(req, res);
  } catch (error) {
    next(error);
  }
});

// Route to get all groups
GroupRoute.get("/get_all_groups", authenticateToken, (req, res, next) => {
  try {
    console.log("Fetching all groups...");
    getAllGroups(req, res);
  } catch (error) {
    next(error);
  }
});

// Route to get a specific group by ID
GroupRoute.get("/get_group_by_id", authenticateToken, (req, res, next) => {
  try {
    console.log("Fetching group by ID...");
    getGroupById(req, res);
  } catch (error) {
    next(error);
  }
});

// Route to update a group
GroupRoute.put("/update_group", authenticateToken, (req, res, next) => {
  try {
    console.log("Updating group...");
    updateGroup(req, res);
  } catch (error) {
    next(error);
  }
});


GroupRoute.delete("/delete_group", authenticateToken, (req, res, next) => {
  // Route to delete a group
  try {
    console.log("Deleting group...");
    deleteGroup(req, res);
  } catch (error) {
    next(error);
  }
});

// Route to send a message to a group
GroupRoute.post("/send_group_message/:groupId", authenticateToken, (req, res, next) => {
  try {
    console.log("Sending group message...");
    sendGroupMessage(req, res);
  } catch (error) {
    next(error);
  }
});

// Route to get group messages with pagination
GroupRoute.get("/get_group_messages/:groupId", authenticateToken, (req, res, next) => {
  try {
    console.log("Fetching group messages...");
    getGroupMessages(req, res);
  } catch (error) {
    next(error);
  }
});

// Route to delete a group message
GroupRoute.delete("/delete_group_message/:groupId/:messageId", authenticateToken, (req, res, next) => {
  try {
    console.log("Deleting group message...");
    deleteGroupMessage(req, res);
  } catch (error) {
    next(error);
  }
});

// Route to update a group message
GroupRoute.put("/update_group_message/:groupId/:messageId", authenticateToken, (req, res, next) => {
  try {
    console.log("Updating group message...");
    updateGroupMessage(req, res);
  } catch (error) {
    next(error);
  }
});

export default GroupRoute;
