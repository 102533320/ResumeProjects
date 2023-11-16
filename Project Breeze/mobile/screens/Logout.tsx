import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import * as React from "react";
import Cognito from "../auth/CognitoAuth";
import AuthContext from "../context/AuthContext";
export default function LogoutScreen({
  navigation,
}: RootStackScreenProps<"Logout">) {
  // onSignOut(() => navigation.navigate("Home"));

  const auth = React.useContext(AuthContext);
  Cognito.onSignOut(() => {
    auth["setUser"](null);
  });

  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => {
          Cognito.signOut();
        }}
      >
        Log out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    margin: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  button: {
    margin: 20,
    width: "80%",
    height: "7%",
    marginVertical: 10,
    justifyContent: "center",
    borderRadius: 15,
  },
  image: {
    width: 128,
    height: 128,
    marginBottom: 12,
  },
  input: {
    margin: 20,
    width: "80%",
    height: "7%",
    marginVertical: 10,
    justifyContent: "center",
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },
});
