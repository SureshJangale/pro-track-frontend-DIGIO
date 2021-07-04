import styled from 'styled-components';

import { color, font } from 'shared/utils/styles';


export const UserPage = styled.div`
  top: 4em;
  margin: 60px 10px 50px 10px;
`;

export const User = styled.div`
  padding-left:10px;
  display: flex;
  align-items: center;
`;

export const Username = styled.div`
  padding: 0 3px 0 8px;
  ${font.size(24.5)}
`;

export const Divider = styled.div`
  margin-top: 17px;
  padding-top: 18px;
  border-top: 1px solid ${color.borderLight};
`;

export const Profile = styled.div`
${font.size(16.5)}
`;

export const Details = styled.div`
margin-top: 17px;
${font.size(14.5)}
`;

export const UserDetails = styled.div`
margin: 17px;
`;


