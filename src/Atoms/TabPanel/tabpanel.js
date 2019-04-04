import React from 'react';

const TabPanel = ({ selected, index, children }) => (
  <section
    id={`tabs-tabpanel-${index}`}
    role="tabpanel"
    aria-labelledby={`tabs-tab-${index}`}
    hidden={!selected}
  >
    {children}
  </section>
);

export { TabPanel };
