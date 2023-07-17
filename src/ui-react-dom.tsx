/** @jsx createElement */

import {
  CellInHtmlTd as CellInHtmlTdDecl,
  HtmlProps,
  HtmlTableProps,
  HtmlTrProps,
  RowInHtmlTr as RowInHtmlTrDecl,
  SortedTableInHtmlTable as SortedTableInHtmlTableDecl,
  TableInHtmlTable as TableInHtmlTableDecl,
  ValuesInHtmlTable as ValuesInHtmlTableDecl,
  ValuesInHtmlTableProps,
} from './types/ui-react-dom.d';
import {
  CellProps,
  RowProps,
  SortedTableProps,
  TableProps,
} from './types/ui-react.d';
import {
  CellView,
  RowView,
  SortedTableView,
  TableView,
  ValueView,
  useTableCellIds,
  useValueIds,
} from './ui-react';
import React, {useCallback} from 'react';
import {ID} from './tools/common/strings';
import {VALUE} from './common/strings';
import {arrayMap} from './common/array';
import {getProps} from './ui-react/common';
import {isUndefined} from './common/other';

const {createElement} = React;

const useClassName = (className?: string): {className?: string} =>
  isUndefined(className) ? {} : {className};

const useGetTrProps = (idColumn = true): (() => {idColumn: boolean}) =>
  useCallback(() => ({idColumn}), [idColumn]);

const HtmlTable = ({
  headerRow,
  idColumn,
  className,
  store,
  tableId,
  customCellIds,
  tableComponent: Table,
  ...props
}: (TableProps | SortedTableProps) &
  HtmlTableProps &
  HtmlProps & {
    tableComponent: typeof TableView | typeof SortedTableView;
  }) => {
  const defaultTableCellIds = useTableCellIds(tableId, store);
  const tableCellIds = customCellIds ?? defaultTableCellIds;
  return (
    <table {...useClassName(className)}>
      {headerRow === false ? null : (
        <thead>
          <tr>
            {idColumn === false ? null : <th>{ID}</th>}
            {arrayMap(tableCellIds, (tableCellId) => (
              <th key={tableCellId}>{tableCellId}</th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        <Table
          rowComponent={RowInHtmlTr}
          getRowComponentProps={useGetTrProps(idColumn)}
          store={store}
          tableId={tableId}
          customCellIds={tableCellIds}
          {...props}
        />
      </tbody>
    </table>
  );
};

export const CellInHtmlTd: typeof CellInHtmlTdDecl = ({
  className,
  ...props
}: CellProps & HtmlProps): any => (
  <td {...useClassName(className)}>
    <CellView {...props} />
  </td>
);

export const RowInHtmlTr: typeof RowInHtmlTrDecl = ({
  idColumn,
  className,
  rowId,
  ...props
}: RowProps & HtmlTrProps & HtmlProps): any => (
  <tr {...useClassName(className)}>
    {idColumn === false ? null : <th>{rowId}</th>}
    <RowView cellComponent={CellInHtmlTd} rowId={rowId} {...props} />
  </tr>
);

export const SortedTableInHtmlTable: typeof SortedTableInHtmlTableDecl = (
  props: SortedTableProps & HtmlTableProps & HtmlProps,
): any => <HtmlTable {...props} tableComponent={SortedTableView} />;

export const TableInHtmlTable: typeof TableInHtmlTableDecl = (
  props: TableProps & HtmlTableProps & HtmlProps,
): any => <HtmlTable {...props} tableComponent={TableView} />;

export const ValuesInHtmlTable: typeof ValuesInHtmlTableDecl = ({
  store,
  valueComponent: Value = ValueView,
  getValueComponentProps,
  className,
  headerRow,
  idColumn,
}: ValuesInHtmlTableProps): any => (
  <table {...useClassName(className)}>
    {headerRow === false ? null : (
      <thead>
        <tr>
          {idColumn === false ? null : <th>{ID}</th>}
          <th>{VALUE}</th>
        </tr>
      </thead>
    )}
    <tbody>
      {arrayMap(useValueIds(store), (valueId) => (
        <tr key={valueId}>
          {idColumn === false ? null : <th>{valueId}</th>}
          <td>
            <Value
              {...getProps(getValueComponentProps, valueId)}
              valueId={valueId}
              store={store}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
