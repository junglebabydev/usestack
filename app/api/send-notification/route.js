import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request) {
  try {
    const body = await request.json()
    const { toolName, providerName, contactEmail, description } = body

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'obase.harsh@gmail.com',
        pass: 'jits ucfz gzaz enyh'
      },
      tls: {
        rejectUnauthorized: false
      },
      secure: true,
      port: 465
    })

    // Email content
    const mailOptions = {
      from: 'obase.harsh@gmail.com',
      to: 'obase.vaibhav@gmail.com',
      subject: `New AI Tool Submission: ${toolName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">🚀 New AI Tool Submission</h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Tool Details</h3>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #475569;">Tool Name:</strong>
              <span style="color: #1e293b; margin-left: 10px;">${toolName}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #475569;">Provider/Company:</strong>
              <span style="color: #1e293b; margin-left: 10px;">${providerName}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #475569;">Contact Email:</strong>
              <span style="color: #1e293b; margin-left: 10px;">${contactEmail}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #475569;">Description:</strong>
              <p style="color: #1e293b; margin: 10px 0 0 0; line-height: 1.5;">${description}</p>
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 14px; margin: 0;">
              This is an automated notification from the UseStack.ai Tool submission system.
            </p>
          </div>
        </div>
      `
    }

    // Send email
    const info = await transporter.sendMail(mailOptions)
    
    console.log('Email sent successfully:', info.messageId)
    
    return NextResponse.json({ 
      success: true, 
      messageId: info.messageId,
      message: 'Notification email sent successfully' 
    })

  } catch (error) {
    console.error('Error sending email:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send notification email',
        details: error.message 
      },
      { status: 500 }
    )
  }
}
