import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(()=> ({
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
  }
}));