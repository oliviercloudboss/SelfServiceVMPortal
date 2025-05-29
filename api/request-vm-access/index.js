const { default: fetch } = require("node-fetch");
const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");

module.exports = async function (context, req) {
  const { firstName, lastName, email } = req.body;

  if (!firstName || !lastName || !email) {
    context.res = {
      status: 400,
      body: "Missing required fields.",
    };
    return;
  }

  const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
  const password = Math.random().toString(36).slice(-8);

  const connectionString = process.env.AzureWebJobsStorage;
  const tableName = "AccessRequests";

  const credential = AzureNamedKeyCredential.fromConnectionString(connectionString);
  const client = new TableClient(`https://${process.env.STORAGE_ACCOUNT_NAME}.table.core.windows.net`, tableName, credential);

  await client.createEntity({
    partitionKey: "Requests",
    rowKey: new Date().getTime().toString(),
    firstName,
    lastName,
    email,
    username,
  });

  const sendgridKey = process.env.SENDGRID_API_KEY;
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(sendgridKey);

  await sgMail.send({
    to: email,
    from: "noreply@yourdomain.com", // ✅ Set this to your verified sender
    subject: "Your Azure VM Access",
    html: `<p>Hello ${firstName},</p>
           <p>Your VM login credentials are:</p>
           <ul>
             <li>Username: <strong>${username}</strong></li>
             <li>Password: <strong>${password}</strong></li>
           </ul>
           <p>Use Remote Desktop (RDP) to connect to the VM.</p>`,
  });

  context.res = {
    status: 200,
    body: "Access request processed successfully.",
  };
};
