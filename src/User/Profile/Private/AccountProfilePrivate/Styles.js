import styled from 'styled-components';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { Button } from 'shared/components';

export const useStyles = makeStyles(() => ({
  root: {},
  nameContainer: {
    display: 'flex',
    alignItems: 'center',
    margin:'0.5rem'
  },
  avatar: {
    margin: '0.35rem',
  },
  summary: {
    marginTop: '1rem'
  },
  details: {
    margin: '1.5rem'
  },
  uploadButton: {
    marginRight: '2px'
  }
}));

export const ActionButton = styled(Button)`
  margin-top: 30px;
`;

export const ForgotPasswordLink = styled(Link)`
  margin:30px
`;