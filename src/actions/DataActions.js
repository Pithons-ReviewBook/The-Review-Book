import firebase from "firebase";
import deptArray from "../utilities/DepartmentData";

export const fetchTeachersList = () => {
  return async (dispatch) => {
    firebase
      .firestore()
      .collection("teacherslist")
      .doc("list")
      .get()
      .then((doc) => {
        if (doc.exists) dispatch({ type: "FETCHLIST", Data: doc.data().data });
      })
      .catch((err) => console.log(err.message));
  };
};
// Action to fetch data of specific searched teacher
export const setLocalRating = () => {
  return async (dispatch) => {
    dispatch({ type: "ZERO_RATING" });
  };
};
// Action to pass selected teacher data in MainScreen to the TeacherProfileScreen
export const showSelectedTeacherData = (data, navigation) => {
  return async (dispatch) => {
    firebase
      .firestore()
      .collection("teachers")
      .doc(data)
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          let temp = snapshot.data();
          temp.id = snapshot.id;
          let found = deptArray.filter((element) => {
            if (element.code === temp.dept) return element.title;
          });
          temp.dept = found[0].title;
          dispatch({
            type: "SHOW_DATA",
            Data: { teacherData: temp },
          });
          navigation.navigate("TeacherProfile");
        }
      })
      .catch((error) => console.log(error.message))
      .finally(() => {
        setLoading(false);
      });
  };
};

export const fetchTeacherData = (id) => {
  return async (dispatch) => {
    firebase
      .firestore()
      .collection("comments")
      .doc(id)
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          dispatch({
            type: "COMMENT_DATA",
            newData: snapshot.data().comments,
          });
        }
      })
      .catch((error) => console.log(error.message));
  };
};

export const fetchTeacherRating = (tId, sId) => {
  return async (dispatch) => {
    firebase
      .firestore()
      .collection("ratings")
      .where("tEmail", "==", tId)
      .where("sEmail", "==", sId)
      .onSnapshot((snapshot) => {
        dispatch({
          type: "ZERO_RATING",
        });
        snapshot.forEach((doc) => {
          dispatch({
            type: "RATING_FETCHED",
            newData: doc.data().rating,
          });
        });
      })
      .catch((error) => console.log(error.message));
  };
};
export const serachByDept = (deptCode, setLoading) => {
  return async (dispatch) => {
    const data = [];
    firebase
      .firestore()
      .collection("teachers")
      .where("dept", "==", deptCode)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let temp = doc.data();
          temp.id = doc.id;
          let found = deptArray.filter((element) => {
            if (element.code === temp.dept) return element.title;
          });
          temp.dept = found[0].title;
          data.push(temp);
        });
      })
      .catch((error) => console.log(error.message))
      .finally(() => {
        setLoading(false);
        dispatch({
          type: "SEARCH_TEACHER",
          newData: data,
        });
      });
  };
};

export const sendComment = (commentData, id) => {
  return async (dispatch) => {
    firebase
      .firestore()
      .collection("comments")
      .doc(id)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion(commentData),
      })
      .then(() => {
        firebase
          .firestore()
          .collection("teachers")
          .doc(id)
          .update({
            commentCount: firebase.firestore.FieldValue.increment(1),
          })
          .catch((error) => console.log(error.message));
      })
      .catch((error) => console.log(error.message));
  };
};

export const setRating = (ratingData, tId, sId) => {
  return async (dispatch) => {
    const data = {
      sEmail: sId,
      tEmail: tId,
      rating: ratingData,
      timeStamp:
        new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
    };
    firebase
      .firestore()
      .collection("ratings")
      .doc()
      .set(data)
      .then(() => {
        firebase
          .firestore()
          .collection("teachers")
          .doc(tId)
          .update({
            totalRating: firebase.firestore.FieldValue.increment(ratingData),
            ratingCount: firebase.firestore.FieldValue.increment(1),
          })
          .then(() => {
            dispatch({ type: "RATING_SET", newData: ratingData });
          })
          .catch((error) => console.log(error.message));
      })
      .catch((error) => console.log(error.message));
  };
};
