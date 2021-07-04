import React from 'react';
import PropTypes from 'prop-types'

import AccountProfilePrivate from './AccountProfilePrivate';

const propTypes = {
    user: PropTypes.object.isRequired,
};


const ProfilePrivate = ({ user }) => {

    return (<AccountProfilePrivate user={user} />)
}

ProfilePrivate.propTypes = propTypes;

export default ProfilePrivate;
