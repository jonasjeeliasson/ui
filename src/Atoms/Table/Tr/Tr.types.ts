export type Props = {
  textAlign?: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
};

export type TrComponent = React.FunctionComponent<Props>;
