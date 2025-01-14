// import { useState, useMemo, useEffect } from 'react';
// import * as WebBrowser from 'expo-web-browser';
// import { useAuthRequest, exchangeCodeAsync, revokeAsync, ResponseType } from 'expo-auth-session';
// import { Button, Alert } from 'react-native';

// WebBrowser.maybeCompleteAuthSession();

// const clientId = '<your-client-id-here>';
// const userPoolUrl =
//   'https://<your-user-pool-domain>.auth.<your-region>.amazoncognito.com';
// const redirectUri = 'your-redirect-uri';

// export default function App() {
//   const [authTokens, setAuthTokens] = useState(null);
//   const discoveryDocument = useMemo(() => ({
//     authorizationEndpoint: userPoolUrl + '/oauth2/authorize',
//     tokenEndpoint: userPoolUrl + '/oauth2/token',
//     revocationEndpoint: userPoolUrl + '/oauth2/revoke',
//   }), []);

//   const [request, response, promptAsync] = useAuthRequest(
//     {
//       clientId,
//       responseType: ResponseType.Code,
//       redirectUri,
//       usePKCE: true,
//     },
//     discoveryDocument
//   );

//   useEffect(() => {
//     const exchangeFn = async (exchangeTokenReq) => {
//       try {
//         const exchangeTokenResponse = await exchangeCodeAsync(
//           exchangeTokenReq,
//           discoveryDocument
//         );
//         setAuthTokens(exchangeTokenResponse);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     if (response) {
//       if (response.error) {
//         Alert.alert(
//           'Authentication error',
//           response.params.error_description || 'something went wrong'
//         );
//         return;
//       }
//       if (response.type === 'success') {
//         exchangeFn({
//           clientId,
//           code: response.params.code,
//           redirectUri,
//           extraParams: {
//             code_verifier: request.codeVerifier,
//           },
//         });
//       }
//     }
//   }, [discoveryDocument, request, response]);

//   const logout = async () => {
//     const revokeResponse = await revokeAsync(
//       {
//         clientId: clientId,
//         token: authTokens.refreshToken,
//       },
//       discoveryDocument
//     );
//     if (revokeResponse) {
//       setAuthTokens(null);
//     }
//   };
//   console.log('authTokens: ' + JSON.stringify(authTokens));
//   return authTokens ? (
//     <Button title="Logout" onPress={() => logout()} />
//   ) : (
//     <Button disabled={!request} title="Login" onPress={() => promptAsync()} />
//   );
// }
