import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'
import { google } from 'googleapis'
const OAuth2 = google.auth.OAuth2

// https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1
class Mailer {
  async getAccessToken() {
    const oauth2Client = new OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground'
    )

    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    })

    try {
      const { token } = await oauth2Client.getAccessToken()
      return token
    } catch (err) {
      console.error('error', err)
      return false
    }
  }

  async createTransporter() {
    const accessToken = await this.getAccessToken()

    if (!accessToken) {
      return false
    }

    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken,
      },
    })
  }

  async sendEmail(
    recipient: string,
    subject: string,
    template: string,
    variables: Record<string, string> = {}
  ): Promise<boolean> {
    // Get and parse the template
    const html = fs
      .readFileSync(path.join('emails', template + '.html'))
      ?.toString()
    if (!html) return false

    const parsedHtml = Object.keys(variables).reduce(
      (currentHtml, key) => {
        const value = variables[key]
        return currentHtml.replace('{{' + key + '}}', value)
      },
      html
    )

    // Create an email transporter
    const transporter = await this.createTransporter()

    if (!transporter) return false

    const mailOptions = {
      from: process.env.GMAIL,
      to: recipient,
      subject: subject,
      generateTextFromHTML: true,
      html: parsedHtml,
    }

    const response = await transporter.sendMail(mailOptions)
    transporter.close()

    if (response) {
      return true
    }

    return false
  }
}

export default Mailer
