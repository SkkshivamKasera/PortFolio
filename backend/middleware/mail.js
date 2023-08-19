import { createTransport } from 'nodemailer'

export const sendMail = async (userMessage) => {
    const transporter = createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD
        }
    })

    await transporter.sendMail({
        from: process.env.SMPT_MAIL,
        to: process.env.TO,
        subject: "CONTACT REQUEST FROM PORTFOLIO",
        text: userMessage
    })
}