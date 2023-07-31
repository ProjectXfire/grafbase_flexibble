'use client';

import { useState, useEffect } from 'react';
import { getProviders, signIn } from 'next-auth/react';
import { Button } from '.';

interface IProvider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | null;
}

type IProviders = Record<string, IProvider>;

function AuthProvider(): JSX.Element {
  const [providers, setProviders] = useState<IProviders | null>(null);

  const fetchProviders = async (): Promise<void> => {
    const res = await getProviders();
    setProviders(res);
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  if (providers)
    return (
      <div>
        {Object.values(providers).map((prov, i) => (
          <Button
            textColor='white'
            bgColor='rgb(71, 114, 173)'
            key={i}
            text={prov.id[0].toUpperCase() + prov.id.slice(1)}
            onClick={() => {
              signIn(prov?.id);
            }}
          />
        ))}
      </div>
    );

  return <div>AuthProvider</div>;
}
export default AuthProvider;
