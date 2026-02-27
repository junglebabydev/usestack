import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || !process.env.REPORT_RECIPIENT_EMAIL) {
    return NextResponse.json(
      { success: false, error: 'Missing required email configuration environment variables' },
      { status: 500 }
    )
  }

  try {
    const body = await request.json()
    const { name, email, message, toolName } = body

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      },
      secure: true,
      port: 465
    })

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.REPORT_RECIPIENT_EMAIL,
      subject: `Tool Report: ${toolName || 'Unknown Tool'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">🚨 Tool Report Submitted</h2>

          <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
            <h3 style="color: #1e293b; margin-top: 0;">Report Details</h3>

            <div style="margin-bottom: 15px;">
              <strong style="color: #475569;">Reporter Name:</strong>
              <span style="color: #1e293b; margin-left: 10px;">${name}</span>
            </div>

            <div style="margin-bottom: 15px;">
              <strong style="color: #475569;">Reporter Email:</strong>
              <span style="color: #1e293b; margin-left: 10px;">${email}</span>
            </div>

            <div style="margin-bottom: 15px;">
              <strong style="color: #475569;">Tool Name:</strong>
              <span style="color: #1e293b; margin-left: 10px;">${toolName || 'Unknown Tool'}</span>
            </div>

            <div style="margin-bottom: 15px;">
              <strong style="color: #475569;">Report Message:</strong>
              <p style="color: #1e293b; margin: 10px 0 0 0; line-height: 1.5;">${message}</p>
            </div>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 14px; margin: 0;">
              This is an automated notification from the UseStack.ai Tool reporting system.
            </p>
          </div>
        </div>
      `
    }

    // Send email
    const info = await transporter.sendMail(mailOptions)

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
      message: 'Report email sent successfully'
    })

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to send report email',
        details: error.message
      },
      { status: 500 }
    )
  }
}
