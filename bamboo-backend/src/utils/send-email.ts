import nodemailer from 'nodemailer'


export const sendEmail = async(receiver: string, emailContent: string)  => {

    const config = {
        service: 'gmail', // specify the service
        auth: {
            user: process.env.NODEMAILER_USER, // your email address
            pass: process.env.NODEMAILER_USER_PASS // your app password
        }
    }

    const transporter = nodemailer.createTransport(config);

    // build message
    const message = {
        from: 'bambootaskmanager01@gmail.com',
        to: receiver,
        subject: 'Confirmation Email',
        html: emailContent // html only
    }

    try {
        await transporter.sendMail(message);
        console.log('Email Send')
        return Promise.resolve(true)
    } catch (error: any) {
        return Promise.reject({message: 'failed to send email'})
    }
}