import users from "./db";
export { fakeBackend };

function fakeBackend() {
  const realFetch = window.fetch;

  window.fetch = function (url, opts) {
    return new Promise((resolve, reject) => {
      setTimeout(handleRoute, 500);

      function handleRoute() {
        if (url.endsWith("/authenticate") && opts.method === "POST") {
          return authenticate();
        }
        return realFetch(url, opts)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
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
