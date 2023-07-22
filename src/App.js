import "./App.css";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import { Route, Routes,useLocation,useSearchParams } from "react-router-dom";
import Home from "./Pages/Home"
import CategoryPage from "./Pages/CategoryPage";
import TagPage from "./Pages/TagPage";
import BlogPage from "./Pages/BlogPage";

export default function App() {

  const { fetchBlogPosts } = useContext(AppContext);
const [searchParams,setSearchParams]=useSearchParams();
const  location =useLocation();

  useEffect(() => {
 const page=searchParams.get("page") ?? 1; 

 console.log(`page is ${page}`)
 if(location.pathname.includes("tags")){
  //iska mtlb location wala page show krna hai
  const tag=location.pathname.split("/").at(-1).replaceAll("-"," ");

  fetchBlogPosts (Number(page),tag)
 }
 else if(location.pathname.includes("categories")){ 
  const category =location.pathname.split("/").at(-1).replaceAll('-'," ")
  fetchBlogPosts(Number(page),null,category);
 }
 else{
  fetchBlogPosts(Number(page));
 }
  }, [location.pathname,location.search]);

  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      {/*dynamic parameter */}
      <Route path='/blog/:blogId' element={<BlogPage/>} />
      <Route path='/tags/:tag' element={<TagPage/>} />
      <Route path='/categories/:category' element={<CategoryPage/>} />
    </Routes>
  );
}
