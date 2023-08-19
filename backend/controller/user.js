import { sendMail } from '../middleware/mail.js'
import { User } from '../model/user.js'
import jwt from 'jsonwebtoken'
import cloudinary from 'cloudinary'

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "⚠️All fields are required⚠️" })
        }
        const user = await User.findOne({ email, password })
        if (!user) {
            return res.status(400).json({ success: false, message: "⚠️Invalid Email or Password⚠️" })
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY)
        res.status(200).cookie("token", token, {
            expires: new Date(Date.now() + 600000),
            httpOnly: true,
            secure: false
        }).json({ success: true, message: "🎉Logged In Successfully🎉" })
    } catch (error) {
        return res.status(500).json({ success: false, message: `⚠️${error.message}⚠️` })
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findOne().select("-email -password")
        res.status(200).json({ success: true, user: user })
    } catch (error) {
        return res.status(500).json({ success: false, message: `⚠️${error.message}⚠️` })
    }
}

export const logout = async (req, res) => {
    try {
        res.status(200).cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            secure: false
        }).json({ success: true, message: "🎉Logged Out Successfully🎉" })
    } catch (error) {
        return res.status(500).json({ success: false, message: `⚠️${error.message}⚠️` })
    }
}

export const myProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        res.status(200).json({ success: true, user: user })
    } catch (error) {
        return res.status(500).json({ success: false, message: `⚠️${error.message}⚠️` })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { name, email, password, skills, about } = req.body
        const user = await User.findById(req.user._id)
        if (name) { user.name = name }
        if (email) { user.email = email }
        if (password) { user.password = password }
        if (skills) {
            if (skills.image1) {
                await cloudinary.v2.uploader.destroy(user.skills.image1.public_id)
                const myCloud = await cloudinary.v2.uploader.upload(skills.image1, {
                    folder: "portfolio"
                })
                user.skills.image1 = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                }
            }
            if (skills.image2) {
                await cloudinary.v2.uploader.destroy(user.skills.image2.public_id)
                const myCloud = await cloudinary.v2.uploader.upload(skills.image2, {
                    folder: "portfolio"
                })
                user.skills.image2 = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                }
            }
            if (skills.image3) {
                await cloudinary.v2.uploader.destroy(user.skills.image3.public_id)
                const myCloud = await cloudinary.v2.uploader.upload(skills.image3, {
                    folder: "portfolio"
                })
                user.skills.image3 = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                }
            }
            if (skills.image4) {
                await cloudinary.v2.uploader.destroy(user.skills.image4.public_id)
                const myCloud = await cloudinary.v2.uploader.upload(skills.image4, {
                    folder: "portfolio"
                })
                user.skills.image4 = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                }
            }
            if (skills.image5) {
                await cloudinary.v2.uploader.destroy(user.skills.image5.public_id)
                const myCloud = await cloudinary.v2.uploader.upload(skills.image5, {
                    folder: "portfolio"
                })
                user.skills.image5 = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                }
            }
            if (skills.image6) {
                await cloudinary.v2.uploader.destroy(user.skills.image6.public_id)
                const myCloud = await cloudinary.v2.uploader.upload(skills.image6, {
                    folder: "portfolio"
                })
                user.skills.image6 = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                }
            }
        }
        if (about) {
            if (about.name)
                user.about.name = about.name
            if (about.title)
                user.about.title = about.title
            if (about.subtitle)
                user.about.subtitle = about.subtitle
            if (about.description)
                user.about.description = about.description
            if (about.quote)
                user.about.quote = about.quote
            if (about.avatar) {
                await cloudinary.v2.uploader.destroy(user.about.avatar.public_id)
                const myCloud = await cloudinary.v2.uploader.upload(about.avatar, {
                    folder: "portfolio"
                })
                user.about.avatar = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                }
            }
        }
        await user.save()
        res.status(200).json({ success: true, message: "🎉User Updated Successfully🎉" })
    } catch (error) {
        return res.status(500).json({ success: false, message: `⚠️${error.message}⚠️` })
    }
}

export const addTimeLine = async (req, res) => {
    try {
        const { title, description, date } = req.body
        const user = await User.findById(req.user._id)
        user.timeline.unshift({
            title,
            description,
            date
        })
        await user.save()
        res.status(200).json({ success: true, message: "🎉Timeline Added Successfully🎉" })
    } catch (error) {
        return res.status(500).json({ success: false, message: `⚠️${error.message}⚠️` })
    }
}

export const addYoutube = async (req, res) => {
    try {
        const { url, title, image } = req.body
        const user = await User.findById(req.user._id)
        const myCloud = await cloudinary.v2.uploader.upload(image, {
            folder: "portfolio"
        })
        user.youtube.unshift({
            url,
            title,
            image: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        })
        await user.save()
        res.status(200).json({ success: true, message: "🎉YouTube Added Successfully🎉" })
    } catch (error) {
        return res.status(500).json({ success: false, message: `⚠️${error.message}⚠️` })
    }
}

export const addProjects = async (req, res) => {
    try {
        const { url, title, image, description, techStack } = req.body
        const user = await User.findById(req.user._id)
        const myCloud = await cloudinary.v2.uploader.upload(image, {
            folder: "portfolio"
        })
        user.projects.unshift({
            url,
            title,
            image: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            },
            description,
            techStack
        })
        await user.save()
        res.status(200).json({ success: true, message: "🎉Project Added Successfully🎉" })
    } catch (error) {
        return res.status(500).json({ success: false, message: `⚠️${error.message}⚠️` })
    }
}

export const deleteTimeLine = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(req.user._id)
        user.timeline = user.timeline.filter((item) => item._id != id)
        await user.save()
        res.status(200).json({ success: true, message: "🎉Timeline Deleted Successfully🎉" })
    } catch (error) {
        return res.status(500).json({ success: false, message: `⚠️${error.message}⚠️` })
    }
}

export const deleteYouTube = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(req.user._id)
        const video = user.youtube.filter((item) => item._id == id)
        await cloudinary.v2.uploader.destroy(video[0].image.public_id)
        user.youtube = user.youtube.filter((item) => item._id != id)
        await user.save()
        res.status(200).json({ success: true, message: "🎉YouTube Deleted Successfully🎉" })
    } catch (error) {
        return res.status(500).json({ success: false, message: `⚠️${error.message}⚠️` })
    }
}

export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(req.user._id)
        const project = user.projects.find((item) => item._id == id)
        await cloudinary.v2.uploader.destroy(project.image.public_id)
        user.projects = user.projects.filter((item) => item._id != id)
        await user.save()
        res.status(200).json({ success: true, message: "🎉Project Deleted Successfully🎉" })
    } catch (error) {
        return res.status(500).json({ success: false, message: `⚠️${error.message}⚠️` })
    }
}

export const contact = async (req, res) => {
    try {
        const { name, email, message } = req.body
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: "⚠️All fields are required⚠️" })
        }
        const userMessage = `Hey, I am ${name}. My email is ${email}. My message is ${message}.`
        await sendMail(userMessage)
        res.status(200).json({ success: true, message: "🎉Message Sent Successfully🎉" })
    } catch (error) {
        return res.status(500).json({ success: false, message: `⚠️${error.message}⚠️` })
    }
}