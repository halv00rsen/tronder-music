import styled from 'styled-components';
import { mainColor } from '../../utils/constants';

export const Button = styled.button`
  padding: 15px;
  background-color: #3b3434;
  text-decoration: none;
  border: 3px solid black;
  cursor: pointer;
  transition: 0.4s;
  color: ${mainColor};
  font-size: 150%;
  font-weight: 500;

  &:hover {
    opacity: 0.5;
  }
`;
