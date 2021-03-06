import React from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Content, Body } from "native-base";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 100,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    borderRadius: 6,
    color: "#ffffff",
  },
});

const ProfileInfo = (props) => {
  //console.log(props);
  const user = props.user;
  const followers = props.user.Followers;
  const following = props.user.Following;

  function goToFollowers() {
    props.navigate("Follower", { user: user.googleID });
  }

  function goToFollowing() {
    props.navigate("Following", { user: user.googleID });
  }

  return (
    <Content padder>
      <View style={{ flexDirection: "row", padding: 8, paddingLeft: 25 }}>
        <Image
          source={{
            uri: user.ProfilePic,
          }}
          style={{
            height: 100,
            width: 100,
            borderRadius: 100,
          }}
        />
        <Body
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            paddingLeft: 30,
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>{user.Username}</Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{user.Trees} Trees Planted</Text>
          <TouchableOpacity onPress={goToFollowers}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{followers.length} Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToFollowing}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {following.length - 1} Following
            </Text>
          </TouchableOpacity>
        </Body>
      </View>
      <View>
        <Text style={{ fontSize: 18 }}> {user.Bio} </Text>
      </View>
    </Content>
  );
};

export default ProfileInfo;
