import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  Dimensions,
} from "react-native";
import {
  Searchbar,
  Card,
  Title,
  ActivityIndicator,
  List,
  Avatar,
  IconButton,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import color from "../config/colors";
import deptArray from "../utilities/DepartmentData";
import {
  searchTeacher,
  serachByDept,
  showSelectedTeacherData,
  fetchTeacherData,
  fetchTeacherRating,
} from "../actions/DataActions";

function MainScreen(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showBackButton, setShowBackButton] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [itemsBlur, setItemsBlur] = useState(false);

  const profileComments = useSelector((state) => state.Data.comments);
  const [teacherList, setTeacherList] = useState([]);
  const list = useSelector((state) => state.Data.list);
  const sID = useSelector((state) => state.Auth.user.email);
  const dispatch = useDispatch();

  //-------Handlers---------//
  const onChangeSearch = (query) => {
    if (searchQuery.length == 0) {
      setTeacherList([]);
    }
    if (query.slice(-1) === " ") onSubmitHandle();
    setSearchQuery(query);
  };

  const onSubmitHandle = () => {
    setLoading(true);
    const toFind = searchQuery.toLowerCase();

    //TODO need to neat coding on this portion
    setTeacherList(
      list.filter((v) => (v = v.name.toLowerCase().includes(toFind)))
    );

    //console.log("list:" + teacherList + teacherList.length);
    //TODO need to fix the loading timing
    setLoading(false);

    if (teacherList.length < 0) {
      // TODO if the filter fail then print msg
    }
  };

  const loadingHandler = (decision) => {
    setItemsBlur(decision);
  };

  const onShowHandler = (tdata) => {
    profileComments.length = 0;
    dispatch(fetchTeacherData(tdata.id));
    dispatch(showSelectedTeacherData(tdata.id));
    dispatch(fetchTeacherRating(tdata.id, sID));
  };

  const onCardPress = (deptcode) => {
    setLoading(true);
    dispatch(serachByDept(deptcode, setLoading));
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={color.primary} />

      <View style={styles.mainView}>
        {showBackButton == true ? (
          <IconButton
            icon="arrow-left"
            color={color.primary}
            size={30}
            onPress={() => {
              loadingHandler(false);
              setShowBackButton(false);
              setSearchQuery("");
            }}
            style={{ backgroundColor: color.white, marginLeft: 45 }}
          />
        ) : null}

        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
          onSubmitEditing={() => {
            setShowBackButton(true);
            onSubmitHandle();
          }}
          onTextInput={() => {
            if (searchQuery === "") {
              loadingHandler(false);
              setShowBackButton(false);
            } else {
              loadingHandler(true);
              setShowBackButton(true);
            }
          }}
          iconColor={color.primary}
          onTouchCancel={() => console.log(searchQuery)}
        />
      </View>

      <View style={styles.cardView}>
        {itemsBlur == true ? (
          <>
            <ActivityIndicator animating={isLoading} color={color.primary} />
            <FlatList
              data={teacherList}
              keyExtractor={(key) => key.id.toString()}
              renderItem={({ item }) => (
                <List.Item
                  title={item.name}
                  left={(props) => (
                    <Avatar.Icon
                      size={50}
                      icon="magnify"
                      color={color.primary}
                      style={{
                        backgroundColor: color.white,
                        borderColor: color.primary,
                        borderWidth: 0.1,
                      }}
                    />
                  )}
                  onPress={() => {
                    onShowHandler(item);
                    props.navigation.navigate("TeacherProfile");
                  }}
                  rippleColor={color.primaryLight}
                />
              )}
            />
          </>
        ) : (
          <FlatList
            data={deptArray}
            keyExtractor={(key) => key.id.toString()}
            ListFooterComponent={
              <View
                style={{ height: Dimensions.get("screen").height * 0.15 }}
              />
            }
            renderItem={({ item }) => (
              <Card
                onPress={() => {
                  loadingHandler(true);
                  setShowBackButton(true);
                  onCardPress(item.code);
                }}
                style={styles.card}
              >
                <Card.Cover source={item.uri} />
                <Card.Content>
                  <Title style={{ color: color.primary }}>{item.title}</Title>
                </Card.Content>
              </Card>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: color.white,
    overflow: "hidden",
  },
  mainView: {
    flexDirection: "row",
    alignItems: "center",
    height: Dimensions.get("screen").height * 0.1,
    width: "100%",
    justifyContent: "center",
  },
  searchBar: {
    width: "95%",
    borderRadius: 20,
  },
  cardView: {
    height: Dimensions.get("screen").height * 0.9,
    width: "100%",
  },
  card: {
    height: 270,
    width: "95%",
    marginBottom: 10,
    alignSelf: "center",
  },
});
export default MainScreen;
