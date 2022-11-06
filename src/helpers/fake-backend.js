export { fakeBackend };

function fakeBackend() {
  let users = [
    {
      id: 1,
      email: "test@email.ru",
      password: "password1",
      firstName: "Name",
      lastName: "Surname",
    },
    {
      id: 2,
      email: "test2@email.ru",
      password: "password2",
      firstName: "Name2",
      lastName: "Surname2",
    },
  ];
  let realFetch = window.fetch;

  window.fetch = function (url, opts) {
    return new Promise((resolve, reject) => {
      // timeout to simulate server api call
      setTimeout(handleRoute, 500);

      function handleRoute() {
        switch (true) {
          case url.endsWith("/authenticate") && opts.method === "POST":
            return authenticate();
          default:
            return realFetch(url, opts)
              .then((response) => resolve(response))
              .catch((error) => reject(error));
        }
      }

      function authenticate() {
        const { username, password } = body();
        const user = users.find(
          (x) => x.email === username && x.password === password
        );

        if (!user) return error("The email address or password is incorrect");

        return ok({
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        });
      }

      function ok(body) {
        resolve({
          ok: true,
          text: () => Promise.resolve(JSON.stringify(body)),
        });
      }

      function error(message) {
        resolve({
          status: 400,
          text: () => Promise.resolve(JSON.stringify({ message })),
        });
      }

      function body() {
        return opts.body && JSON.parse(opts.body);
      }
    });
  };
}
