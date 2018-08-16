// =============================
// Email: isak.vidinghoff@gmail.com
// www.isakvidinghoff.com
// =============================

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  hmr: false,
  baseUrl: "http://localhost:5000", //Change this to the address of your backend API if different from frontend address
  tokenUrl: "http://localhost:5000", //For IdentityServer/Authorization Server API. You can set to null if same as baseUrl
  loginUrl: "/Login"
};
