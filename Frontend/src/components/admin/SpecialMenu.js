import React,{useState} from 'react';
import imageService from "../../services/imageService";
import ImageComponent from './viewMenu';

const SpecialMenu=()=>{
    const [message, setMessage] = useState("");
  const [dataUri, setDataUri] = useState('')
  const [spinner, setSpinner] = useState(false);
  const [image,setImage]=useState({
    fileName:"",
    imageData:""
  });
  
  
  const{fileName,imageData}=image;
  
  
  const fileToDataUri = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result)
    };
    reader.readAsDataURL(file);
  })
  
  
  const onChangeImage = (file) => {
    if(!file) {
      setDataUri('');
      return;
    }
    fileToDataUri(file)
        .then(dataUri => {
          setDataUri(dataUri);
          setImage({...image,
          imageData:dataUri})
          console.log(dataUri);
      console.log(image);

        })
      
  }
  
  
  const onInputChange = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    if(e.target.name==="fileName"){
      setImage({...image,
      [e.target.name]:e.target.value
    })
    }
    console.log(image);
  }
  
  
  const saveImage = (event) => {
    event.preventDefault();
    setSpinner(true);
    console.log("inside save function")
    console.log(image);
    imageService.addSplMenu(image).then(res=>{
      setSpinner(false);
      if(res.status===200){
          setMessage("successfully uploaded")
         
      }
      else {
        setMessage("Error uploading the file")
      }
      
    });
    
  };
  
  
  const deleteMenu= async(id)=>{
    await imageService.deleteSplMenu();
  };
  
  return (
  
  <div className="container">
  <div className="row">
  <div className="col-md-12 offset-md-3 border rounded p-4 mt-2 shadow">
  <div>
  <h2 className="text-center m-4">Current Special Mess Menu</h2>
  <div style={{ display: 'flex', justifyContent: 'center' }}>
  <ImageComponent fileName="IIITB_SPL_MENU"/>
  </div>
  </div>
  </div>
  </div>
  <div className="row">
  <div className="col-md-12 offset-md-3 border rounded p-4 mt-2 shadow">
                  <h2 className="text-center m-4">Upload Special Menu</h2>
                  <form onSubmit={(e) => saveImage(e)}>
                  <div className="mb-3">
                          <label htmlFor="Name" className="form-label">
                              fileName
                          </label>
                          <input
                              type={"text"}
                              className="form-control"
                              placeholder="Enter file name"
                              name="fileName"
                              value={fileName}
                              onChange={(e) => onInputChange(e)}
                          />
                  </div>
                  <div className="mb-3">
        <div className="row align-items-center">
          <div className="col-md-8">
          <label htmlFor="uploadPhoto" className="form-label">Upload Photograph</label>
          <input className="form-control" type="file" id="formFile"  onChange={(event) => onChangeImage(event.target.files[0] || null)}/>
          </div>
          <div className="col-md-4">
            <img align="right" className="photo rounded float-right" src={dataUri} style={{width:100,height:100}}/>
          </div>
        </div>
      </div>
      <div>
      <button type="submit" className="btn btn-primary" style={{verticalAlign:"middle"}}>
        { spinner!==true &&<>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Submit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</> }
          { spinner===true && <div className="d-flex" >
                                <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Submit &nbsp;</>

                                <span className="spinner-border spinner-border-sm text-primary" role="status">
                                </span>
                              </div>
          }
      </button>
      <button
                                    className="btn btn-danger mx-2"
                                    onClick={()=> {
                                        if(window.confirm(`Are you sure you want to remove Special_menu ?` ))
                                        {
                                            deleteMenu();
                                        };
                                    }}
                                >
                                    Delete Special Menu
                                </button>
      <div className="alert" role="alert">
        {message}
      </div>
      </div>
  </form>
  </div>
  </div>
  </div>
 

);
}

export default SpecialMenu;
