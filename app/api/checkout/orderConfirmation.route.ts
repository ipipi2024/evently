import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function sendConfirmationEmail(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, orderId, eventTitle, eventDate, eventLocation } = req.body;

    // Configure the transporter with your email provider credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail', // e.g., Gmail, Outlook
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Order Confirmation for ${eventTitle}`,
      text: `Thank you for your purchase!\n\nOrder ID: ${orderId}\nEvent: ${eventTitle}\nDate: ${eventDate}\nLocation: ${eventLocation}\n\nWe look forward to seeing you at the event!`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to send email', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
