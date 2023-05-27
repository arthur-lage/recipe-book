import { get, push, ref, set } from "firebase/database";
import {
  getDownloadURL,
  ref as storageRefFirebase,
  uploadBytes,
} from "firebase/storage";
import { database, storage } from "../lib/firebase";
import { IRecipe } from "../interfaces/IRecipe";
import { formatDate } from "../utils/formatDate";

interface ICreateRecipe {
  name: string;
  description?: string;
  ingredients: string[];
  howToPrepare: string;
  timeToPrepare: number;
  photoURL: string;
}

export const recipesService = {
  async getAll() {
    const recipesRef = ref(database, "recipes");

    const snapshot = await get(recipesRef);
    const dataObject = snapshot.val();

    const dataArray: IRecipe[] = dataObject ? Object.values(dataObject) : [];

    return dataArray;
  },
  async getById(id: string) {
    const recipeRef = ref(database, "recipes/" + id);

    const snapshot = await get(recipeRef);
    const recipeData = snapshot.val();

    return recipeData;
  },
  async create(
    newRecipe: ICreateRecipe,
    user: { userId: string; displayName: string }
  ) {
    try {
      const recipesDatabaseRef = ref(database, "recipes");
      const newRecipeRef = push(recipesDatabaseRef);

      const postedAt = formatDate.toFirebase(new Date());

      const recipeData = {
        ...newRecipe,
        id: newRecipeRef.key,
        userId: user.userId,
        postedBy: user.displayName,
        postedAt,
      };

      await set(newRecipeRef, recipeData);

      return "Recipe created successfully";
    } catch (err: any) {
      throw new Error("Failed to create recipe: " + err.message);
    }
  },
  async uploadImage(file: File, userId: string) {
    if (file) {
      const storageRef = storageRefFirebase(
        storage,
        "recipes/images/" + new Date().getTime() + userId + file.name
      );

      const fileRef = await uploadBytes(storageRef, file);

      const url = await getDownloadURL(fileRef.ref);
      return url;
    } else {
      const storageRef = storageRefFirebase(
        storage,
        "recipes/images/" + "no-images-found.png"
      );

      const url = await getDownloadURL(storageRef);
      return url;
    }
  },
};
