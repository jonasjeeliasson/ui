export type ItemProps = {
  to: string;
  title: React.ReactNode;
};
export type ItemComponent = React.FC<ItemProps>;
export type Component = React.FC & { Tab: ItemComponent };

export type TitleComponent = React.FC<TitleProps>;
export type TitleProps = {
  active: boolean;
  children: React.ReactNode;
  setRef: (ref: HTMLAnchorElement | null) => void;
  to: string;
  onKeyDown: (e: React.KeyboardEvent) => void;
};
