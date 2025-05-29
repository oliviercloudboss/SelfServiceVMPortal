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

  context.log("Generated credentials:", username, password);

  context.res = {
    status: 200,
    body: {
      username,
      password,
    },
  };
};
