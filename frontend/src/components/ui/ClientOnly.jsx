import React from 'react'
import { useEffect, useState } from 'react';

function ClientOnly ({ children, fallback = null })  {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted ? children : fallback;
};

export default ClientOnly
