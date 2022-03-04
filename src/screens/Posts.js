import React from "react";
import { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

// Import Axios
import axios from "axios"

const Posts = ({navigation}) => {
  //Init State
  const [post, setPost] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Create LifeCycle
  //Function Exception
  useEffect(() => {
    getPost()
  }, [])

  // Create Function to fetch
  const getPost = () => {
    setIsLoading(true)

    axios.get("https://jsonplaceholder.typicode.com/posts")
    .then((res) => {
      setPost(res.data)
      setIsLoading(false)
    })
    .catch(() => {
      allert("Error Fetch Data")
      setIsLoading(false)
    })

  }


  //   Create Component List
  const _renderItem = ({item}) => {
    return (
      <ListItem
        onPress={() => navigation.navigate("DetailPost", item)}
        key={item.id}
        bottomDivider
      >

        <Avatar 
          rounded
          title={item.title.slice(0, 2)}
          containerStyle={{ backgroundColor: "black"}}
        />

        <ListItem.Content>
          <ListItem.Title h4 numberOfLines={1}>
            {item.title}
          </ListItem.Title>
          <ListItem.Subtitle numberOfLines={2}>{item.body}</ListItem.Subtitle>
        </ListItem.Content>

      </ListItem>


    )


  }



  return (
    <View style={style.container}>
      <View>
      
        {/* Render Component List */}
        <FlatList 
          data={post}
          renderItem={_renderItem}
          keyExtractor={(item) => item.id}
          refreshing={isLoading}
          onRefresh={getPost}        
        />

      </View>
    </View>
  );
};

export default Posts;

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
});
