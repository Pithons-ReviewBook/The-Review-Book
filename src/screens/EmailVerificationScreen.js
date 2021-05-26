import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Avatar, Button } from "react-native-paper";

import colors from "../config/colors";

const height = Dimensions.get("screen").height;

function EmailVerificationScreen({}) {
  const handleContinue = () => {};
  const handleResend = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.topTitle}>Email Verification</Text>
        <Avatar.Image
          size={80}
          source={require("../assets/email.png")}
          style={{
            justifyContent: "flex-end",
            flex: 1,
            top: 40,
          }}
          theme={{
            colors: { primary: colors.primary },
          }}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.msgText}>
          We just sent you the verification link. Please check your email and
          'continue' after verify.
        </Text>

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

        <View
          style={{
            flexDirection: "row",
            marginTop: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: colors.darkgrey, fontSize: 16 }}>
            {"Didn't get the link?  "}
          </Text>
          <TouchableOpacity onPress={handleResend}>
            <Text
              style={{
                color: "#5B7CDA",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Resend code
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.85,
    backgroundColor: colors.white,
  },
  button: {
    borderRadius: 20,
    width: "100%",
  },
  topContainer: {
    alignItems: "center",
    height: height * 0.2,
    backgroundColor: colors.primary,
  },
  topTitle: {
    color: colors.white,
    fontSize: 22,
    marginTop: 30,
    fontWeight: "bold",
  },
  bottomContainer: {
    paddingTop: 60,
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

export default EmailVerificationScreen;
