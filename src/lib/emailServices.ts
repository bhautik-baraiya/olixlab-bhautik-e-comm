const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendWelcomeEmail = async (userEmail: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: `Welcome to Our App ${userEmail}`,
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">

  <h2 style="text-align: center; color: #333;">
    Welcome to YourStore ${userEmail}
  </h2>

  <p>Hi,</p>

  <p>
    Your account has been successfully created. We’re excited to have you with us!
  </p>

  <p>
    Start exploring our products and enjoy a great shopping experience.
  </p>

  <div style="text-align: center; margin: 20px 0;">
    <a href="http://localhost:3000"
       style="background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
      Shop Now
    </a>
  </div>

  <p>
    If you have any questions, feel free to contact us anytime.
  </p>

  <p>
    Thanks,<br/>
    <strong>YourStore Team</strong>
  </p>

</div>`,
  };

  transporter.sendMail(mailOptions, (err: any, info: any) => {
    if (err) console.error("Error sending welcome email:", err);
    else console.log("Welcome email sent:", info.response);
  });
};

export const sendEmailVerificationEmail = async (
  userEmail: string,
  verificationLink: string,
) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: `Welcome to Our App ${userEmail} - Please Verify Your Email`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Verify Your Email</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f4; padding:20px 0;">
    <tr>
      <td align="center">

        <table width="500" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:#4f46e5; color:#ffffff; padding:20px; text-align:center; font-size:22px; font-weight:bold;">
              Verify Your Email
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; color:#333333; font-size:16px; line-height:1.5;">
              <p>Hello, ${userEmail?.split("@")[0]}</p>
              
              <p>Thank you for signing up! Please confirm your email address by clicking the button below.</p>

              <!-- Button -->
             <div style="text-align:center; margin:30px 0;">
              <a href="${verificationLink}" target="_blank"
                style="
                    background:#4f46e5;
                    color:#ffffff;
                    text-decoration:none;
                    padding:12px 25px;
                    border-radius:5px;
                    display:inline-block;
                    font-weight:bold;
                ">
                Verify Email
              </a>
            </div>

               <a href="${verificationLink}">${verificationLink}</a>

              <p>If you did not create an account, you can safely ignore this email.</p>

              <p>Thanks,<br/>Your Team MyStore</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb; text-align:center; padding:15px; font-size:12px; color:#888;">
              MyStore © 2026 Your Company. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`,
  };

  transporter.sendMail(mailOptions, (err: any, info: any) => {
    if (err) console.error("Error sending verification email:", err);
    else console.log("Verification email sent:", info.response);
  });
};
