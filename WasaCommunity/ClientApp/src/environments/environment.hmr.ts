export const environment = {
    production: false,
    hmr: true,
    baseUrl: "http://localhost:5000", //Change this to the address of your backend API if different from frontend address
    tokenUrl: "http://localhost:5000", //For IdentityServer/Authorization Server API. You can set to null if same as baseUrl
    loginUrl: "/Login"
   };
