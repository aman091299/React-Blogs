import {React,useState,useContext,useEffect} from 'react'
import { AppContext } from '../context/AppContext';
import { useNavigate,useLocation } from 'react-router-dom';
import Header from '../components/Header';
import BlogDetails from '../components/BlogDetails';
import { baseUrl } from '../baseUrl';
const BlogPage = () => {
    
    const newBaseUrl="https://codehelp-apis.vercel.app/api/"
    const[blog,setBlog]=useState(null);
    const[relatedBlogs,setRelatedBlogs]=useState([]);
    const location=useLocation();
    const navigation=useNavigate();
    const {setLoading,loading}=useContext(AppContext)
    const blogId=location.pathname.split("/").at(-1)
   
   
    async function fetchRelatedBlogs(){ 
        setLoading(true);
        let url=`${newBaseUrl}get-blog?blogId=${blogId}`
        try{
            const res=await fetch(url);
            const data=await res.json();
            setBlog(data.blog)
            setRelatedBlogs(data.relatedBlogs)
         
        }
        catch(error){
               console.log("error aagya in blog id wali call pe");
            setBlog(null);
            setRelatedBlogs([])
        }
        setLoading(false);
    }
    useEffect(()=>{
      
        if(blogId)
        fetchRelatedBlogs();
    },[location.pathname])
   
  return (
    <div className="mt-[90px]">
        <Header/>
        <div>
        <button onClick={()=> navigation(-1)} >
             Back
        </button>
        </div>
       
       {
        loading?<p>Loading</p>:
        blog ?(<div>
        <BlogDetails post={blog}/>
        <h2>Related Blogs</h2>
        {
            relatedBlogs.map((post)=>(
                <div key={post.id}>
                    <BlogDetails post={post}/>
                </div>
            ))
        }
        </div>):
        (<p>No Blog found</p>)
       }
    </div>
  )
}

export default BlogPage