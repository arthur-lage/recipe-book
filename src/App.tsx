import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";
import { AuthPage, Home, RecipePage, CreateRecipe } from "./pages";
import { Routes, Route, Navigate } from "react-router-dom";

export function App() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recipes/:recipeId"
        element={
          <ProtectedRoute>
            <RecipePage />
          </ProtectedRoute>
        }
      />

      <Route path="/recipes/new" element={<CreateRecipe />} />

      <Route
        path="/auth"
        element={currentUser ? <Navigate to="/" replace /> : <AuthPage />}
      />
    </Routes>
  );
}
