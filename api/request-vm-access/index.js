const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async function (context, req) {
  const { firstName, lastName, email } = req.body;

  if (!firstName || !lastName || !email) {
    context.res = {
      status: 400,
      body: 'Missing required fields.',
    };
    return;
  }

  const username = (firstName[0] + lastName).toLowerCase();
  const password = Math.random().toString(36).slice(-8);

  const message = {
    to: email,
    from: 'noreply@yourdomain.com',
    subject: 'Azure VM Access Credentials',
    html: `<p>Hello ${firstName},</p>
           <p>Your Azure VM access has been granted.</p>
           <p><strong>Username:</strong> ${username}</p>
           <p><strong>Password:</strong> ${password}</p>
           <p>Login via Remote Desktop. Let us know if you need help.</p>`
  };

  try {
    await sgMail.send(message);
    context.res = {
      status: 200,
      body: { message: 'Email sent successfully' }
    };
  } catch (err) {
    context.res = {
      status: 500,
      body: 'Failed to send email.'
    };
  }
};
