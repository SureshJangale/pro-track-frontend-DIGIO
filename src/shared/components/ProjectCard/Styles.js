import styled from 'styled-components';
import { makeStyles } from '@material-ui/styles';
import { Card } from '@material-ui/core';
import { color, font, mixin } from 'shared/utils/styles';
import { Avatar } from 'shared/components';


export const Project = styled(Card)`
  padding: 10px;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0px 1px 2px 0px rgba(9, 30, 66, 0.25);
  transition: background 0.1s;
  ${mixin.clickable}
  @media (max-width: 1100px) {
    padding: 10px 8px;
  }
  &:hover {
    background: ${color.backgroundLight};
  }
`;

export const ProjectTexts = styled.div`
  padding: 3px 0 0 10px;
`;

export const ProjectName = styled.div`
  color: ${color.textDark};
  ${font.size(15)};
  ${font.medium};
`;

export const ProjectCategory = styled.div`
  color: ${color.textMedium};
  ${font.size(13)};
`;
export const Title = styled.p`
  padding-bottom: 11px;
  ${font.size(15)}
  @media (max-width: 1100px) {
    ${font.size(14.5)}
  }
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProjectOwner = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-left: 2px;
`;

export const ProjectOwnerAvatar = styled(Avatar)`
  margin-left: -2px;
  box-shadow: 0 0 0 2px #fff;
`;


export const Dates = styled.div`
  line-height: 22px;
  color: ${color.textMedium};
  ${font.size(13)}
`;


export const useStyles = makeStyles(() => ({
  root:{
    padding:'0px'
  },
  imageContainer: {
    height: 60,
    width: 60,
    margin: '0 auto',
    border: '1px solid',
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    margin:'10px'
  }
}));

export const User = styled.div`
  display: flex;
  align-items: center;
`;

export const Username = styled.div`
  padding: 0 3px 0 8px;
  ${font.size(13)}
`;
