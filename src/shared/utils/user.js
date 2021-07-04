export const getUserAvatarUrl = (user) => {    
    if(user && user.avatarUrl){
        return user.avatarUrl;
    } 
    // return (`${process.env.API_URL}/user/photo/${user.username}`);
    return null;
}