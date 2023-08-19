import express from "express";
import { addProjects, addTimeLine, addYoutube, contact, deleteProject, deleteTimeLine, deleteYouTube, getUser, login, logout, myProfile, updateUser } from "../controller/user.js";
import { isAuthenticated } from "../middleware/auth.js";

export const userRouter = express.Router()

userRouter.route('/login').post(login)
userRouter.route('/logout').get(logout)
userRouter.route('/user').get(getUser)
userRouter.route('/me').get(isAuthenticated, myProfile)
userRouter.route('/admin/update').put(isAuthenticated, updateUser)

userRouter.route('/admin/timeline/add').post(isAuthenticated, addTimeLine)
userRouter.route('/admin/youtube/add').post(isAuthenticated, addYoutube)
userRouter.route('/admin/projects/add').post(isAuthenticated, addProjects)

userRouter.route('/admin/timeline/:id').delete(isAuthenticated, deleteTimeLine)
userRouter.route('/admin/youtube/:id').delete(isAuthenticated, deleteYouTube)
userRouter.route('/admin/projects/:id').delete(isAuthenticated, deleteProject)
userRouter.route('/contact').post(contact)