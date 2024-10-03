import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
// auth
import * as WebBrowser from 'expo-web-browser';
import { useAuthRequest, exchangeCodeAsync, revokeAsync, ResponseType, TokenResponse } from 'expo-auth-session';
import { AWS_COGNITO_CONFIG } from '@/src/auth/cognitoAuthConfig';
import * as AuthSession from 'expo-auth-session';


// in app expo web browser (for security but within app for seamlesness)
WebBrowser.maybeCompleteAuthSession();

export default function AuthScreen() {
  const [authTokens, setAuthTokens] = useState<TokenResponse | null>(null);

  // the cognito endpoints revolving around tokens
  const discoveryDocument = useMemo( // useMemo for optimization
    () => ({
      authorizationEndpoint: `${AWS_COGNITO_CONFIG.userPoolUrl}/oauth2/authorize`,
      tokenEndpoint: `${AWS_COGNITO_CONFIG.userPoolUrl}/oauth2/token`,
      revocationEndpoint: `${AWS_COGNITO_CONFIG.userPoolUrl}/oauth2/revoke`,
    }),
    []
  );

  // the actual results array from activating the useAuthRequest func which comes from expo-auth-session
  // responsible for loading in all required values to request an auth code
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: AWS_COGNITO_CONFIG.clientId,
      responseType: ResponseType.Code,
      redirectUri: AWS_COGNITO_CONFIG.redirectUri,
      usePKCE: true, // Enable Proof Key for Code Exchange (PKCE)
      state: 'N7A69NWUJc'
    },
    discoveryDocument
  );
  console.log(request?.state)

  useEffect(() => {
    // exchangeTokenReq is empty obj passed into exchangeCodeAsync (expo auth session func) to populate it with the result using the discovery doc
    // as leverage to obtain the right info
    // function activates within useEffect (defining an empty exchangeTokenReq obj) and populating it based on exchange code using the cognito endpoints
    const handleTokenExchange = async (exchangeTokenReq: {
        clientId: string;
        code: string;
        redirectUri: string;
        extraParams: {
          code_verifier: string;
        };
    }) => {
      try {
        const tokenResponse = await exchangeCodeAsync(
          exchangeTokenReq,
          discoveryDocument
        );
        setAuthTokens(tokenResponse);
          console.log("response", tokenResponse?.state)
      } catch (error) {
        console.error('Token exchange failed:', error);
      }
    };

    if (response) {
      if (response.type === 'success' && request?.codeVerifier) {
        handleTokenExchange({
          clientId: AWS_COGNITO_CONFIG.clientId,
          code: response.params.code,
          redirectUri: AWS_COGNITO_CONFIG.redirectUri,
          extraParams: {
            code_verifier: request?.codeVerifier,
          },
        });
      } else if (response.type === 'error') {
        Alert.alert('Authentication error', response.params.error_description || 'Something went wrong');
        return;
      }

    }
  }, [discoveryDocument, request, response]);

  const logout = async () => {
    if (authTokens?.refreshToken) {
      const revokeResponse = await revokeAsync(
        {
          clientId: AWS_COGNITO_CONFIG.clientId,
          token: authTokens.refreshToken,
        },
        discoveryDocument
      );
      if (revokeResponse) {
        setAuthTokens(null);
      }
    }
  };

  return (
    <View style={styles.container}>
      {authTokens ? (
        <>
          <Text style={styles.welcomeText}>Welcome! You are logged in.</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity 
          style={styles.googleButton} 
          onPress={() => promptAsync()} // This is where you initiate the authentication flow
          disabled={!request}
        >
            <Text style={styles.buttonText}>Google Sign In</Text>
            <FontAwesome name="google" size={40} color="#FFFFFF"/>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButton: {
    backgroundColor: '#4285F4', // Google Blue
    padding: 8,
    paddingLeft: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  logoutButton: {
    backgroundColor: '#d9534f', // A red color for the logout button
    padding: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 20,
  },
});
