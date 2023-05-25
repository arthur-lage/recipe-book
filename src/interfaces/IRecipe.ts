export interface IRecipe {
  id: string;
  name: string;
  description?: string;
  ingredients: string[];
  howToPrepare: string;
  timeToPrepare: number;
  photoURL: string;
  postedAt: string;
  postedBy: string;
}
