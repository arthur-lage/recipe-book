import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { useEffect, useState } from "react";
import { recipesService } from "../services/recipesService";
import { IRecipe } from "../interfaces/IRecipe";
import { Loading } from "../components/Loading";
import { formatDate } from "../utils/formatDate";
import { replaceLinebreakForBrTag } from "../utils/replaceLinebreakForBrTag";

export function RecipePage() {
  const [recipe, setRecipe] = useState<null | IRecipe>(null);
  const [isLoadingRecipe, setIsLoadingRecipe] = useState(true);
  const { recipeId } = useParams();

  useEffect(() => {
    async function fetchRecipe() {
      try {
        if (recipeId == undefined || !recipeId)
          throw new Error("Invalid recipe id");

        const res = await recipesService.getById(recipeId);

        setRecipe(res);
      } catch (error) {
        throw new Error("Could not find recipe");
      } finally {
        setIsLoadingRecipe(false);
      }
    }

    fetchRecipe();
  }, [recipeId]);

  return (
    <div className="h-screen">
      {isLoadingRecipe ? (
        <Loading loadingText="Loading recipe..." />
      ) : (
        <>
          {recipe ? (
            <div className="font-poppins">
              <Header />

              <main className="px-6 mt-8 pb-5">
                <h2 className="font-bold text-xl mb-3">{recipe.name}</h2>

                <div className="flex flex-col gap-1">
                  <p>Takes: {recipe.timeToPrepare} min</p>
                  <p>By: {recipe.postedBy}</p>
                  <p>Posted on: {formatDate.fromFirebase(recipe.postedAt)}</p>
                </div>

                <img
                  className="rounded-md h-[225px] mt-4 w-full object-cover"
                  src={recipe.photoURL}
                  alt={recipe.name}
                />

                <div className="w-full my-4 h-[1px] bg-zinc-600"></div>

                {recipe.description ? (
                  <section className="flex flex-col gap-2">
                    <h3 className="font-semibold text-lg">📜 Description</h3>

                    <div className="text-multiple-lines">
                      {recipe.description}
                    </div>
                  </section>
                ) : (
                  ""
                )}

                <section className="mt-6 flex flex-col gap-4">
                  <h3 className="font-semibold text-lg">🥗 Ingredients</h3>

                  <ul className="list-disc pl-6">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </section>

                <section className="mt-6 flex flex-col gap-4">
                  <h3 className="font-semibold text-lg">🍰 How to Prepare</h3>

                  <div
                    dangerouslySetInnerHTML={{
                      __html: replaceLinebreakForBrTag(recipe.howToPrepare),
                    }}
                    className="text-multiple-lines"
                  ></div>
                </section>
              </main>
            </div>
          ) : (
            <div>
              <h2>Could not find recipe data...</h2>
            </div>
          )}
        </>
      )}
    </div>
  );
}
