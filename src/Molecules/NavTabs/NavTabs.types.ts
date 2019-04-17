export type ItemProps = {
  to: string;
  title: React.ReactNode;
};

export type TitleProps = {
  active: boolean;
  children: React.ReactNode;
  setRef: (ref: HTMLAnchorElement | null) => void;
  to: string;
  onKeyDown: (e: React.KeyboardEvent) => void;
};
