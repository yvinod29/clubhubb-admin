export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type IUpdateUser = {
  userId: string;
  name: string;
  bio: string;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
};

export type INewPost = {
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
};

export type IUpdatePost = {
  postId: string;
  caption: string;
  imageId: string;
  imageUrl: URL;
  file: File[];
  location?: string;
  tags?: string;
};

export type IClub= {
  clubId: string;
  clubName: string;
  clubUsername: string;
   clubEmail: string;
   clubTitle:string;
   description: string;
   phoneNumber:string;

   
 };



export type INewUser = {
  clubname: string;
  email: string;
  username: string;
  password: string;
};

export type IcontextType={
  club:IClub;
  isLoading:boolean;
  setClub:React.Dispatch<React.SetStateAction<IClub>>;
  isAuthenticated:boolean;
  setIsAuthenticated:React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser:()=>Promise<boolean>;


}
