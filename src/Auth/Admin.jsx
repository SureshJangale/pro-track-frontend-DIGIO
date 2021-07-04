import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import toast from 'shared/utils/toast';
import { isCurrentUserAdmin } from 'shared/utils/authToken';


const Admin = ({ children }) => {
    const history = useHistory();
    useEffect(() => {
        if (!isCurrentUserAdmin()) {
            toast.error('Admin resource.You are not authorised to visit this page')
            history.push(`/`);
        }
    }, [history]);
    return <React.Fragment>{children}</React.Fragment>;
};

export default Admin;
