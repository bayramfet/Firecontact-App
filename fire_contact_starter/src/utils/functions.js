import firebase from "./firebase";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
  update,
} from "firebase/database";
import { useState, useEffect } from "react";
import Toastify from "./Toastify";

// Firebase Veri Ekleme
export const AddUser = (info) => {
  const db = getDatabase(firebase);

  const userRef = ref(db, "users/");
  const newUserRef = push(userRef);

  set(newUserRef, {
    username: info.username,
    phoneNumber: info.phoneNumber,
    gender: info.gender,
  });
  Toastify("Added Successfully");
};

// Firebasedan Veri Çekme
export const useFetch = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [contactList, setContactList] = useState();
  useEffect(() => {
    const db = getDatabase(firebase);
    const userRef = ref(db, "users/");

    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      const userArray = [];

      for (let id in data) {
        userArray.push({ id, ...data[id] });
      }
      setContactList(userArray);
      setIsLoading(false);
    });
  }, []);

  return { isLoading, contactList };
};

// Veriyi Silme

export const DeleteUser = (id) => {
  const db = getDatabase(firebase);
  remove(ref(db, "users/" + id));
  Toastify("Deleted Successfully");
};

// Veriyi Değiştirme

export const UpdateUser = (info) => {
  const db = getDatabase(firebase);
  // const userRef = ref(db, "users/");
  const updates = {};

  updates["users/" + info.id] = info;

  return update(ref(db), updates);
};
