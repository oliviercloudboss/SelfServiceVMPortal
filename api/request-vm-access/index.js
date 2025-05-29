module.exports = async function (context, req) {
  const { firstName, lastName, email } = req.body || {};

  if (!firstName || !lastName || !email) {
    context.res = {
      status: 400,
      body: { error: "Missing required fields." }
    };
    return;
  }

  // Simulated VM Access Logic (replace with real logic or email send)
  context.log(`VM access requested by ${firstName} ${lastName} (${email})`);

  context.res = {
    status: 200,
    headers: { "Content-Type": "application/json" },
    body: { message: `VM access request submitted for ${firstName} ${lastName}` }
  };
};
