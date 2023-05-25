import { get, push, ref, set } from "firebase/database";
import { database } from "../lib/firebase";
import { IRecipe } from "../interfaces/IRecipe";
import { formatDate } from "../utils/formatDate";

interface ICreateRecipe {
  name: string;
  description?: string;
  ingredients: string[];
  howToPrepare: string;
  timeToPrepare: number;
}

export const recipesService = {
  async getAll() {
    const recipesRef = ref(database, "recipes");

    const snapshot = await get(recipesRef);
    const dataObject = snapshot.val();

    const dataArray: IRecipe[] = Object.values(dataObject);

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

      // TODO: upload recipe pic and retrive its download link link

      const postedAt = formatDate.toFirebase(new Date());

      const recipeData = {
        ...newRecipe,
        id: newRecipeRef.key,
        userId: user.userId,
        postedBy: user.displayName,
        postedAt,
        photoURL: "",
      };

      await set(newRecipeRef, recipeData);

      return "Recipe created successfully";
    } catch (err: any) {
      throw new Error("Failed to create recipe: " + err.message);
    }
  },
};
