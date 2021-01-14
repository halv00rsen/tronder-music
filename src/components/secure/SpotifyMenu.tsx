import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { MENU_VIEWS } from '../../service/views';
import { mainColor, mainHover } from '../../utils/constants';
import { useIsSmallScreen } from '../useScreenSize';

const padding = '10px';

const Menu = styled.div`
  min-width: 200px;

  & > * + * {
    border-top: 2px solid black;
  }
`;

const Button = styled.button`
  background-color: #3b3434;
  text-decoration: none;
  border: 1px solid black;
  color: ${mainColor};
  padding: 10px;
`;

const ActiveMobileMenu = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: black;
  width: 100%;
`;

export const Header = styled.div`
  padding: ${padding};
  font-size: 150%;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

const Links = () => {
  const history = useHistory();
  const location = useLocation();

  const redirect = (to: string) => {
    history.push(to);
  };

  return (
    <>
      {MENU_VIEWS.map((view) => (
        <MenuLink
          key={view.path}
          chosen={location.pathname === view.path}
          onClick={() => redirect(view.path)}
          role="button"
        >
          {view.friendlyName}
        </MenuLink>
      ))}
    </>
  );
};

const MobileMenu = () => {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setShowMenu(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <ActiveMobileMenu>
      <Header>
        Trønder Music <Button onClick={toggleMenu}>Open Menu</Button>
      </Header>
      {showMenu && <Links />}
    </ActiveMobileMenu>
  );
};

export const SpotifyMenu = () => {
  const smallScreen = useIsSmallScreen();

  if (smallScreen) {
    return <MobileMenu />;
  }
  return (
    <Menu>
      <Header>Trønder Music</Header>
      <Links />
    </Menu>
  );
};
