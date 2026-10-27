import React from 'react';

const PageContainer = ({ children }) => (
  <main className="page-wrapper no-scrollbar">
    {children}
  </main>
);

export default PageContainer;
