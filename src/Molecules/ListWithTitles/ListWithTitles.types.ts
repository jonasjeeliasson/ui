import { Props as ListProps } from '../../Atoms/List/List.types';

type Props = {
  leftTitle?: React.ReactNode;
  rightTitle?: React.ReactNode;
};

export type ListWithTitlesComponent = React.FunctionComponent<ListProps & Props>;
