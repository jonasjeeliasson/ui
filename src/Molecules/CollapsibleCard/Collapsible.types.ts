export type CollapsibleProps = {
  title: React.ReactNode;
  collapsedInitial?: boolean;
  heading?: 'h1' | 'h2' | 'h3';
  onClick?: (e: React.MouseEvent | React.TouchEvent) => void;
};

export type IndicatorsProps = {
  collapsed: boolean;
};
