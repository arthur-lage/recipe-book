import { get, push, ref, set } from "firebase/database";
import { database } from "../lib/firebase";
import { IRecipe } from "../interfaces/IRecipe";

interface ICreateRecipe {
  name: string;
  description?: string;
  ingredients: string[];
  howToPrepare: string;
  timeToPrepare: number;
  photoURL: string;
  postedAt: string;
  postedBy: string;
}

export const recipesService = {
  async getAll() {
    const recipesRef = ref(database, "recipes");

    const snapshot = await get(recipesRef);
    const dataObject = snapshot.val();

    const dataArray: IRecipe[] = Object.values(dataObject);

    return dataArray;
  },
  async create(newRecipe: ICreateRecipe) {
    try {
      const recipesRef = ref(database, "recipes");

      const newRecipeRef = push(recipesRef);

      const newRecipeId = newRecipeRef.key;
      const recipeWithId = { ...newRecipe, id: newRecipeId };

      await set(newRecipeRef, recipeWithId);

      return "Recipe created successfully";
    } catch (err: any) {
      throw new Error("Failed to create recipe: " + err.message);
    }
  },
};
