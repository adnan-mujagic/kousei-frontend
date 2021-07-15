import "./Loading.css";
import { AiOutlineLoading} from "react-icons/ai"

export default function Loading(){
    return(
        <div className="Loading">
            <AiOutlineLoading className="Loading-icon"/>
        </div>
    )
}