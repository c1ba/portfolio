import {createContext, PropsWithChildren, useEffect, useState} from 'react';
import client from './client';
import CMSClient from './CMSClient';

const CMSContext = createContext<CMSClient | undefined>(undefined);

const CMSProvider = ({children}: PropsWithChildren) => {
  const [cmsClient, setCmsClient] = useState<CMSClient | undefined>(undefined);

  useEffect(() => {
    const loadClient = async () => {
      const cms = await client;
      if (!cms) {
        return;
      }
      setCmsClient(cms);
    };

    loadClient();
  }, [client]);
  return <CMSContext value={cmsClient}>{children}</CMSContext>;
};

export default CMSProvider;
