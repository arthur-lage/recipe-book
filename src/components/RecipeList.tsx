import { IRecipe } from "../interfaces/IRecipe";
import { RecipeCard } from "./RecipeCard";

type RecipeListType = {
  recipes: IRecipe[];
};

export function RecipeList({ recipes }: RecipeListType) {
  return (
    <div className="flex flex-col items-center mt-8 gap-6 pb-6">
      {recipes.length > 0 ? (
        <>
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </>
      ) : (
        <h2 className="mt-20 font-poppins font-semibold">
          Could not find any recipes...
        </h2>
      )}
    </div>
  );
}
