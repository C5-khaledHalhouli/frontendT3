import "./style.css"
import React, { useState } from 'react'



const UploadImg = ({setUrl}) => {
const [image, setImage ] = useState("");

const uploadImage = () => {
const data = new FormData()
data.append("file", image)
data.append("upload_preset", "Project4")
data.append("cloud_name","halhouli")
fetch("  https://api.cloudinary.com/v1_1/halhouli/image/upload",{
method:"post",
body: data
})
.then(resp => resp.json())
.then(data => {
    console.log(data.url);
  
    
setUrl(data.url)
})
.catch(err => console.log(err))
}
return (
<div>

<input type="file" className='inputImg' onChange= {(e)=> setImage(e.target.files[0])}/>
<button className='buttonImg' onClick={()=>uploadImage()}>Upload</button>
</div>




)
}
export default UploadImg;
