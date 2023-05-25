import { Header } from "../components/Header";
import { useAuth } from "../hooks/useAuth";
import { recipesService } from "../services/recipesService";
import { useForm } from "react-hook-form";

type Inputs = {
  name: string;
  description: string;
  howToPrepare: string;
  ingredients: string;
  timeToPrepare: number;
};

export function CreateRecipe() {
  const { currentUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<Inputs>({
    mode: "onChange",
  });

  async function handleCreateRecipe({
    name,
    description,
    howToPrepare,
    ingredients,
    timeToPrepare,
  }: Inputs) {
    if (!currentUser?.id) {
      throw new Error("Can't create recipe while not logged in.");
    }

    const res = await recipesService.create(
      {
        name,
        description,
        howToPrepare,
        ingredients: [ingredients],
        timeToPrepare,
      },
      {
        displayName: currentUser?.displayName
          ? currentUser?.displayName
          : "Anonymous User",
        userId: currentUser?.id,
      }
    );

    console.log(res);
  }

  return (
    <div className="h-screen">
      <Header />

      <main className="mt-6 font-poppins px-6 pb-6">
        <h2 className="font-bold text-xl">Create Recipe</h2>

        <form
          className="mt-5 flex flex-col gap-5"
          onSubmit={handleSubmit(handleCreateRecipe)}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="recipe-name" className="text-lg">
              Recipe name
            </label>
            <input
              {...register("name", { required: true })}
              className="create-recipe-form-control"
              type="text"
              id="recipe-name"
              placeholder="Eg: Chocolate Cake"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="recipe-description" className="text-lg">
              Description
            </label>
            <textarea
              {...register("description", { required: true })}
              id="recipe-description"
              className="create-recipe-form-control"
              placeholder="Tell us a little more about this recipe..."
            ></textarea>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg">Ingredients</label>
            <input
              {...register("ingredients", { required: true })}
              type="text"
              className="create-recipe-form-control"
              placeholder="Ingredients"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="recipe-how-to-prepare" className="text-lg">
              How to Prepare
            </label>
            <textarea
              id="recipe-how-to-prepare"
              {...register("howToPrepare", { required: true })}
              className="create-recipe-form-control"
              placeholder="Write the necessary steps to prepare this recipe..."
            ></textarea>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="recipe-time-to-prepare" className="text-lg">
              Time to prepare (in minutes)
            </label>
            <input
              {...register("timeToPrepare", {
                required: true,
                min: 1,
                value: 40,
              })}
              id="recipe-time-to-prepare"
              type="number"
              className="create-recipe-form-control"
            />
          </div>

          <button
            disabled={!isValid}
            className="disabled:opacity-60 mt-4 text-white font-semibold py-2 tracking-wider text-lg w-full rounded-md bg-green-500 hover:brightness-110"
            type="submit"
          >
            Submit Recipe
          </button>
        </form>
      </main>
    </div>
  );
}
