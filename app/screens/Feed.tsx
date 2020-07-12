import React, { useState, useEffect, useContext } from "react";
import { Container, Content, Text, View } from "native-base";
import { ScrollView, RefreshControl, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { AuthContext } from "../AuthContext";
import PostCard from "../components/PostCard";
import FeedList from "../components/FeedList";

const axios = require("axios").default;

const Feed = () => {
  const auth = useContext(AuthContext);
  let [refreshing, setRefreshing] = useState(false);
  let [feed, setFeed] = useState(null);

  const fetchData = React.useCallback(async () => {
    setRefreshing(true);
    const result = await axios(
      `https://productivitree.wl.r.appspot.com/api/v1/users/${auth.googleID}`
    );
    const following = result.data.payload.Following;
    const response = await axios(
      `https://productivitree.wl.r.appspot.com/api/v1/posts`
    );
    const posts = response.data.payload;
    const newFeed: [] = [];
    posts.forEach((post: { Author: String }) => {
      let author = post.Author;
      if (following.includes(author)) {
        newFeed.push(post);
      }
    });
    setFeed(newFeed.reverse());
    setRefreshing(false);
  }, []);

  useEffect(() => {
    async function loadData() {
      await fetchData();
    }
    loadData();
  }, []);

  return (
    <LinearGradient
      colors={["#C8F0EE", "#c8e2f1", "#A1C6F1"]}
      style={{ flex: 1 }}
    >
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => await fetchData()}
          />
        }
      >
        {feed && <FeedList posts={feed} />}
      </ScrollView>
    </LinearGradient>
  );
};

export default Feed;
