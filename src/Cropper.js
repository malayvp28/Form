import react ,{useState} from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import Tesseract from 'tesseract.js';
import ReactCrop from 'react-image-crop';
import Webcam from "react-webcam";
import { Button} from '@material-ui/core';
const Cropper =()=>{
const [crop,setCrop]=useState(
     {
        unit: '%',
      
      }
);

const [file,setFile]=useState(null);
const [result,SetResult]=useState(null);
const [openStatus,setOpen]=useState(true);
const [cropStatus,setcrop]=useState(false);
const [resultStatus,setresult]=useState(false);
const handleFile=e=>{
setFile(URL.createObjectURL(e.target.files[0]))
}
const [image,setImage]=useState();
const [text,setText]=useState("");
 function getCroppedImg() {
     console.log(crop)
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');
   
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );
    const base64Image = canvas.toDataURL('image/jpeg');
    setCrop(true);
    setOpen(true);
    SetResult(base64Image);
    setresult(true);

 }
 const showresult=()=>{

  Tesseract.recognize(result, 
    'eng',
    { logger: m => console.log(m) }
  )
  .catch(err => {
    console.error(err)
  })
  .then(({ data: { text } }) => {
    console.log(text);
    setText(text);
  })
 }
 const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

const webcamRef = react.useRef(null);
const [imgeStatus,setStatus]=useState(false);
const [src,setSrc]=useState(null);
const capture = react.useCallback(
  () => {
   const  imageSrc = webcamRef.current.getScreenshot();
    setSrc(imageSrc);
    setStatus(true);
    setCam(false);
    setcrop(true);
    setOpen(true);
    
    console.log("cap")
  },

  [webcamRef]
);
const [camStatus,setCam]=useState(false);

const camOpen=()=>{
  setCam(true);
  setOpen(false);
  setcrop(false);
  setresult(false);
  setText("");
  setImage(null);
  setStatus(false);
  SetResult(null)
  
}
const camClose=()=>{
  

}
    return(
       
        <div className="main">
             <div>
        {
            imgeStatus &&
            ( <div>
                <ReactCrop src={src} onImageLoaded={setImage} crop={crop} onChange={setCrop} style={{marginTop:5}}/>
                <br/>
               
            </div>
            )
        }
        </div>
          
        { camStatus && <div style={{display:'flex',flexDirection:'column',textAlign:'center'}}>
          <Webcam
        audio={false}
        height={290}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width='100%'
        videoConstraints={videoConstraints}
      />
     
    
  </div>
        }
     
      
        <div>
               {
                result && (
                    <img src={result} alt="*"/>
                )

            }
        </div>
      
      <div style={{display:'flex',marginTop:5,justifyContent:'center'}}>
      {openStatus && <Button variant="contained" color="primary" style={{marginLeft:5}} onClick={camOpen}>
          Open Camera
         </Button>
      }
     { cropStatus && <Button variant="contained" color="primary" style={{marginLeft:5}} onClick={getCroppedImg}>
         Crop
      </Button>
     }
      { resultStatus && <Button variant="contained" color="primary" style={{marginLeft:5}} onClick={showresult}>
         Result
      </Button>
        }
  
       
     
      { camStatus &&
      <Button variant="contained" color="primary" style={{width:'100px',marginLeft:5}} onClick={capture}>
      Click
      </Button>}

      </div>
           
        <div>
        {text}
        </div>
        </div>

    )
}
export default Cropper;