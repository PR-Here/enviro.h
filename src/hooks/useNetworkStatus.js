import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect, useState } from 'react';

const useNetworkStatus = () => {
  const netInfo = useNetInfo();
  const [isConnected, setIsConnected] = useState(netInfo.isConnected || true);

  useEffect(() => {
    if (netInfo.isConnected !== null && netInfo.isConnected !== undefined) {
      setIsConnected(netInfo.isConnected);
    }
  }, [netInfo]);

  return isConnected;
};

export default useNetworkStatus;
