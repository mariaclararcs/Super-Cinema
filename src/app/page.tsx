import React, { Suspense } from 'react';
import Home from "@/components/Home";

const HomePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home />
    </Suspense>
  );
};

export default HomePage;