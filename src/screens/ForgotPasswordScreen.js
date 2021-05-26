import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { Avatar, Button, TextInput } from "react-native-paper";

import colors from "../config/colors";

const height = Dimensions.get("screen").height;

function ForgotPasswordScreen({}) {
  const [email, setEmail] = useState();
  const handleContinue = () => {};
  const handleResend = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View
          style={{
            justifyContent: "flex-end",
            flex: 1,
            borderRadius: 45,
            top: 50,
            overflow: "hidden",
          }}
        >
          <Image
            source={require("../assets/lock.png")}
            style={{
              height: 90,
              width: 90,
            }}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.msgText}>
          Please enter your email address. We will send you an email to reset
          your password
        </Text>

        <TextInput
          mode="flat"
          label="Enter your email"
          value={email}
          onChangeText={(email) => setEmail(email)}
          placeholder="xxxx-xxx-xxx@cuilahore.edu.pk"
          keyboardType="email-address"
          style={styles.textField}
          theme={{
            colors: { primary: colors.primary },
          }}
        />

        <Button
          mode="contained"
          onPress={handleContinue}
          style={styles.button}
          theme={{
            colors: { primary: colors.primary },
          }}
        >
          continue
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  button: {
    borderRadius: 20,
    width: "100%",
    marginTop: 30,
  },
  topContainer: {
    alignItems: "center",
    height: height * 0.25,
    backgroundColor: colors.primary,
  },
  topTitle: {
    color: colors.white,
    fontSize: 22,
    marginTop: 30,
    fontWeight: "bold",
  },
  textField: {
    backgroundColor: colors.white,
  },
  bottomContainer: {
    paddingTop: 80,
    height: height * 0.75,
    alignSelf: "center",
    width: "85%",
  },
  msgText: {
    color: colors.darkgrey,
    fontSize: 18,
    textAlign: "center",
    marginBottom: 40,
  },
});

export default ForgotPasswordScreen;
