import { get, push, ref, set } from "firebase/database";
import { database } from "../lib/firebase";

export const usersService = {
  async checkIfUserExists(userId: string) {
    const databaseRef = ref(database, "users/" + userId);
    const userData = await get(databaseRef);
    const userExists = userData.exists();

    if (!userExists) return false;
    return true;
  },
  async addUserToDatabase(data: {
    id: string;
    displayName: string | null;
    email: string | null;
  }) {
    const databaseRef = ref(database, "users/" + data.id);
    const newUserRef = push(databaseRef);

    await set(newUserRef, data);

    return "User created successfully.";
  },
};
