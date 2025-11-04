import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"HibLink Tech Form" <${process.env.SMTP_EMAIL}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: `New Service Inquiry – ${data.form_type}`,
      html: `
        <table width="100%" cellspacing="0" cellpadding="0" style="max-width:600px; margin:auto; background:#ffffff; border-radius:8px; overflow:hidden; border:1px solid #eaeaea;">
          <tr>
            <td style="background:#ff6600; padding:20px; text-align:center; color:#fff; font-size:22px; font-weight:bold;">
              🚀 HibLink Tech – Service Inquiry
            </td>
          </tr>
          <tr>
            <td style="padding:20px; color:#333;">
              <p style="font-size:16px; margin-bottom:10px;">📩 <strong>New Form Submission</strong></p>
              <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse: collapse; margin-top:15px;">
                <tr style="background:#f9f9f9;"><td><strong>Form Type</strong></td><td>${data.form_type}</td></tr>
                <tr><td><strong>Services</strong></td><td>${data.services.join(", ")}</td></tr>
                <tr style="background:#f9f9f9;"><td><strong>Other Service</strong></td><td>${data.serviceOther}</td></tr>
                <tr><td><strong>Duration</strong></td><td>${data.duration}</td></tr>
                <tr style="background:#f9f9f9;"><td><strong>VA Count</strong></td><td>${data.vaCount}</td></tr>
                <tr><td><strong>Communication</strong></td><td>${data.communication.join(", ")}</td></tr>
                <tr style="background:#f9f9f9;"><td><strong>Other Communication</strong></td><td>${data.communicationOther}</td></tr>
                <tr><td><strong>CRM / Tools</strong></td><td>${data.crmTools}</td></tr>
                <tr style="background:#f9f9f9;"><td><strong>Update Frequency</strong></td><td>${data.updateFrequency}</td></tr>
                <tr><td><strong>Working Style</strong></td><td>${data.workingStyle}</td></tr>
                <tr style="background:#f9f9f9;"><td><strong>Sensitive Data</strong></td><td>${data.sensitiveData}</td></tr>
                <tr><td><strong>Main Goal</strong></td><td>${data.mainGoal}</td></tr>
                <tr style="background:#f9f9f9;"><td><strong>Performance Metrics</strong></td><td>${data.metrics}</td></tr>
              </table>
            </td>
          </tr>
        </table>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  return NextResponse.json({ success: false, error: message }, { status: 500 });
}
}
