
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import path from "path"



export const POST = async (request) => {


    try {

        console.log(path.join(process.cwd(), "green.png"));
        const { subject, userEmail, message } = await request.json()

        const trasnporter = nodemailer.createTransport({
            service: "gmail",
            host: "",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            },

        })

        const mailOption = {
            from: 'onkartemp01@gmail.com', //  Email can be changed -------------
            to: userEmail,
            subject: `${subject}`,
            text: `${message} `,
            attachments: [
                {
                    filename: "me.pdf",
                    // path: path.join(process.cwd(), "green.png"),
                    // path: "../../../public/green.png",
                    // path:"me.pdf",
                    cid: 'unique@nodemailer.com'
                },
                {
                    filename: "green.png",
                    // cid: 'unique@nodemailer.com'
                }
            ]


        }
        await trasnporter.sendMail(mailOption)

        return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Failed to send email" }, { status: 500 })
    }
}
