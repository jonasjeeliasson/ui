export type ItemProps = {
  title: React.ReactNode;
  children: React.ReactNode | React.ReactNode[];
};

export type TitleProps = {
  active: boolean;
  onTitleClick: React.MouseEventHandler<HTMLButtonElement>;
  index: number;
  setRef: (el: HTMLButtonElement | null) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
};

export type ContainerProps = {
  initialActiveTabId?: number;
  children: React.ReactNode;
};
