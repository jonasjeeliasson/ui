export type CollapsibleProps = {
  title: React.ReactNode;
  collapsedInitial?: boolean;
  heading?: 'h1' | 'h2' | 'h3';
};

export type IndicatorsProps = {
  collapsed: boolean;
};
