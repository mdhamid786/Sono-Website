import React from 'react'

const profile = () => {
  return (
    <>
     <div  style={{marginTop:"100px"}} className="main-content">

<div style={{height:"350px"}} className="page-content">
    <div className="container-fluid">

         <div  className="row">
            <div className="col-12">
             <div style={{textAlign:"center"  , color:"black", display:"flex" , justifyContent:"center", alignItems:"center"}}  className="img">
                <img style={{borderRadius:"50%"}} className="imgrobot" src="https://static.vecteezy.com/system/resources/previews/010/054/157/original/chat-bot-robot-avatar-in-circle-round-shape-isolated-on-white-background-stock-illustration-ai-technology-futuristic-helper-communication-conversation-concept-in-flat-style-vector.jpg" alt="" height={100} width={100} />
               


             </div> 
            </div>
        </div> 


        <div  className="row">
            <div className="col-12">
             <div style={{textAlign:"center"  , color:"black",  justifyContent:"center", alignItems:"center"}}  className="img">
             <h3 style={{fontWeight:"bold" , fontSize:"20px"}}>Bijoy Haldar</h3>
                <p>@bijoy</p>
                <p>@ +91 1212121212</p>
               


             </div> 
            </div>
        </div> 

       
    </div>
</div>







</div> 
    </>
  )
}

export default profile
