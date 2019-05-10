export type ItemProps = {
  title: React.ReactNode;
  children: React.ReactNode | React.ReactNode[];
};

export type TitleProps = {
  active: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  index: number;
  setRef: (el: HTMLButtonElement | null) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
};

export type ContainerProps = {
  initialActiveTabIndex?: number;
  children: React.ReactNode;
};

export type ItemComponent = React.FC<ItemProps>;
export type TitleComponent = React.FC<TitleProps>;
export type ContainerComponent = React.FC<ContainerProps> & { Tab: ItemComponent };
