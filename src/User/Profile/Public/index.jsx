import React from 'react';
import PropTypes from 'prop-types'

import AccountProfilePublic from './AccountProfilePublic';

const propTypes = {
    user: PropTypes.object.isRequired,
};


const ProfilePublic = ({ user }) => {

    return ( <AccountProfilePublic user = {user}/>)
}

ProfilePublic.propTypes = propTypes;

export default ProfilePublic;