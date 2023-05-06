import React,{useState,useEffect} from 'react';
import imageService from '../../services/imageService';
function Menu(){
    const [imageSrc, setImageSrc] = useState('');
    const [text,setText]=useState('');
    useEffect(() => {
        imageService.getMenu()
        .then(response => {
          
          
          console.log(response.data.fileName);
          if(response.data.fileName==="IIITB_SPL_MENU"){
            setText(
                "For Today's Special Occasion we have Special Menu"
            )
          }
          else{
            setText(
                "Menu"
            )
          }
          setImageSrc(response.data.imageData);
          
  
  
        })
        .catch(error => {
          console.error(error);
        });
    }, []);

    return (
        <div className="container">
        <div className='row'>

        <div className="col-md-12 offset-md-3 border rounded p-4 mt-2 shadow">
        <div>
       <h2 className="text-center m-4">{text}</h2>
       <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img src={imageSrc} alt="menu" style={{ width: 800, height: 400 }} />
        </div>
        </div>
        </div>
        </div>
        </div>
       );
}

export default Menu;