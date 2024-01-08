import Home from './pages/Home';
import Blog from './pages/Blog';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Recipe from './pages/Recipe';
import Signup from './componetns/Signup';
import Login from './componetns/Login';
import UploadRecipe from './componetns/Upload/UploadRecipe';
import UploadPost from './componetns/Upload/UploadPost';
import Profile from './pages/Profile';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/'>
      <Route index element={<Home />} />
          <Route path="blogs" element={<Blog />} />
          <Route path="recipe/:recipeId" element={<Recipe />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="upload/recipe" element={<UploadRecipe />} />
          <Route path="upload/post" element={<UploadPost />} />
          <Route path="profile" element={<Profile/>} />
      </Route>
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
