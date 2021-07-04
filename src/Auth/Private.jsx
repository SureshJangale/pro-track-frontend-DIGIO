import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { isAuth } from 'shared/utils/authToken';
import SignIn from './SignIn';

const Private = ({ children }) => {
    const history = useHistory();
    useEffect(() => {
        if (!isAuth()) {
            // history.push(`/signin`);
        }
    }, [history]);
    return <React.Fragment>{children}</React.Fragment>;
};

export default Private;
