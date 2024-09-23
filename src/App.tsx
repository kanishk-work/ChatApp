import React, { useEffect } from "react";
import HomeLayout from "./Layout/HomeLayout";
import { useAppDispatch, useAppSelector } from "./Redux/hooks";
import { RootState } from "./Redux/store";
import { injectStyles } from "./Utils/injectStyles";
import { authenticateUser } from "./Utils/logInUser";
import { useLogInMutation } from "./apis/authApi";
import LoginPage from "./Pages/LoginPage";
import { LoginDetails } from "./Types/login";
import { shallowEqual } from "react-redux";
import useSocket from "./apis/websocket";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  // const { joinRoom } = useSocket();
  const activeUser = useAppSelector(
    (state: RootState) => state.activeUser,
    shallowEqual
  );
  const currentUserId = useAppSelector(
    (state: RootState) => state.activeUser.id,
    shallowEqual
  );
  const currentUserRoom = useAppSelector(
    (state: RootState) => state.activeUser.id,
    shallowEqual
  );
  const [logIn] = useLogInMutation();

  const chats = useAppSelector(
    (state: RootState) => state.chats.chats,
    shallowEqual
  );
  const { joinRoom } = useSocket();

  const activeUserRoom = `${activeUser?.client?.email.split("@")[0]}_${
    activeUser?.email.split("@")[0]
  }`;

  useEffect(() => {
    if (activeUser.id) {
      joinRoom(activeUserRoom);
    }
    chats?.forEach((chat: any) => {
      joinRoom(`${chat.chatSocket[0].socket_room}`);
    });
  }, [activeUser, chats, activeUserRoom]);
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

  // const userCredentials = {
  //   user_id: "2",
  //   client_email: "hr@wafer.ee",
  //   client_name: "Wafer",
  //   email: "kanishk@wafer.ee",
  //   firstName: "kanishk",
  //   lastName: "Wafer",
  //   role: "Developer",
  //   profile_pic_url:
  //     "https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-309.jpg",
  // };

  // useEffect(() => {
  //   if (!activeUser || !activeUser.id) {
  //     /* Authenticate the user
  //      client will have to use authenticateUser function and pass login credentials to login*/
  //     authenticateUser(userCredentials)
  //       .then(() => {
  //         console.log("User authenticated successfully.");
  //       })
  //       .catch((error) => {
  //         console.error("Authentication failed:", error);
  //       });
  //   }
  // }, [activeUser, dispatch, logIn]);

  const loginFn = (userCredentials: LoginDetails) => {
    if (!activeUser || !activeUser.id) {
      /* Authenticate the user
       client will have to use authenticateUser function and pass login credentials to login*/
      console.log(userCredentials);
      authenticateUser(userCredentials)
        .then(() => {
          console.log("User authenticated successfully.");
        })
        .catch((error) => {
          console.error("Authentication failed:", error);
        });
    }
  };
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
  } = useAppSelector((state: RootState) => state.theme, shallowEqual);

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

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  // if ('serviceWorker' in navigator && 'SyncManager' in window) {
  //   window.addEventListener('load', () => {
  //     navigator.serviceWorker
  //       .register('/service-worker.js')
  //       .then((registration: ServiceWorkerRegistration) => {
  //         console.log('Service Worker registered with scope:', registration.scope);

  //         // Check if `periodicSync` is available
  //         if ('periodicSync' in registration) {
  //           (registration as any).periodicSync
  //             .register('clear-local-storage', {
  //               minInterval: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  //             })
  //             .catch((err: any) => {
  //               console.error('Periodic Sync could not be registered:', err);
  //             });
  //         } else if ('sync' in registration) {
  //           // Fallback to SyncManager if Periodic Sync is not supported
  //           navigator.serviceWorker.ready.then((swRegistration: ServiceWorkerRegistration) => {
  //             (swRegistration as any).sync.register('clear-local-storage').catch((err: any) => {
  //               console.error('Background Sync could not be registered:', err);
  //             });
  //           });
  //         }
  //       })
  //       .catch((error: any) => {
  //         console.error('Service Worker registration failed:', error);
  //       });
  //   });
  // }

  window.addEventListener("beforeunload", () => {
    // Store the time when the app is being closed
    localStorage.setItem("lastClose", Date.now().toString());
  });

  // When the app is opened again
  window.addEventListener("load", () => {
    const lastClose = localStorage.getItem("lastClose");
    if (lastClose) {
      const now = Date.now();
      const elapsed = now - parseInt(lastClose, 10);

      // If the app has been closed for more than 24 hours (86400000 ms)
      if (elapsed > 24 * 60 * 60 * 1000) {
        console.log(
          "App has been closed for more than 24 hours. Clearing local storage."
        );
        localStorage.clear();
        location.reload();
      } else {
        console.log(
          "App was closed for less than 24 hours. No need to clear local storage."
        );
      }
    }
  });

  return activeUser.id ? <HomeLayout /> : <LoginPage loginFn={loginFn} />;
};

export default App;
