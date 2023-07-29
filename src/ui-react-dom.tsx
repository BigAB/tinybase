/** @jsx createElement */

import {
  BOOLEAN,
  CELL,
  CURRENT_TARGET,
  EMPTY_STRING,
  NUMBER,
  STRING,
  VALUE,
  _VALUE,
} from './common/strings';
import {Cell, Value} from './types/store';
import {CellOrValueType, getCellOrValueType, getTypeCase} from './common/cell';
import {
  CellProps,
  QueriesOrQueriesId,
  StoreOrStoreId,
  ValueProps,
} from './types/ui-react';
import {
  CellView,
  ResultCellView,
  ValueView,
  useCell,
  useResultRowIds,
  useResultSortedRowIds,
  useResultTableCellIds,
  useRowIds,
  useSetCellCallback,
  useSetValueCallback,
  useSortedRowIds,
  useTableCellIds,
  useValue,
  useValueIds,
} from './ui-react';
import {
  CustomCell,
  CustomResultCell,
  EditableCellView as EditableCellViewDecl,
  EditableValueView as EditableValueViewDecl,
  HtmlTableProps,
  ResultSortedTableInHtmlTable as ResultSortedTableInHtmlTableDecl,
  ResultSortedTableInHtmlTableProps,
  ResultTableInHtmlTable as ResultTableInHtmlTableDecl,
  ResultTableInHtmlTableProps,
  SortedTableInHtmlTable as SortedTableInHtmlTableDecl,
  SortedTableInHtmlTableProps,
  TableInHtmlTable as TableInHtmlTableDecl,
  TableInHtmlTableProps,
  ValuesInHtmlTable as ValuesInHtmlTableDecl,
  ValuesInHtmlTableProps,
} from './types/ui-react-dom.d';
import {Id, Ids} from './types/common';
import {isArray, isString, isUndefined} from './common/other';
import {objMap, objNew} from './common/obj';
import React from 'react';
import {arrayMap} from './common/array';
import {getProps} from './ui-react/common';

const {createElement, useCallback, useMemo, useState} = React;

type Sorting = [Id | undefined, boolean];

const EDITABLE = 'editable';
// const LEFT_ARROW = '\u2190';
const UP_ARROW = '\u2191';
// const RIGHT_ARROW = '\u2192';
const DOWN_ARROW = '\u2193';

const useCallbackOrUndefined = (
  callback: any,
  deps: React.DependencyList,
  test: any,
) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const returnCallback = useCallback(callback, deps);
  return test ? returnCallback : undefined;
};

const HtmlHeaderTh = ({
  cellId,
  sorting,
  label = cellId ?? EMPTY_STRING,
  onClick,
}: {
  readonly cellId?: Id;
  readonly sorting?: Sorting;
  readonly label?: string;
  readonly onClick?: (cellId: Id | undefined) => void;
}) => (
  <th
    onClick={useCallbackOrUndefined(
      () => onClick?.(cellId),
      [onClick, cellId],
      !isUndefined(onClick),
    )}
    className={
      isUndefined(sorting)
        ? undefined
        : sorting[0] != cellId
        ? undefined
        : `sorted ${sorting[1] ? 'de' : 'a'}scending`
    }
  >
    {isUndefined(sorting) || sorting[0] != cellId
      ? null
      : (sorting[1] ? DOWN_ARROW : UP_ARROW) + ' '}
    {label}
  </th>
);

const HtmlTable = ({
  className,
  headerRow,
  idColumn,
  customCells,
  storeTableIdOrQueriesQueryId,
  defaultCellComponent,
  rowIds,
  defaultCellIds,
  sorting,
  onHeaderThClick,
}: HtmlTableProps & {
  readonly customCells?:
    | Ids
    | {[cellId: string]: string | CustomCell | CustomResultCell}
    | undefined;
  readonly storeTableIdOrQueriesQueryId:
    | {store?: StoreOrStoreId; tableId: Id}
    | {queries?: QueriesOrQueriesId; queryId: Id};
  readonly defaultCellComponent: typeof CellView | typeof ResultCellView;
  readonly rowIds: Ids;
  readonly defaultCellIds: Ids;
  readonly sorting?: Sorting;
  readonly onHeaderThClick?: (cellId: Id | undefined) => void;
}) => {
  const customCellConfigurations = useMemo(() => {
    const cellIds = customCells ?? defaultCellIds;
    return objNew(
      objMap(
        isArray(cellIds)
          ? objNew(arrayMap(cellIds, (cellId) => [cellId, cellId]))
          : cellIds,
        (labelOrCustomCell, cellId) => [
          cellId,
          {
            ...{label: cellId},
            ...(isString(labelOrCustomCell)
              ? {label: labelOrCustomCell}
              : labelOrCustomCell),
          },
        ],
      ),
    );
  }, [customCells, defaultCellIds]);

  return (
    <table className={className}>
      {headerRow === false ? null : (
        <thead>
          <tr>
            {idColumn === false ? null : (
              <HtmlHeaderTh
                sorting={sorting}
                label="Id"
                onClick={onHeaderThClick}
              />
            )}
            {objMap(customCellConfigurations, ({label}, cellId) => (
              <HtmlHeaderTh
                key={cellId}
                cellId={cellId}
                label={label}
                sorting={sorting}
                onClick={onHeaderThClick}
              />
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {arrayMap(rowIds, (rowId) => (
          <tr key={rowId}>
            {idColumn === false ? null : <th>{rowId}</th>}
            {objMap(
              customCellConfigurations,
              (
                {component: CellView = defaultCellComponent, getComponentProps},
                cellId,
              ) => (
                <td key={cellId}>
                  <CellView
                    {...getProps(getComponentProps, rowId, cellId)}
                    {...(storeTableIdOrQueriesQueryId as any)}
                    rowId={rowId}
                    cellId={cellId}
                  />
                </td>
              ),
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const EditableThing = <Thing extends Cell | Value>({
  thing,
  onThingChange,
  className,
}: {
  readonly thing: Thing | undefined;
  readonly onThingChange: (thing: Thing | undefined) => void;
  readonly className: string;
}) => {
  const [thingType, setThingType] = useState<CellOrValueType>();
  const [currentThing, setCurrentThing] = useState<string | number | boolean>();
  const [stringThing, setStringThing] = useState<string>();
  const [numberThing, setNumberThing] = useState<number>();
  const [booleanThing, setBooleanThing] = useState<boolean>();

  if (currentThing !== thing) {
    setThingType(getCellOrValueType(thing));
    setCurrentThing(thing);
    setStringThing(String(thing));
    setNumberThing(Number(thing) || 0);
    setBooleanThing(Boolean(thing));
  }

  const handleThingChange = useCallback(
    (thing: string | number | boolean, setTypedThing: (thing: any) => void) => {
      setTypedThing(thing);
      setCurrentThing(thing);
      onThingChange(thing as Thing);
    },
    [onThingChange],
  );

  return (
    <div className={className}>
      <button
        className={thingType}
        onClick={useCallback(() => {
          const nextType = getTypeCase(
            thingType,
            NUMBER,
            BOOLEAN,
            STRING,
          ) as CellOrValueType;
          const thing = getTypeCase(
            nextType,
            stringThing,
            numberThing,
            booleanThing,
          );
          setThingType(nextType);
          setCurrentThing(thing);
          onThingChange(thing as Thing);
        }, [onThingChange, stringThing, numberThing, booleanThing, thingType])}
      >
        {thingType}
      </button>
      {getTypeCase(
        thingType,
        <input
          key={thingType}
          value={stringThing}
          onChange={useCallback(
            (event: React.FormEvent<HTMLInputElement>) =>
              handleThingChange(
                String(event[CURRENT_TARGET][_VALUE]),
                setStringThing,
              ),
            [handleThingChange],
          )}
        />,
        <input
          key={thingType}
          type="number"
          value={numberThing}
          onChange={useCallback(
            (event: React.FormEvent<HTMLInputElement>) =>
              handleThingChange(
                Number(event[CURRENT_TARGET][_VALUE] || 0),
                setNumberThing,
              ),
            [handleThingChange],
          )}
        />,
        <input
          key={thingType}
          type="checkbox"
          checked={booleanThing}
          onChange={useCallback(
            (event: React.FormEvent<HTMLInputElement>) =>
              handleThingChange(
                Boolean(event[CURRENT_TARGET].checked),
                setBooleanThing,
              ),
            [handleThingChange],
          )}
        />,
      )}
    </div>
  );
};

export const TableInHtmlTable: typeof TableInHtmlTableDecl = ({
  tableId,
  store,
  editable,
  ...props
}: TableInHtmlTableProps & HtmlTableProps): any => (
  <HtmlTable
    {...props}
    storeTableIdOrQueriesQueryId={useMemo(
      () => ({store, tableId}),
      [store, tableId],
    )}
    defaultCellComponent={editable ? EditableCellView : CellView}
    rowIds={useRowIds(tableId, store)}
    defaultCellIds={useTableCellIds(tableId, store)}
  />
);

export const SortedTableInHtmlTable: typeof SortedTableInHtmlTableDecl = ({
  tableId,
  cellId,
  descending,
  offset,
  limit,
  store,
  editable,
  sortOnClick,
  ...props
}: SortedTableInHtmlTableProps & HtmlTableProps): any => {
  const [sorting, setSorting] = useState<Sorting>([
    cellId,
    descending ? true : false,
  ]);
  const handleHeaderThClick = useCallbackOrUndefined(
    (cellId: Id | undefined) =>
      setSorting([cellId, cellId == sorting[0] ? !sorting[1] : false]),
    [sorting],
    sortOnClick,
  );
  return (
    <HtmlTable
      {...props}
      storeTableIdOrQueriesQueryId={useMemo(
        () => ({store, tableId}),
        [store, tableId],
      )}
      defaultCellComponent={editable ? EditableCellView : CellView}
      rowIds={useSortedRowIds(tableId, ...sorting, offset, limit, store)}
      defaultCellIds={useTableCellIds(tableId, store)}
      sorting={sorting}
      onHeaderThClick={handleHeaderThClick}
    />
  );
};

export const ValuesInHtmlTable: typeof ValuesInHtmlTableDecl = ({
  store,
  editable = false,
  valueComponent: Value = editable ? EditableValueView : ValueView,
  getValueComponentProps,
  className,
  headerRow,
  idColumn,
}: ValuesInHtmlTableProps & HtmlTableProps): any => (
  <table className={className}>
    {headerRow === false ? null : (
      <thead>
        <tr>
          {idColumn === false ? null : <th>Id</th>}
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

export const ResultTableInHtmlTable: typeof ResultTableInHtmlTableDecl = ({
  queryId,
  queries,
  ...props
}: ResultTableInHtmlTableProps & HtmlTableProps): any => (
  <HtmlTable
    {...props}
    storeTableIdOrQueriesQueryId={useMemo(
      () => ({queries, queryId}),
      [queries, queryId],
    )}
    defaultCellComponent={ResultCellView}
    rowIds={useResultRowIds(queryId, queries)}
    defaultCellIds={useResultTableCellIds(queryId, queries)}
  />
);

export const ResultSortedTableInHtmlTable: typeof ResultSortedTableInHtmlTableDecl =
  ({
    queryId,
    cellId,
    descending,
    offset,
    limit,
    queries,
    sortOnClick,
    ...props
  }: ResultSortedTableInHtmlTableProps & HtmlTableProps): any => {
    const [sorting, setSorting] = useState<Sorting>([
      cellId,
      descending ? true : false,
    ]);
    const handleHeaderThClick = useCallbackOrUndefined(
      (cellId: Id | undefined) =>
        setSorting([cellId, cellId == sorting[0] ? !sorting[1] : false]),
      [sorting],
      sortOnClick,
    );
    return (
      <HtmlTable
        {...props}
        storeTableIdOrQueriesQueryId={useMemo(
          () => ({queries, queryId}),
          [queries, queryId],
        )}
        defaultCellComponent={ResultCellView}
        rowIds={useResultSortedRowIds(
          queryId,
          ...sorting,
          offset,
          limit,
          queries,
        )}
        defaultCellIds={useResultTableCellIds(queryId, queries)}
        sorting={sorting}
        onHeaderThClick={handleHeaderThClick}
      />
    );
  };

export const EditableCellView: typeof EditableCellViewDecl = ({
  tableId,
  rowId,
  cellId,
  store,
  className,
}: CellProps & {readonly className?: string}) => (
  <EditableThing
    thing={useCell(tableId, rowId, cellId, store)}
    onThingChange={useSetCellCallback(
      tableId,
      rowId,
      cellId,
      (cell: Cell) => cell,
      [],
      store,
    )}
    className={className ?? EDITABLE + CELL}
  />
);

export const EditableValueView: typeof EditableValueViewDecl = ({
  valueId,
  store,
  className,
}: ValueProps & {readonly className?: string}) => (
  <EditableThing
    thing={useValue(valueId, store)}
    onThingChange={useSetValueCallback(
      valueId,
      (value: Value) => value,
      [],
      store,
    )}
    className={className ?? EDITABLE + VALUE}
  />
);
