import "./LeftNavigation.css";
import ProfileCard from "../ProfileCard/ProfileCard";
import CreatePostModal from "../CreatePostModal/CreatePostModal";

export default function LeftNavigation() {
    return (
        <div className="Left-navigation">
            <ProfileCard />
            <CreatePostModal hidden={false}/>
        </div>
    )
}