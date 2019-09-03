export type ItemProps = {
  to: string;
  title: React.ReactNode;
  onTitleClick?: React.MouseEventHandler;
  exact?: boolean;
  className?: string;
};

export type ContainerProps = {
  height?: number;
  className?: string;
};

export type ItemComponent = React.FC<ItemProps>;
export type Component = React.FC<ContainerProps> & { Tab: ItemComponent };

export type TitleComponent = React.FC<TitleProps>;
export type TitleProps = {
  active: boolean;
  className?: string;
  onClick?: React.MouseEventHandler;
  children: React.ReactNode;
  setRef: (ref: HTMLAnchorElement | null) => void;
  to: string;
  onKeyDown: (e: React.KeyboardEvent) => void;
  height?: number;
};
