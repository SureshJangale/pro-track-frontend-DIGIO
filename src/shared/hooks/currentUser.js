import { get } from 'lodash';
import {useHistory} from 'react-router-dom'
import {isAuth} from 'shared/utils/authToken'

const useCurrentUser = () => {
  const history = useHistory();
  if(!isAuth() )
  history.push('/signin');
  const data = isAuth();  
  return {
    currentUser: data,
    currentUserId: get(data, '_id'),
    currentUserMail: get(data, 'email'),
    currentUserName: get(data, 'name'),
    currentUserRole: get(data, 'role'),
    currentUserAvatar:get(data, 'avatarUrl')
  };
};

export default useCurrentUser;
