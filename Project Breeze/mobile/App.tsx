import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import AuthNavigation from "./navigation/AuthNavigator";
import AuthDetailsNavigation from "./navigation/AuthDetailsNavigator";
import Index from "./navigation/index";
import Settings from "./navigation/HomeNavigator";
import Cognito from "./auth/CognitoAuth";
import AuthContext from "./context/AuthContext";
import { fetchInterests } from "./api/interests";
import { DarkModeProvider } from "./context/DarkModeContext";

export default function App() {
  const [user, setUser] = useState(null);

  const navigationHandler = (user: any) => {
    if (user) {
      if (user["custom:completed"] === "true") {
        console.log("HOME");
        return <Index />;
      }
      console.log("DETAILS");
      return <AuthDetailsNavigation />;
    }
    console.log("LOGIN");
    return <AuthNavigation />;
  };

  const restoreResources = async () => {
    Cognito.isAuthenticated()
      .then(({ attributes }) => {
        if (attributes["custom:completed"] === "true") {
          setUser(attributes);
        } else return Cognito.signOut();
      })
      .catch((err) => {
        console.log(err);
      });
    await fetchInterests();
  };

  const isLoadingComplete = useCachedResources(restoreResources);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <DarkModeProvider>
        <AuthContext.Provider value={{ user, setUser }}>
          <SafeAreaProvider>
            <NavigationContainer>{navigationHandler(user)}</NavigationContainer>
          </SafeAreaProvider>
        </AuthContext.Provider>
      </DarkModeProvider>
    );
  }
}
