import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
    root: {
      height: '100%'
    },
    content: {
      alignItems: 'center',
      display: 'flex'
    },
    title: {
      fontWeight: 700
    },
    avatar: {
      // backgroundColor: theme.palette.error.main,
      height: 56,
      width: 56
    },
    icon: {
      height: 32,
      width: 32
    },
    difference: {
      // marginTop: theme.spacing(2),
      display: 'flex',
      alignItems: 'center'
    },
    differenceIcon: {
      // color: theme.palette.error.dark
    },
    differenceValue: {
      // color: theme.palette.error.dark,
      // marginRight: theme.spacing(1)
    }
  }));
  