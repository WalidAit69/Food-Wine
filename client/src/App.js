import {BrowserRouter , Routes , Route} from "react-router-dom";
import Home from './pages/Home';
import Auth from './pages/Auth';
import CreateRecipe from './pages/CreateRecipe';
import SavedRecipes from './pages/SavedRecipes';
import NavBar from './components/NavBar';
import AllRecipes from "./pages/AllRecipes";
import RecipePage from "./pages/RecipePage";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="app">
     <BrowserRouter>
     <NavBar></NavBar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/recipes' element={<AllRecipes></AllRecipes>}></Route>
        <Route path='/Auth' element={<Auth></Auth>}></Route>
        <Route path='/CreateRecipe' element={<CreateRecipe></CreateRecipe>}></Route>
        <Route path='/SavedRecipes' element={<SavedRecipes></SavedRecipes>}></Route>
        <Route path='/:id' element={<RecipePage></RecipePage>}></Route>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
