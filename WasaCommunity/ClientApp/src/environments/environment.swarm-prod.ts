// =============================
// Email: isak.vidinghoff@gmail.com
// www.isakvidinghoff.com
// =============================


export const environment = {
  production: true,
  hmr: false,
  baseUrl: "http://wasacommunity_dotnetcore:5000", //Change this to the address of your backend API if different from frontend address
  tokenUrl: null, //For IdentityServer/Authorization Server API. You can set to null if same as baseUrl
  loginUrl: "/Login"
};
