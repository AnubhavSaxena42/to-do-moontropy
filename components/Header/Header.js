import React from "react";
import { Image, StyleSheet, View } from "react-native";
import logo from "../../assets/techolution.png";
const Header = () => {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#221F22",
  },
  logo: {
    width: 172,
    height: 60,
  },
});
