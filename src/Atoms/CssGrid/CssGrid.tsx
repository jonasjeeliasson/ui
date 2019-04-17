import React from 'react';
import R from 'ramda';
import styled, { css, withTheme } from 'styled-components';
import { Theme } from '../../theme/theme.types';
import { Props, Gutter, TemplateColumn, TemplateRow, AreaName, AreaInfo } from './CssGrid.types';
import { isUndefined, assert } from '../../common/utils';
import { getAreasInfo } from './utils';

const formatAreas = (areas: Props['areas']) =>
  areas
    .map(areaRow => areaRow.join(' '))
    .map(area => `"${area}"`)
    .join(' ');

const isNumber = (x: any): x is number => x === parseInt(x, 10);
const isArrayOfStrings = (xs: any[]): xs is string[] => xs.every(x => typeof x === 'string');

const getGutterStyles = (props: { gutter: Gutter; theme: Theme }) => {
  const { gutter, theme } = props;
  const equalGaps = (value: number) => `grid-gap: ${theme.spacing.unit(value)}px;`;

  if (isNumber(gutter)) {
    return equalGaps(gutter);
  }

  const { col, row } = gutter;

  if (col && row && col === row) {
    return equalGaps(gutter.col);
  }

  return `
    ${col ? `column-gap: ${theme.spacing.unit(col)}px;` : ''};
    ${row ? `row-gap: ${theme.spacing.unit(row)}px;` : ''};
  `;
};

const getTemplateColumns = (props: { templateColumns?: TemplateColumn }): string => {
  const { templateColumns } = props;
  const oneColSize = 100 / 12;

  if (isUndefined(templateColumns)) {
    return '';
  }

  if (isArrayOfStrings(templateColumns)) {
    return `grid-template-columns: ${templateColumns.join(' ')};`;
  }

  return `grid-template-columns: ${templateColumns
    .map((x: number) => `${x * oneColSize}fr`)
    .join(' ')};`;
};

const getTemplateRows = (props: { templateRows?: TemplateRow }): string => {
  const { templateRows } = props;

  if (isUndefined(templateRows)) {
    return '';
  }

  return `grid-template-rows: ${templateRows.join(' ')};`;
};

const generateMSGridStyles = ({
  gutter,
  columns,
  rows,
  areas,
  templateColumnStyles,
  templateRowsStyles,
  theme,
}: {
  gutter: Gutter;
  columns: TemplateColumn | undefined;
  rows: string[] | undefined;
  areas: string[][] | undefined;
  templateColumnStyles: string;
  templateRowsStyles: string;
  theme: Theme;
}): string => {
  const styles = [`display: -ms-grid;`];
  const columnsInAreas = R.path([0, 'length'], areas);
  const rowsInAreas = R.path(['length'], areas);
  const isGutterPresented = !isUndefined(gutter);
  const isColumnsPresented = !isUndefined(columns);
  const isRowsPresented = !isUndefined(rows);

  if (!isGutterPresented) {
    if (!isColumnsPresented && !isRowsPresented) {
      // Simplest case just return initial display: -ms-grid
      return styles.join('\n');
    }
    if (isColumnsPresented) {
      styles.push(`-ms-grid-columns: ${templateColumnStyles};`);
    }
    if (isRowsPresented) {
      styles.push(`-ms-grid-rows: ${templateRowsStyles};`);
    }
    return styles.join('\n');
  }

  if (isGutterPresented) {
    // eslint-disable-next-line no-nested-ternary
    const rowGutter = isNumber(gutter)
      ? `${theme.spacing.unit(gutter)}px`
      : isNumber(gutter.row)
      ? `${theme.spacing.unit(gutter.row)}px`
      : gutter.row;

    // eslint-disable-next-line no-nested-ternary
    const colGutter = isNumber(gutter)
      ? `${theme.spacing.unit(gutter)}px`
      : isNumber(gutter.col)
      ? `${theme.spacing.unit(gutter.col)}px`
      : gutter.col;

    if (isRowsPresented) {
      const rawTemplateRowsStyles = templateRowsStyles
        .replace('grid-template-rows: ', '')
        .replace(';', '');
      /**
       * Here we suppose that grid-template-rows value is
       * space-separated set of css units
       * @todo verify this hypothesis
       */
      const msGridRowsStyles = rawTemplateRowsStyles.split(' ').join(` ${rowGutter} `);
      const msGridRows = `-ms-grid-rows: ${msGridRowsStyles};`;
      styles.push(msGridRows);
    } else {
      const msGridRowsStyles = new Array(rowsInAreas).fill('1fr').join(` ${rowGutter} `);
      const msGridRows = `-ms-grid-rows: ${msGridRowsStyles};`;
      styles.push(msGridRows);
    }

    if (isColumnsPresented) {
      const rawTemplateColumnStyles = templateColumnStyles
        .replace('grid-template-columns: ', '')
        .replace(';', '');
      /**
       * Here we suppose that grid-template-rows value is
       * space-separated set of css units
       * @todo verify this hypothesis
       */
      const msGridColumnsStyles = rawTemplateColumnStyles.split(' ').join(` ${colGutter} `);
      const msGridColumns = `-ms-grid-columns: ${msGridColumnsStyles};`;
      styles.push(msGridColumns);
    } else {
      const msGridColumnsStyles = new Array(columnsInAreas).fill('1fr').join(` ${rowGutter} `);
      const msGridColumns = `-ms-grid-columns: ${msGridColumnsStyles};`;
      styles.push(msGridColumns);
    }
    return styles.join('\n');
  }

  return styles.join('\n');
};

const StyledDiv = styled.div<Props>`
  display: grid;
  box-sizing: border-box;

  ${props => {
    const { sm, md, lg, xl } = props;
    const createStyles = (innerProps: Partial<Props>, size?: 'sm' | 'md' | 'lg' | 'xl') => {
      const { height, areas, templateRows, templateColumns } = innerProps;
      const gutter = isUndefined(innerProps.gutter)
        ? props.theme.spacing.gutter
        : innerProps.gutter;
      const templateColumnStyles =
        getTemplateColumns({
          ...innerProps,
          templateColumns,
        }) || '';
      const templateRowsStyles =
        getTemplateRows({
          ...innerProps,
          templateRows,
        }) || '';
      const baseStyles = `
          ${height ? `height: ${height};` : ''};
          ${areas ? `grid-template-areas: ${formatAreas(areas)};` : ''}
          ${templateRowsStyles}
          ${templateColumnStyles}
          ${getGutterStyles({ ...innerProps, gutter, theme: props.theme }) || ''}
          ${generateMSGridStyles({
            gutter,
            columns: templateColumns,
            rows: templateRows,
            areas,
            templateColumnStyles,
            templateRowsStyles,
            theme: props.theme,
          })}
        `;

      return size
        ? css`
            ${props.theme.media.greaterThan(props.theme.size[size])} {
              ${baseStyles}
            }
          `
        : css`
            ${baseStyles}
          `;
    };

    const styles = Object.entries({ sm, md, lg, xl })
      .filter(([_, sizeProps]) => sizeProps !== undefined)
      .map(([size, sizeProps]) => createStyles(sizeProps!, size as 'sm' | 'md' | 'lg' | 'xl'));
    styles.unshift(createStyles(props, undefined));
    return styles.join('\n');
  }}
` as React.FC<Props>;

export type ItemProps = {
  area: AreaName;
  justify?: 'start' | 'end' | 'center' | 'stretch';
  align?: 'start' | 'end' | 'center' | 'stretch';
  place?: string;
};

const RawCssGridItem = styled.div<ItemProps>`
  box-sizing: border-box;
  ${({ area }) => `grid-area: ${area};`}
  ${({ justify }) => (justify ? `justify-self: ${justify};` : '')}
  ${({ align }) => (align ? `align-self: ${align};` : '')}
  ${({ place }) => (place ? `place-self: ${place};` : '')}
`;

const CssGridItem: React.FC<ItemProps> = ({ align, area, children, justify, place }) => (
  <RawCssGridItem {...{ align, area, children, justify, place }} />
);
CssGridItem.displayName = 'CssGrid.Item';

const generateChildStyles = (
  areasInfo: Record<string, AreaInfo>,
  size: 'sm' | 'md' | 'lg' | 'xl' | undefined,
  theme: Theme,
) => (areaName: string): string => {
  assert(
    Boolean(areasInfo && areasInfo[areaName]),
    `CSSGrid: Couldn't find area name: ${areaName}`,
  );
  const info = areasInfo[areaName];
  const styles = [`-ms-grid-row: ${info.rowStart};`, `-ms-grid-column: ${info.colStart};`];
  styles.push(`-ms-grid-column-span: ${info.colSpan};`);
  styles.push(`-ms-grid-row-span: ${info.rowSpan};`);
  // prettier-ignore
  return size
    ? `
    ${theme.media.greaterThan(theme.size[size])} {
      ${styles.join('\n')}
    }
    `
    : styles.join('\n');
};

const RawCSSGridContainer: React.FC<Props & { theme: Theme }> = ({ theme, children, ...props }) => {
  const { sm, md, lg, xl } = props;

  const stylesFnsForChild = Object.entries({ sm, md, lg, xl })
    .filter(([_, sizeProps]) => sizeProps !== undefined)
    .map(([size, sizeProps]) =>
      generateChildStyles(
        getAreasInfo(
          (isUndefined(sizeProps!.areas) ? props.areas : sizeProps!.areas) as string[][],
          { col: true, row: true },
        ),
        size as 'sm' | 'md' | 'lg' | 'xl',
        theme,
      ),
    );

  stylesFnsForChild.unshift(
    generateChildStyles(getAreasInfo(props.areas, { col: true, row: true }), undefined, theme),
  );

  const stylesFnForChild = (areaName: string) => stylesFnsForChild.map(f => f(areaName)).join('\n');

  return (
    <StyledDiv {...props}>
      {React.Children.map(children as any, (child: { props: ItemProps }) => {
        return (
          // @ts-ignore
          <RawCssGridItem
            {...child.props}
            css={css`
              ${stylesFnForChild(child.props.area)}
            `}
          />
        );
      })}
    </StyledDiv>
  );
};
const CssGridContainer = withTheme(RawCSSGridContainer);
CssGridContainer.displayName = 'CssGrid.Container';

export const CssGrid = { Container: CssGridContainer, Item: CssGridItem };
