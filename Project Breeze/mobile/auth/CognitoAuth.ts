import { Auth, Hub, Amplify, Storage } from "aws-amplify";
import awsconfig from "../src/aws-exports";
Amplify.configure(awsconfig);

const deleteUser = () => Auth.deleteUser();

const signIn = (username: string, password: string) =>
  Auth.signIn(username, password);

const signOut = async () => {
  try {
    return await Auth.signOut();
  } catch (error) {
    return error;
  }
};

const signUp = (
  username: string,
  password: string,
  email?: string,
  phone_number?: string
) =>
  Auth.signUp({
    username,
    password,
    attributes: {
      email, // optional
      phone_number, // optional - E.164 number convention
      "custom:completed": "false",
    },
    autoSignIn: {
      // optional - enables auto sign in after user is confirmed
      enabled: true,
    },
  });

const forgotPassword = async (username: string) =>
  Auth.forgotPassword(username);

const forgotPasswordSubmit = async (
  username: string,
  code: string,
  newPassword: string
) => Auth.forgotPasswordSubmit(username, code, newPassword);

const confirmSignUp = (username: string, code: string) =>
  Auth.confirmSignUp(username, code);

const resendConfirmationCode = (username: string) =>
  Auth.resendSignUp(username);

const isAuthenticated = () =>
  Auth.currentAuthenticatedUser({
    bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  });

//onSignIn call after successful sign in
const onSignIn = (callBack?: (data) => void) => {
  Hub.listen("auth", ({ payload }) => {
    const { event } = payload;
    if (event === "signIn") {
      callBack?.(payload.data);
    } else if (event === "signIn_failure") {
      // console.log("Sign in failed");
    }
  });
};
const onSignOut = (callBack?: () => void) => {
  Hub.listen("auth", ({ payload }) => {
    const { event } = payload;
    if (event === "signOut") {
      callBack?.();
    } else if (event === "signOut_failure") {
      // console.log("Sign in failed");
    }
  });
};

//AutoSignInEvent call after successful signUp confirmation
const onAutoSignIn = (callBack?: (user) => void) => {
  Hub.listen("auth", ({ payload }) => {
    const { event } = payload;
    if (event === "autoSignIn") {
      const user = payload.data;
      console.log(user);
      callBack?.(user);
    } else if (event === "autoSignIn_failure") {
      // console.log("Auto sign in failed");
    }
  });
};

//SignUp event call after successful entry created on Cognito
const onSignUp = (callBack?: () => void) => {
  Hub.listen("auth", ({ payload }) => {
    const { event } = payload;
    if (event === "signUp") {
      callBack?.();
    } else if (event === "signUp_failure") {
      // console.log("Sign up failed");
    }
  });
};

// const OAuthSignIn = () =>
//   Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google });

const completeSignup = async () => {
  const user = await Auth.currentAuthenticatedUser();
  return await Auth.updateUserAttributes(user, {
    "custom:completed": "true",
  });
};

const uploadObject = async (filePath, fileName, userId) => {
  try {
    const response = await fetch(filePath);
    const blob = await response.blob();
    const result = await Storage.put(userId + ":" + fileName, blob, {
      level: "public",
      cacheControl: "cache"
    });

    if (result) {
      console.log(result);
    }
  } catch (error) {
    console.log("Error uploading file: ", error);
  }
};

const getObject = async (userId, fileName) => {
  const result = await Storage.get(userId + ":" + fileName, {
    level: "public",
    expires: 3600
  });

  if (result) {
    return result;
  }

  return null;
};

export default {
  deleteUser,
  uploadObject,
  getObject,
  signIn,
  signOut,
  signUp,
  forgotPassword,
  forgotPasswordSubmit,
  confirmSignUp,
  resendConfirmationCode,
  isAuthenticated,
  onSignIn,
  onSignOut,
  onAutoSignIn,
  onSignUp,
  // OAuthSignIn,
  completeSignup,
};
