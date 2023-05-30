import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { favoriteRecipesService } from "../services/favoriteRecipesService";
import { IRecipe } from "../interfaces/IRecipe";
import { useAuth } from "../hooks/useAuth";
import { RecipeCard } from "../components/RecipeCard";
import { RecipeList } from "../components/RecipeList";

export function SavedRecipes() {
  const [savedRecipesList, setSavedRecipesList] = useState<null | IRecipe[]>(
    null
  );
  const [isFetchingSavedRecipes, setIsFetchingSavedRecipes] = useState(true);

  const { currentUser } = useAuth();

  useEffect(() => {
    async function fetchSavedRecipes() {
      try {
        if (!currentUser) {
          throw new Error("You must be logged in in order to save recipes.");
        }

        const res = await favoriteRecipesService.getFavoriteRecipes(
          currentUser.id
        );
        setSavedRecipesList(res);
      } catch (err: any) {
        console.error(err.message);
        throw err;
      } finally {
        setIsFetchingSavedRecipes(false);
      }
    }

    fetchSavedRecipes();
  }, []);

  return (
    <div className="h-screen">
      <Header />

      {!isFetchingSavedRecipes && savedRecipesList ? (
        <main className="px-6 mt-6">
          <h2 className="font-poppins font-bold text-xl">Saved Recipes</h2>

          {savedRecipesList.length > 0 ? (
            <RecipeList recipes={savedRecipesList} />
          ) : (
            <div>
              <h2>You haven't saved any recipes yet</h2>
            </div>
          )}
        </main>
      ) : (
        <Loading loadingText="Loading saved recipes..." />
      )}
    </div>
  );
}
