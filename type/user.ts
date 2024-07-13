export interface OldType{
    username?:string;
    id?:string;
    name?:string;
    number?:number,
    photourl?:string,
    user?:string,
    
    
   
}


export interface ProfileData {
    id?:string;
    username: string;
    user?:string,
    number?:number,
    // other properties
  }



export interface NewUerType{
 
   
    id?:string;
    name?:string;
    url?:string,
    tags?:Array<tagType>,
    type?:string;
    timestamp?:number,
     user?:string,
     number?:string,
    username?:string;

     
    //  id?:string
}


export interface ItemTags{
   
    
    type?:string;
    user?:string;
    timestamp?:number,
    tags?:Array<Tag>
    
    //  id?:string
}


export interface Tag{
    userName: string;
   
    
    type?:string;
    timestamp?:number,
    tag?:string
    
    //  id?:string
}
// export interface itemUserType{
   
//     id?:string;
//     name?:string;
//     timestamp?:number,
    
// }



export interface tagType{
   
    tag?:string;
    type?:string;
    timestamp?:number,
    
}



export interface shareItems{
   
    id?:string;
    sono?:string;
    timestamp?:number,
    sharedWith?:string,
    owner?:string

    
}