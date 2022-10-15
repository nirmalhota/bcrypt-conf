import { useRef, useState } from "react";
import "./createContract.css";
import axios from "axios";
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Navigate } from "react-router-dom";
import copy from "copy-to-clipboard";  
// import { useAlert } from "react-alert";

function CreateContract() {
    const [file,setFile] = useState(null);
    const [error, setError] = useState(null);
    const [loadingStatus, setLoadingStatus] = useState(<CircularProgress color="inherit" />);
    const [loading, setLoading] = useState(null);
    const [mint, setMint] = useState(false); 

    const nftName = useRef();
    const nftDescription = useRef();
    const nftMaxQty = useRef();
    const nftPrice = useRef();
    const nftSymbol = useRef();

    function validateInput() {
        if(!file) {
            setError(<Alert severity="error">no file selected</Alert>);
            return false;
        }
        if(!nftName.current.value) {
            setError(<Alert severity="error">name cannot be empty</Alert>);
            return false;
        }
        if(!nftDescription.current.value) {
            setError(<Alert severity="error">description cannot be empty</Alert>);
            return false;
        }
        if(!nftMaxQty.current.value) {
            setError(<Alert severity="error">quantity cannot be empty</Alert>);
            return false;
        }
        if(!nftPrice.current.value) {
            setError(<Alert severity="error">price cannot be empty</Alert>);
            return false;
        }
        if(!nftSymbol.current.value) {
            setError(<Alert severity="error">symbol cannot be empty</Alert>);
            return false;
        }
        setError(null);
        return true;
    }

    function handleFileChange(e) {
        setFile(e.target.files[0]);
    }
    function handleSubmit(e) {
        e.preventDefault();
        if(!validateInput()) {
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };

        setLoading(true);
        setLoadingStatus(<CircularProgress color="inherit" />);
        axios.post(`http://localhost:4002/contracts/createContract?name=${nftName.current.value}&description=${nftDescription.current.value}&qty=${nftMaxQty.current.value}&price=${nftPrice.current.value}&symbol=${nftSymbol.current.value}`,
             formData, config).then((response) => {
            console.log(response.data);
            if(response.data.status === 200) {
                setLoadingStatus(<Alert severity="success">Query successful<br/> id : {response.data.data.id}
                        <br/>
                        <button onClick={() => copy(response.data.data.id)}>copy id</button> {"      "}
                        <button onClick={() => setLoading(false)}>ok</button> {"      "}
                        <button onClick={() => {
                            setLoading(false);
                            setMint(true);
                        }}>mint</button>
                    </Alert>
                );
            }
            else {
                setLoadingStatus(<Alert severity="error">oops! something went wrong<br/>
                <button onClick={() => setLoading(false)}>ok</button><br/></Alert>);
            }
        }).catch((err) => {
            setLoadingStatus(<Alert severity="error">oops! something went wrong<br/>
            <button onClick={() => setLoading(false)}>ok</button><br/></Alert>);
        });
    }
    if(mint) {
        return <Navigate to="/mint"/>
    }
    return (
        <div className="contract-form-container">
            {/* <div className="left-col-div">

            </div> */}
            <form className="contract-form">
                <div className="upload-form">
                    <label>Upload NFT Image:</label>
                    <input type="file" onChange={handleFileChange}/>
                    {/* <button type="submit" ref={file} onClick={handleUpload}>Upload</button> */}
                </div>
                <br/>
                <div className="input-div">
                    <label>Collection Name </label>
                </div>
                <div className="input-div">
                    <input type="text" placeholder="collection name" ref={nftName}/>
                </div>
                <br/>

                <div className="input-div">
                    <label>Collection Symbol </label>
                </div>
                <div className="input-div">
                    <input type="text" placeholder="collection symbol" ref={nftSymbol}/>
                </div>
                <br/>                

                <div className="input-div">
                    <label>NFT Description </label>
                </div>
                <div className="input-div">
                    <textarea placeholder="NFT description" ref={nftDescription} cols="55" rows="6">
                    </textarea>                    
                </div>                
                <br/>

                <div className="input-div">
                    <label>Max Quantity </label>
                </div>
                <div className="input-div">
                    <input type="number" placeholder="max quantity" ref={nftMaxQty}/>
                </div>                
                <br/>

                <div className="input-div">
                    <label>Price (in eth)</label>
                </div>
                <div className="input-div">
                    <input type="number" placeholder="price" ref={nftPrice}/>
                </div>                
                <button className="submit-button" type="submit" onClick={handleSubmit}>Create</button>
                {error}

            </form>
            <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                    // onClick={() => setLoading(false)}
                >
                    {loadingStatus}
            </Backdrop>
        </div>
    );
}

export default CreateContract;