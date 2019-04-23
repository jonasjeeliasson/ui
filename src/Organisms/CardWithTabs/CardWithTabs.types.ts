import { Props as CardWithTitleProps } from '../../Molecules/CardWithTitle/CardWithTitle.types';
import { ItemComponent } from '../../Molecules/Tabs/Tabs.types';

export type Props = CardWithTitleProps;
export type Component = React.FC<Props> & { Tab: ItemComponent };
