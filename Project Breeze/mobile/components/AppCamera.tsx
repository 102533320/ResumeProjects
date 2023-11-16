import { CameraType, Camera } from "expo-camera";
import React, { useState } from "react";
import { StyleSheet, View, Image, Modal } from "react-native";
import { moderateScale } from "../constants/Layout";
import AppButton from "./AppButton";
import Icon from "./Icon";

export default function AppCamera({
  visible,
  setVisible,
  image,
  setImage,
  functionType,
}) {
  const [type, setType] = useState(CameraType.front);
  const [cameraIsReady, setCameraIsReady] = useState(false);
  const [cameraRef, setCameraRef] = useState<Camera | null>(null);

  const toggleCamera = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const takePicture = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      setImage(uri);
    }
  };

  const retakePicture = () => {
    setImage("");
  };

  const submitPicture = () => {
    setVisible(false);
    if (functionType) {
      functionType({ image: image });
    }
  };

  const closeScreen = () => {
    setVisible(false);
    setImage("");
  };

  return (
    <Modal visible={visible} statusBarTranslucent>
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            width: "100%",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Icon
            name={"close"}
            iconColor="white"
            size={60}
            // borderRadius={40}
            backgroundColor="transparent"
            onPress={closeScreen}
          />
        </View>
        {/* Camera component */}
        {!image ? (
          <Camera
            onCameraReady={() => setCameraIsReady(true)}
            style={styles.camera}
            type={type}
            ratio={"3:4"}
            ref={(ref) => {
              cameraIsReady ? setCameraRef(ref) : undefined;
            }}
          />
        ) : (
          <Image
            source={{ uri: image }}
            style={{ width: "100%", aspectRatio: 3 / 4 }}
          />
        )}

        {!image ? (
          <View style={styles.buttonContainer}>
            <Icon
              name={"camera"}
              iconColor="transparent"
              size={80}
              borderRadius={40}
              backgroundColor="white"
              onPress={takePicture}
            />
            <Icon
              name={"camera-switch"}
              iconColor="white"
              size={60}
              borderRadius={30}
              backgroundColor="#444444"
              onPress={toggleCamera}
            />
          </View>
        ) : (
          <View style={styles.buttonsPostContainer}>
            <AppButton
              title="Ok"
              style={styles.button}
              onPress={submitPicture}
            />
            <AppButton
              title="Retry"
              style={styles.button}
              onPress={retakePicture}
            />
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "40%",
    aspectRatio: 2.5,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  camera: {
    width: "100%",
    aspectRatio: 3 / 4,
  },
  buttonContainer: {
    width: "75%",
    marginLeft: "25%",
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  buttonsPostContainer: {
    width: "100%",
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  text: {
    fontSize: moderateScale(24),
    fontWeight: "bold",
    color: "white",
  },
});
