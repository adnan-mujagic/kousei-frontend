import "./Dashboard.css";
import LeftNavigation from "../LeftNavigation/LeftNavigation";
import MainContent from "../MainContent/MainContent";
import FloatingActionBtn from "../FloatingActionBtn/FloatingActionBtn";
import {Modal, Snackbar, makeStyles} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { useState } from "react";
import CreatePostModal from "../CreatePostModal/CreatePostModal";

const useStyles = makeStyles((theme) => ({
    paper:{
        position:"absolute",
        width:"300px",
        marginRight:"10px",
        background:"white",
        borderRadius:"5px",
        top:"50%",
        left:"50%",
        transform:"translate(-50%,-50%)"

    }
}))

export default function Dashboard() {
    const styles = useStyles();
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertOpen, setAlertOpen] = useState(false);

    const handleModalClose = () => {
        setCreateModalOpen(false);
    }

    const handleModalOpen = () => {
        setCreateModalOpen(true);
    }

    const onSnackbarClose = () => {
        setAlertOpen(false);
        setAlertMessage("");
    }
    
    const body = (
        <div className={styles.paper}>
            <CreatePostModal setAlertOpen={setAlertOpen} setAlertMessage={setAlertMessage} handleModalClose={handleModalClose}/>
        </div>
    )

    return (
        <div className="Dashboard">
            <LeftNavigation />
            <MainContent />
            <FloatingActionBtn onClick={handleModalOpen}/>
            <Modal
                open={createModalOpen}
                onClose={handleModalClose}
                aria-labelledby="Create a post modal"
                aria-describedby="Create a post modal"
            >
                {body}
            </Modal>
            <Snackbar
                autoHideDuration={3000}
                open={alertOpen}
                onClose={onSnackbarClose}
            >
                <Alert severity="success">{alertMessage}</Alert>
            </Snackbar> 
        </div>
        
    )
}