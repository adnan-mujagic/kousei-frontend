import "./FollowerOnlySlider";
import { FormGroup, FormControlLabel, Switch } from "@material-ui/core";
import { useState } from "react";

export default function FollowerOnlySlider(props){
    const [filter, setFilter] = useState(false);

    
    const handleFilterChange = () => {
        setFilter(prevFilter => {
            if(prevFilter){
                props.setFilter("");
            }
            else{
                props.setFilter("followed")
            }
            
            setFilter(!prevFilter);
        });
        
    }

    return (
        <FormGroup row style={{marginLeft:"10px", marginTop:"10px"}}>
            <FormControlLabel
                control={<Switch checked={filter} onChange={handleFilterChange} name="checkedA" />}
                label="Show only follower posts?"
            />
        </FormGroup>
    )
}