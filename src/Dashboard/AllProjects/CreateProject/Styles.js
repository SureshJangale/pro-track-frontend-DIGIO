import styled from 'styled-components';

import { font } from 'shared/utils/styles';
import { Button, Form } from 'shared/components';

export const FormCont = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;`;

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
  margin-top: 30px;
`;

export const SelectItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
  ${props => props.withBottomMargin && `margin-bottom: 5px;`}
`;

export const SelectItemLabel = styled.div`
  padding: 0 3px 0 6px;
`;
