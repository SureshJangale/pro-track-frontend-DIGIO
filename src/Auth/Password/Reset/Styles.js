import styled from 'styled-components';
import { font } from 'shared/utils/styles';
import { Button, Form } from 'shared/components';

export const FormCont = styled.div`
box-sizing:border-box;
border:1px solid #c1c7d0;
border-radius:5px;
display:inline-block;
margin:100px auto 0;
padding:40px;
text-align:left;
width:470px;
`;

export const FormElement = styled(Form.Element)`
  width: 100%;
  max-width: 640px;
`;

export const FormHeading = styled.h1`
  padding: 6px 0 15px;
  ${font.size(24)}
  ${font.medium}
`;

export const ActionButton = styled(Button)`
  margin: 30px 0px 30px
`;
