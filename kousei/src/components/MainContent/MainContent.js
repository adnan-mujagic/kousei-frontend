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
import FollowerOnlySlider from "../FollowerOnlySlider/FollowerOnlySlider";

export default function MainContent() {
    const [posts, setPosts] = useState(null);
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState("normal");
    const [filter, setFilter] = useState("");
    useEffect(() => {
        async function getPosts() {
            const urlSuffix = "?search="+search+"&order="+order+"&filter="+filter;
            const result = await fetchDataWithAuth("/posts"+urlSuffix, "GET");
            setPosts(result.data);
        }
        getPosts();
    }, [search, order, filter])

    return (
        <div className="Main-content">
            <IconContext.Provider value={{ className: "Section-icon" }}>
                
                <div className="Section"><RiDashboardLine /> <div>Dashboard</div></div>
                <UserProfileOrderPicker setOrder={setOrder}/>
                <FollowerOnlySlider setFilter={setFilter} />
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