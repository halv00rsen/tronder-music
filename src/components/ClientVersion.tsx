import React from 'react';
import styled from 'styled-components';

const Bottom = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  border-top: 1px solid black;
  border-left: 1px solid black;
  padding: 5px;
  font-size: 70%;
`;

const clientVersion = process.env.REACT_APP_CLIENT_VERSION;

export const ClientVersion = () => <Bottom>{clientVersion}</Bottom>;
