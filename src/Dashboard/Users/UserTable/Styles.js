import { makeStyles } from '@material-ui/styles';


export const useStyles = makeStyles(() => ({
    root: {},
    content: {
      padding: 0
    },
    inner: {
      minWidth: 1050
    },
    nameContainer: {
      display: 'flex',
      alignItems: 'center'
    },
    avatar: {
      marginRight: '2px'
    },
    actions: {
      justifyContent: 'flex-end'
    }
  }));