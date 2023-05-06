import React,{useState,useEffect} from 'react';
import imageService from "../../services/imageService";
function ImageComponent(props) {
    const [imageSrc, setImageSrc] = useState('');
  
    useEffect(() => {
        imageService.getMenuByFileName(props.fileName)
        .then(response => {
          
          
          console.log(response.data.imageData);
          setImageSrc(response.data.imageData);
          
  
  
        })
        .catch(error => {
          console.error(error);
        });
    }, [props.fileName]);
  
    return (
        
        <img src={imageSrc} alt={props.fileName} style={{ width: 800, height: 400 }} />
       );
  }
  
  export default ImageComponent;