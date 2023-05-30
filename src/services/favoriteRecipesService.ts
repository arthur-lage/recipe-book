import { get, ref, remove, update } from "firebase/database";
import { database } from "../lib/firebase";

export const favoriteRecipesService = {
  async getFavoriteRecipes(userId: string) {
    const favoriteRecipesRef = ref(database, `favoriteRecipes/${userId}`);

    const snapshot = await get(favoriteRecipesRef);

    const favoriteRecipes = snapshot.val();

    return favoriteRecipes;
  },
  async addRecipeToFavorites(userId: string, recipeId: string) {
    const favoriteRecipesRef = ref(database, `favoriteRecipes/${userId}`);

    const snapshot = await get(favoriteRecipesRef);
    const favoriteRecipes = snapshot.val();

    if (favoriteRecipes && favoriteRecipes[recipeId]) {
      return;
    }

    await update(ref(database), {
      [`favoriteRecipes/${userId}/${recipeId}`]: true,
    });
  },
  async removeRecipeFromFavorites(userId: string, recipeId: string) {
    const favoriteRecipesRef = ref(
      database,
      `favoriteRecipes/${userId}/${recipeId}`
    );
    await remove(favoriteRecipesRef);
  },
  async checkIfRecipeIsSaved(userId: string, recipeId: string) {
    const favoriteRecipeRef = ref(
      database,
      `favoriteRecipes/${userId}/${recipeId}`
    );
    const snapshot = await get(favoriteRecipeRef);

    return snapshot.exists();
  },
};
