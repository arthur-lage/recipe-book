import { Link } from "react-router-dom";
import { IRecipe } from "../interfaces/IRecipe";

type RecipeCardType = {
  recipe: IRecipe;
};

export function RecipeCard({ recipe }: RecipeCardType) {
  return (
    <Link to={`/recipes/${recipe.id}`} className="recipe-card">
      <img
        className="object-cover w-full h-[150px] rounded-t-lg"
        src={recipe.photoURL}
        alt={recipe.name}
      />

      <div className="font-poppins flex flex-col gap-2 p-4 border-t-zinc-400 border-t-[1px]">
        <span className="font-bold text-lg">{recipe.name}</span>
        <span className="text-zinc-700">Posted by: {recipe.postedBy}</span>
      </div>
    </Link>
  );
}
