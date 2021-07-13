import "./MainContent.css";
import "../../Responsive.css";
import { useEffect, useState } from "react";
import fetchDataWithAuth from "../../generalized_functions/fetchWithAuth";
import Post from "../Post/Post";
import { IconContext } from "react-icons";
import { RiDashboardLine } from "react-icons/ri";

export default function MainContent() {
    const [posts, setPosts] = useState(null);
    useEffect(() => {
        async function getPosts() {
            const result = await fetchDataWithAuth("/posts", "GET");
            setPosts(result.data);
        }
        getPosts();
    }, [])

    return (
        <div className="Main-content">
            <IconContext.Provider value={{ className: "Section-icon" }}>
                <div className="Section"><RiDashboardLine /> <div>Dashboard</div></div>
            </IconContext.Provider>
            <div className="Main-content-posts">
                {posts ?
                    posts.map(post => (
                        <Post key={post._id} post={post} />
                    )) :
                    null
                }
            </div>
        </div>
    )
}