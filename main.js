const serverUrl = "https://blrjwk58waec.usemoralis.com:2053/server";
const appId = "EWWUBg2MHRZEtrK8pWA9VRlcaobAAVglh8vKlTnJ";
Moralis.start({ serverUrl, appId });

async function init() {
  await Moralis.start({ serverUrl, appId });
  await Moralis.enableWeb3();
  await listAvailableTokens();
  currentUser = Moralis.User.current();
  if (currentUser) {
    document.getElementById("swap_button").disabled = false;
  }
}
async function listAvailableTokens() {
  const result = await Moralis.Plugins.oneInch.getSupportedTokens({
    chain: "eth", // The blockchain you want to use (eth/bsc/polygon)
  });
  console.log(result.tokens);
  tokens = result.tokens;
}

async function login() {
  let user = Moralis.User.current();
  if (!user) {
   try {
      user = await Moralis.authenticate({ signingMessage: "Getting it ready for ya!" })
      console.log(user)
      console.log(user.get('ethAddress'))
   } catch(error) {
     console.log(error)
   }
  }
}

async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
}

function openModal(){
  document.getElementById("token_modal").style.display = "block";
}
function closeModal(){
  document.getElementById("token_modal").style.display = "none";
}

document.getElementById("modal_close").onclick = closeModal;
document.getElementById("from_token_select").onclick = openModal;

document.getElementById("login_button").onclick = login;
// document.getElementById("btn-logout").onclick = logOut;
