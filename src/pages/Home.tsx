import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { RecipeList } from "../components/RecipeList";
import { useAuth } from "../hooks/useAuth";
import { IRecipe } from "../interfaces/IRecipe";
import { recipesService } from "../services/recipesService";
import { Loading } from "../components/Loading";

export function Home() {
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(true);
  const [recipes, setRecipes] = useState<IRecipe[]>([]);

  const { currentUser } = useAuth();

  async function fetchRecipes() {
    try {
      const res = await recipesService.getAll();

      setRecipes(res);
    } catch (err: any) {
      throw new Error("Could not fetch recipes: " + err.message);
    } finally {
      setIsLoadingRecipes(false);
    }
  }

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="h-screen">
      {isLoadingRecipes ? <Loading loadingText="Loading recipes..." /> : ""}

      <Header />

      <main className="px-6 mt-6">
        <h2 className="font-poppins text-lg">
          Hi,{" "}
          <span className="font-bold font-poppins">
            {currentUser?.displayName}!
          </span>
        </h2>

        <h3 className="mt-4 font-medium text-xl font-poppins">
          Latest recipes:
        </h3>

        <RecipeList recipes={recipes} />
      </main>
    </div>
  );
}
