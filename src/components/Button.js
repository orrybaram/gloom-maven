import styled, { css } from 'react-emotion';
import { darken } from 'polished';
import ButtonBase from '@material-ui/core/ButtonBase';
import { primary, danger } from '../lib/theme';

export default styled(ButtonBase)`
  && {
    cursor: pointer;
    transition: all 0.2s;
    font-size: inherit;
    font-weight: bold;

    ${({ variant }) => variant === 'contained' && css`
      font-weight: bold;
      text-transform: uppercase;
      color: white;
      background-color: ${primary};
      border-bottom: 2px solid ${darken(0.2, primary)};
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
      padding: 10px 20px;
      letter-spacing: 2px;
      border-radius: 2px;
      font-size: 12px;

      &:hover {
        background-color: ${primary};
        filter: brightness(1.1);
      }
    `}

    ${({ color }) => color === 'danger' && css`
      background-color: ${danger};
      border-bottom: 2px solid ${darken(0.2, danger)};

      &:hover {
        background-color: ${danger};
        filter: brightness(1.1);
      }
    `}
  }
`;
