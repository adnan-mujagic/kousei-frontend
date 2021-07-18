import "./MainContent.css";
import "../../Responsive.css";
import { useEffect, useState } from "react";
import fetchDataWithAuth from "../../generalized_functions/fetchWithAuth";
import Post from "../Post/Post";
import { IconContext } from "react-icons";
import { RiDashboardLine } from "react-icons/ri";
import {BiSearch} from "react-icons/bi";
import UserProfileOrderPicker from "../UserProfileOrderPicker/UserProfileOrderPicker";
import Loading from "../Loading/Loading";
import EmptyContent from "../EmptyContent/EmptyContent";
import CreatePostModal from "../CreatePostModal/CreatePostModal";

export default function MainContent() {
    const [posts, setPosts] = useState(null);
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState("normal");
    useEffect(() => {
        async function getPosts() {
            const urlSuffix = "?search="+search+"&order="+order
            const result = await fetchDataWithAuth("/posts"+urlSuffix, "GET");
            setPosts(result.data);
        }
        getPosts();
    }, [search, order])

    return (
        <div className="Main-content">
            <IconContext.Provider value={{ className: "Section-icon" }}>
                <div className="Section"><RiDashboardLine /> <div>Dashboard</div></div>
                <CreatePostModal hidden={true}/>
                <UserProfileOrderPicker setOrder={setOrder}/>
                <div className="Main-content-search-container">
                    <div className="Main-content-search-icon-wrap">
                    <input className="Main-content-search" placeholder="Search for posts..." value={search} onChange={e=>setSearch(e.target.value)}/><BiSearch />
                    </div>
                </div>
            </IconContext.Provider>
            
            <div className="Main-content-posts">
                {posts ?
                    <div>
                    {posts.length>0?
                        posts.map(post => (
                            <Post key={post._id} post={post} />
                        )) :
                        <EmptyContent />
                    
                    }
                    </div>:
                    <Loading />
                    
                }
            </div>
        </div>
    )
}