import React, { useEffect } from "react";
import HomeLayout from "./Layout/HomeLayout";
import { useAppDispatch, useAppSelector } from "./Redux/hooks";
import { RootState } from "./Redux/store";
import { injectStyles } from "./Utils/injectStyles";
import { authenticateUser } from "./Utils/logInUser";
import { useLogInMutation } from "./apis/authApi";
import useSocket from "./apis/websocket";
import { createTestData } from "./DB/testScript";
import { verifyData } from "./DB/verifyScript";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { joinRoom, listenNewInvite } = useSocket();
  const activeUser = useAppSelector((state: RootState) => state.activeUser);
  const currentUserId = useAppSelector(
    (state: RootState) => state.activeUser.id
  );
  const currentUserRoom = useAppSelector(
    (state: RootState) => state.activeUser.id
  );
  const [logIn] = useLogInMutation();

  // for test purpose
  // const userCredentials = {
  //   user_id: "2",
  //   client_email: "hr@wafer.ee",
  //   client_name: "Wafer",
  //   email: "mayur@wafer.ee",
  //   firstName: "Mayur",
  //   lastName: "Wafer",
  //   role: "Developer",
  //   profile_pic_url:
  //     "https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-309.jpg",
  // };

  const userCredentials = {
    user_id: "2",
    client_email: "hr@wafer.ee",
    client_name: "Wafer",
    email: "kanishk@wafer.ee",
    firstName: "kanishk",
    lastName: "Wafer",
    role: "Developer",
    profile_pic_url:
      "https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-309.jpg",
  };

  useEffect(() => {
    if (!activeUser || !activeUser.id) {
      /* Authenticate the user
       client will have to use authenticateUser function and pass login credentials to login*/
      authenticateUser(userCredentials)
        .then(() => {
          console.log("User authenticated successfully.");
        })
        .catch((error) => {
          console.error("Authentication failed:", error);
        });
    }
  }, [activeUser, dispatch, logIn]);
  const {
    bgColorDark,
    accentColorDark,
    textColorPrimaryDark,
    textColorSecondaryDark,
    bgColorLight,
    accentColorLight,
    textColorPrimaryLight,
    textColorSecondaryLight,
    focusColorPrimary,
    focusColorSecondary,
    fontSize,
    isDarkMode,
  } = useAppSelector((state: RootState) => state.theme);

  useEffect(() => {
    injectStyles(
      bgColorDark,
      accentColorDark,
      textColorPrimaryDark,
      textColorSecondaryDark,
      bgColorLight,
      accentColorLight,
      textColorPrimaryLight,
      textColorSecondaryLight,
      focusColorPrimary,
      focusColorSecondary,
      fontSize,
      isDarkMode
    );
  }, [
    bgColorDark,
    accentColorDark,
    textColorPrimaryDark,
    textColorSecondaryDark,
    bgColorLight,
    accentColorLight,
    textColorPrimaryLight,
    textColorSecondaryLight,
    focusColorPrimary,
    focusColorSecondary,
    fontSize,
    isDarkMode,
  ]);

  const activeUserRoom = `${activeUser?.client?.email.split('@')[0]}_${activeUser?.email.split('@')[0]}`;
  console.log(activeUserRoom);
  useEffect(() => {
    if (currentUserId) {
      joinRoom(activeUserRoom);
    }
  }, [currentUserId]);

  useEffect(() => {
      listenNewInvite();
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  //indexedDB test
  // createTestData();
  verifyData();

  return <HomeLayout />;
};

export default App;
