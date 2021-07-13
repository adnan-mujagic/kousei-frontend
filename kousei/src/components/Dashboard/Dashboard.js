import "./Dashboard.css";
import LeftNavigation from "../LeftNavigation/LeftNavigation";
import MainContent from "../MainContent/MainContent";

export default function Dashboard() {


    return (
        <div className="Dashboard">
            <LeftNavigation />
            <MainContent />
        </div>
    )
}