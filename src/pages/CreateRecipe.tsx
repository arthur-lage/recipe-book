import { Plus, Trash } from "@phosphor-icons/react";
import { Header } from "../components/Header";
import { useAuth } from "../hooks/useAuth";
import { recipesService } from "../services/recipesService";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type Inputs = {
  name: string;
  description: string;
  howToPrepare: string;
  timeToPrepare: number;
  ingredients: string[];
  imageFile: FileList;
};

export function CreateRecipe() {
  const { currentUser } = useAuth();
  const {
    control,
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<Inputs>({
    mode: "onChange",
  });

  const navigate = useNavigate();

  const { fields, append, remove } = useFieldArray({
    control,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    name: "ingredients",
    rules: {
      minLength: 1,
      required: true,
    },
  });

  async function handleCreateRecipe({
    description,
    howToPrepare,
    imageFile,
    ingredients,
    name,
    timeToPrepare,
  }: Inputs) {
    if (!currentUser?.id) {
      throw new Error("Can't create recipe while not logged in.");
    }

    try {
      const photoURL = await recipesService.uploadImage(
        imageFile[0],
        currentUser?.id
      );

      await recipesService.create(
        {
          name,
          description,
          howToPrepare,
          ingredients,
          timeToPrepare,
          photoURL,
        },
        {
          displayName: currentUser?.displayName
            ? currentUser?.displayName
            : "Anonymous User",
          userId: currentUser?.id,
        }
      );

      navigate("/");
    } catch (err: any) {
      console.error("Could not create recipe: " + err.message);
    }
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
            <label htmlFor="recipe-image" className="text-lg">
              Recipe image
            </label>
            <input
              accept="image/png, image/jpeg, image/jpg, image/webp"
              type="file"
              {...register("imageFile")}
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
            <div className="flex items-center justify-between mb-3">
              <label className="text-lg">Ingredients</label>
              <button
                className="bg-indigo-600 rounded-lg text-white flex items-center justify-center p-1"
                onClick={() => append("")}
              >
                <Plus size={25} weight="bold" />
              </button>
            </div>

            {fields.length > 0 ? (
              fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-center justify-between gap-1 w-full"
                >
                  <input
                    {...register(`ingredients.${index}` as const, {
                      minLength: 1,
                      required: true,
                    })}
                    type="text"
                    className="create-recipe-form-control"
                    placeholder="Ingredient"
                  />

                  <button
                    className="bg-rose-600 rounded-lg text-white flex items-center justify-center p-2"
                    onClick={() => remove(index)}
                  >
                    <Trash size={24} weight="bold" />
                  </button>
                </div>
              ))
            ) : (
              <span className="font-semibold tracking-wide text-red-700 text-center">
                You need to add at least one ingredient!
              </span>
            )}
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
