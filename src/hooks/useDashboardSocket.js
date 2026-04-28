import { useSocket } from '../contexts/SocketContext';

/**
 * Hook to consume the global dashboard socket data.
 * The loginId argument is now optional as the global socket connects 
 * to the primary account automatically.
 */
export function useDashboardSocket(loginId) {
  const { socketData, status, loginId: globalLoginId } = useSocket();
  
  // If a specific loginId is requested and it matches the global one, return global data.
  // Otherwise, if we wanted to support multiple sockets, we'd need more logic here.
  // For now, we return the global socket data.
  return { data: socketData, status };
}
