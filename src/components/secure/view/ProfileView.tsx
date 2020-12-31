import React from 'react';
import { useAppDispatch } from '../../../context/app';
import { useStrictSpotifyState } from '../../../context/spotify';
import { removePersistedState } from '../../../service/spotify';
import styled from 'styled-components';
import { Button } from '../../ui/Button';

const ProfileUI = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: space-evenly;
`;

interface Props {
  name: string;
  value: string;
}

const KeyValue = ({ name, value }: Props) => {
  return (
    <div>
      {name}: {value}
    </div>
  );
};

export const ProfileView = () => {
  const { profile, instance } = useStrictSpotifyState();
  const dispatch = useAppDispatch();

  const removeActiveSession = () => {
    instance.setAccessToken(null);
    removePersistedState();
    dispatch({
      type: 'reset-credentials',
    });
  };

  return (
    <ProfileUI>
      <KeyValue name="Username" value={profile.id} />
      <KeyValue name="Country" value={profile.country} />
      <KeyValue name="Email" value={profile.email} />
      <KeyValue name="Membership" value={profile.product} />
      <KeyValue name="Followers" value={`${profile.followers?.total || 0}`} />
      <Button onClick={removeActiveSession}>Logout</Button>
    </ProfileUI>
  );
};
