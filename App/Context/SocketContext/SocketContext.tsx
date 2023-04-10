import React, { ReactElement, useContext } from 'react';
import { useConnectedUsers } from '../../Hooks/useConnectedUsers';
import { useSocket } from '../../Hooks/useSocket';
import { SocketContextType } from './types';
// @ts-ignore
export const SocketContext = React.createContext<SocketContextType>({});

export const useSocketContext = () => useContext(SocketContext);

export default ({ children }: { children: ReactElement }) => {
  const { socket, currentUser, opponent, setOpponent } = useSocket();
  const { connectedUsers, setConnectedUsers } = useConnectedUsers(socket);
  return (
    <SocketContext.Provider
      value={{
        connectedUsers,
        socket,
        currentUser,
        setConnectedUsers,
        opponent,
        setOpponent,
      }}>
      {children}
    </SocketContext.Provider>
  );
};
