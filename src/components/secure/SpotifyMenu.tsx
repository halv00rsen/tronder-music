import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { MENU_VIEWS } from '../../service/views';
import { mainHover } from '../../utils/constants';

const padding = '10px';

const Menu = styled.div`
  min-width: 150px;

  & > * + * {
    border-top: 2px solid black;
  }
`;

const Header = styled.div`
  padding: ${padding};
  font-size: 150%;
  font-weight: 600;
`;

const MenuLink = styled.div<{ chosen: boolean }>`
  padding: ${padding};
  cursor: pointer;
  transition: 0.4s;

  background-color: ${(props) => (props.chosen ? mainHover : '')};

  &:hover {
    background-color: ${mainHover};
  }

  & + & {
    border-top: 1px solid gray;
  }
`;

export const SpotifyMenu = () => {
  const location = useLocation();
  const history = useHistory();

  const redirect = (to: string) => {
    history.push(to);
  };

  return (
    <Menu>
      <Header>Spotify</Header>
      {MENU_VIEWS.map((view) => (
        <MenuLink
          key={view.path}
          chosen={location.pathname === view.path}
          onClick={() => redirect(view.path)}
        >
          {view.friendlyName}
        </MenuLink>
      ))}
    </Menu>
  );
};
