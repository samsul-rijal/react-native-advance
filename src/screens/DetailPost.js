import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  RefreshControl,
} from "react-native";
import { ListItem, Avatar } from "react-native-elements";

// Import Axios
import axios from "axios"

const PostDetail = ({route}) => {
  //init Props
  console.log(route.params);

  const { id, title, body } = route.params

  //Init State
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Create LifeCycle
  //Function Exception
  useEffect(() => {
    getComment()
  }, [])

  // Create Function to fetch

  const getComment = () => {
    setIsLoading(true)

    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    .then((res) => {
      setComments(res.data)
      setIsLoading(false)
    })
    .catch(() => {
      allert("Error Get Comments")
      setIsLoading(false)
    })

  }



  //   Create Component List
  const _renderItem = ({item}) => {
    return (
      <ListItem key={item.id} bottomDivider>
        <ListItem.Content>
          <ListItem.Title numberOfLines={1}>{item.email}</ListItem.Title>
          <ListItem.Subtitle>{`${item.name} - ${item.body}`}</ListItem.Subtitle>
        </ListItem.Content>   
      </ListItem>
    )
  }




  return (
    <View style={style.container}>
      <Text h2 style={{ fontWeight: "bold" }}>
        {title}
      </Text>
      
      <Text>{body}</Text>
      <Text>Comment</Text>

      <FlatList 
        data={comments}
        renderItem={_renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={getComment} />
        }
      
      />
    </View>
  );
};

export default PostDetail;

const style = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    padding: 16,
    flex: 1,
  },
});
