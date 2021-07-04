import styled from 'styled-components';
import { makeStyles } from '@material-ui/styles';
import { InputDebounced } from 'shared/components';


export const SearchInput = styled(InputDebounced)`
  margin-bottom: 10px;
  width: 405px;
`;

export const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    margin: '10px 0px 20px'
  },
  searchInput: {
    flexBasis: '405px',
    alignItems: 'center',
    borderRadius: '4px',
  }
}));