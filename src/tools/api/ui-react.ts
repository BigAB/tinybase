import {
  CALLBACK,
  DEL,
  EXPORT,
  ID,
  LISTENER_,
  PARTIAL,
  RETURNS_VOID,
  SET,
  SQUARE_BRACKETS,
  THE_STORE,
  VOID,
  getCellContentDoc,
  getIdsDoc,
  getListenerDoc,
  getRowContentDoc,
  getRowDoc,
  getTableContentDoc,
  getTableDoc,
  getTheContentOfTheStoreDoc,
  getValueContentDoc,
} from '../common/strings';
import {
  CELL,
  CELL_IDS,
  EMPTY_STRING,
  GET,
  IDS,
  LISTENER,
  ROW,
  ROW_IDS,
  SORTED_ROW_IDS,
  TABLE,
  TABLES,
  TABLE_IDS,
  VALUE,
  VALUES,
  VALUE_IDS,
} from '../../common/strings';
import {IdMap, mapGet, mapMap, mapNew} from '../../common/map';
import {
  LINE,
  LINE_OR_LINE_TREE,
  LINE_TREE,
  camel,
  comment,
  getCodeFunctions,
  getParameterList,
  join,
  mapUnique,
} from '../common/code';
import {SharedTableTypes, SharedValueTypes, TableTypes} from './core';
import {TablesSchema, ValuesSchema} from '../../store.d';
import {arrayMap, arrayPush, arrayUnshift} from '../../common/array';
import {Id} from '../../common.d';
import {OR_UNDEFINED} from '../common/strings';
import {getSchemaFunctions} from '../common/schema';
import {isUndefined} from '../../common/other';
import {objIsEmpty} from '../../common/obj';

const DEPS = 'Deps';

const getGet = (noun: string) => GET + noun;
const getGetAndGetDeps = (noun: string) =>
  getParameterList(getGet(noun), getGet(noun) + DEPS);
const getPropsList = (...props: string[]) =>
  join(
    arrayMap(props, (prop) => 'readonly ' + prop),
    ';',
  );

const PARAMETER = 'Parameter';
const PROVIDER = 'Provider';
const GETTER_ARGS = ': (parameter: ' + PARAMETER + ', store: Store) => ';
const USE_CONTEXT = 'const contextValue = useContext(Context);';
const AND_REGISTERS =
  ', and registers a listener so that any changes to ' +
  'that result will cause a re-render';
const BASED_ON_A_PARAMETER = ', based on a parameter';
const COLON_SPACE = ': ';
const PARAMETERIZED_CALLBACK =
  PARAMETER + 'ized' + CALLBACK + '<' + PARAMETER + '>';
const GENERIC_PARAMETER = '<' + PARAMETER + ',>';
const DEPS_SUFFIX = DEPS + '?: React.DependencyList';
const THEN_DEPS = 'then' + DEPS_SUFFIX;
const THEN_PREFIX = 'then?: (store: Store';
const THEN_AND_THEN_DEPS = getParameterList(
  THEN_PREFIX + ')' + RETURNS_VOID,
  THEN_DEPS,
);
const THEN_AND_THEN_DEPS_IN_CALL = 'then, then' + DEPS;
const ROW_ID = 'rowId';
const TYPED_ROW_ID = ROW_ID + COLON_SPACE + ID;
const VIEW = 'View';

const getListenerHookParams = (
  listenerType: string,
  ...extraParams: string[]
) =>
  getParameterList(
    ...extraParams,
    LISTENER_ + ': ' + listenerType,
    LISTENER_ + DEPS_SUFFIX,
    'mutator?: boolean',
  );

const getListenerHookParamsInCall = (...extraParams: string[]) =>
  getParameterList(...extraParams, LISTENER_, LISTENER_ + DEPS, 'mutator');

export const getStoreUiReactApi = (
  tablesSchema: TablesSchema,
  valuesSchema: ValuesSchema,
  module: string,
  sharedTableTypes: SharedTableTypes | [],
  sharedValueTypes: SharedValueTypes | [],
): [string, string] => {
  const [
    build,
    addImport,
    addType,
    addInternalFunction,
    addConstant,
    getImports,
    getTypes,
    getConstants,
  ] = getCodeFunctions();

  const [mapTablesSchema, mapCellSchema, mapValuesSchema] = getSchemaFunctions(
    tablesSchema,
    valuesSchema,
    addConstant,
  );

  const moduleDefinition = `./${camel(module)}.d`;
  const uiReactModuleDefinition = `./${camel(module)}-ui-react.d`;
  const tinyBaseUiReact = 'tinybase/ui-react';
  const storeType = camel(module, 1);
  const storeInstance = camel(storeType);
  const StoreOrStoreId = storeType + 'Or' + storeType + ID;
  const storeOrStoreId = storeInstance + 'Or' + storeType + ID;

  const functions: IdMap<
    [
      parameters: LINE,
      returnType: string | 1,
      body: LINE,
      doc: string,
      generic: string,
    ]
  > = mapNew();

  const addFunction = (
    name: Id,
    parameters: LINE,
    returnType: string | 1,
    body: LINE_OR_LINE_TREE,
    doc: string,
    generic = EMPTY_STRING,
  ): Id => {
    addImport(1, uiReactModuleDefinition, name + ' as ' + name + 'Decl');
    return mapUnique(functions, name, [
      parameters,
      returnType,
      body,
      doc,
      generic,
    ]);
  };

  const addHook = (
    name: string,
    parameters: LINE,
    returnType: string,
    body: LINE_OR_LINE_TREE,
    doc: string,
    generic = EMPTY_STRING,
  ) => addFunction(`use${name}`, parameters, returnType, body, doc, generic);

  const addProxyHook = (
    name: string,
    underlyingName: string,
    returnType: string,
    doc: string,
    preParameters = EMPTY_STRING,
    preParametersInCall = EMPTY_STRING,
    generic = EMPTY_STRING,
    postParameters = EMPTY_STRING,
    postParametersInCall = EMPTY_STRING,
  ) => {
    addImport(
      1,
      tinyBaseUiReact,
      `use${underlyingName} as use${underlyingName}Core`,
    );
    return addHook(
      name,
      getParameterList(preParameters, storeOrStoreIdParameter, postParameters),
      returnType,
      useHook +
        `(${storeOrStoreId}, use${underlyingName}Core, [` +
        (preParametersInCall ? preParametersInCall : EMPTY_STRING) +
        (postParametersInCall ? '], [' + postParametersInCall : EMPTY_STRING) +
        ']);',
      doc,
      generic,
    );
  };

  const addComponent = (
    name: Id,
    parameters: LINE,
    body: LINE_OR_LINE_TREE,
    doc: string,
  ) => addFunction(name, parameters, 1, body, doc);

  const getFunctions = (location: 0 | 1 = 0): LINE_TREE =>
    mapMap(functions, ([parameters, returnType, body, doc, generic], name) => {
      const lines = location
        ? [
            EXPORT +
              ` const ${name}: typeof ${name}Decl = ${generic}` +
              `(${parameters}): ${returnType == 1 ? 'any' : returnType} =>`,
            body,
          ]
        : [
            EXPORT +
              ` function ${name}${generic}(${parameters}` +
              `): ${returnType == 1 ? 'ComponentReturnType' : returnType};`,
          ];
      if (!location) {
        arrayUnshift(lines, comment(doc));
      }
      arrayPush(lines, EMPTY_STRING);
      return lines;
    });

  addImport(
    null,
    'tinybase',
    ID,
    IDS,
    'IdOrNull',
    'Store',
    CALLBACK,
    PARAMETER + 'ized' + CALLBACK,
  );
  addImport(0, tinyBaseUiReact, 'ComponentReturnType');
  addImport(0, moduleDefinition, storeType);

  const storeOrStoreIdType = addType(
    StoreOrStoreId,
    storeType + ' | ' + ID,
    `Used when you need to refer to a ${storeType} in a React hook or ` +
      'component',
  );

  const providerPropsType = addType(
    PROVIDER + 'Props',
    `{readonly ${storeInstance}?: ${storeType}; ` +
      `readonly ${storeInstance}ById?: ` +
      `{[${storeInstance}Id: Id]: ${storeType}}}`,
    'Used with the ' +
      PROVIDER +
      ' component, so that ' +
      `a ${storeType} can be passed into the context of an application`,
  );

  addImport(0, 'react', 'ReactElement', 'ComponentType');
  addImport(1, 'react', 'React');
  addImport(1, uiReactModuleDefinition, storeOrStoreIdType, providerPropsType);

  const storeOrStoreIdParameter = storeOrStoreId + '?: ' + storeOrStoreIdType;

  addConstant('{createContext, useContext, useMemo}', 'React');

  addConstant(
    'Context',
    `createContext<[${storeType}?, ` +
      `{[${storeInstance}Id: Id]: ${storeType}}?]>([])`,
  );

  addHook(
    `Create${storeType}`,
    `create: () => ${storeType}, create` + DEPS_SUFFIX,
    storeType,
    '\n// eslint-disable-next-line react-hooks/exhaustive-deps\n' +
      'useMemo(create, createDeps)',
    `Create a ${storeType} within a React application with convenient ` +
      'memoization',
  );

  const getStoreHook = addHook(
    storeType,
    `id?: Id`,
    storeType + OR_UNDEFINED,
    [
      '{',
      USE_CONTEXT,
      'return id == null ? contextValue[0] : contextValue[1]?.[id];',
      '}',
    ],
    `Get a reference to a ${storeType} from within a ${PROVIDER} component ` +
      'context',
  );

  const useHook = addInternalFunction(
    `useHook`,
    storeOrStoreId +
      `: ${storeOrStoreIdType} | undefined, hook: (...params: any[]) => any, ` +
      `preParams: any[], postParams: any[] = []`,
    [
      `const ${storeInstance} = ${getStoreHook}(${storeOrStoreId} as Id);`,
      `return hook(...preParams, ((${storeOrStoreId} == null || ` +
        `typeof ${storeOrStoreId} == 'string')`,
      `? ${storeInstance} : ${storeOrStoreId})?.getStore(), ...postParams)`,
    ],
  );

  const getProps = addInternalFunction(
    'getProps',
    'getProps: ((id: any) => ExtraProps) | undefined, id: Id',
    '(getProps == null) ? ({} as ExtraProps) : getProps(id)',
  );

  const wrap = addInternalFunction(
    'wrap',
    getParameterList(
      'children: any',
      'separator?: any',
      'encloseWithId?: boolean',
      'id?: Id',
    ),
    [
      'const separated = separator==null || !Array.isArray(children)',
      ' ? children',
      ' : children.map((child, c) => (c > 0 ? [separator, child] : child));',
      `return encloseWithId ? [id, ':{', separated, '}'] : separated;`,
    ],
  );

  if (!objIsEmpty(tablesSchema)) {
    const [
      tablesType,
      tableIdType,
      tablesListenerType,
      tableIdsListenerType,
      tableListenerType,
      rowIdsListenerType,
      sortedRowIdsListenerType,
      rowListenerType,
      cellIdsListenerType,
      cellListenerType,
      tablesTypes,
    ] = sharedTableTypes as SharedTableTypes;

    addImport(
      null,
      moduleDefinition,
      tablesType,
      tableIdType,
      tablesListenerType,
      tableIdsListenerType,
      tableListenerType,
      rowIdsListenerType,
      sortedRowIdsListenerType,
      rowListenerType,
      cellIdsListenerType,
      cellListenerType,
    );

    addImport(null, tinyBaseUiReact, 'ExtraProps');
    addImport(1, moduleDefinition, storeType);

    const tableView = addInternalFunction(
      'tableView',
      '{store, rowComponent, getRowComponentProps, separator, ' +
        'debugIds}: any, rowIds: Ids, ' +
        'tableId: Id, ' +
        'defaultRowComponent: React.ComponentType<any>',
      [
        'const Row = rowComponent ?? defaultRowComponent;',
        `return ${wrap}(rowIds.map((rowId) => (`,
        '<Row',
        '{...' + getProps + '(getRowComponentProps, rowId)}',
        'key={rowId}',
        'tableId={tableId}',
        'rowId={rowId}',
        'store={store}',
        'debugIds={debugIds}',
        '/>',
        ')),',
        'separator,',
        'debugIds,',
        'tableId,',
        ');',
      ],
    );

    addProxyHook(
      TABLES,
      TABLES,
      tablesType,
      getTheContentOfTheStoreDoc(1, 0) + AND_REGISTERS,
    );

    addProxyHook(
      TABLE_IDS,
      TABLE_IDS,
      tableIdType + SQUARE_BRACKETS,
      getIdsDoc(TABLE, THE_STORE) + AND_REGISTERS,
    );

    addProxyHook(
      SET + TABLES + CALLBACK,
      SET + TABLES + CALLBACK,
      PARAMETERIZED_CALLBACK,
      getTheContentOfTheStoreDoc(1, 9) + BASED_ON_A_PARAMETER,
      getParameterList(
        getGet(TABLES) + GETTER_ARGS + tablesType,
        getGet(TABLES) + DEPS_SUFFIX,
      ),
      getGetAndGetDeps(TABLES),
      GENERIC_PARAMETER,
      getParameterList(
        THEN_PREFIX,
        `tables: ${tablesType})` + RETURNS_VOID,
        THEN_DEPS,
      ),
      THEN_AND_THEN_DEPS_IN_CALL,
    );

    addProxyHook(
      DEL + TABLES + CALLBACK,
      DEL + TABLES + CALLBACK,
      CALLBACK,
      getTheContentOfTheStoreDoc(1, 12),
      EMPTY_STRING,
      EMPTY_STRING,
      EMPTY_STRING,
      THEN_AND_THEN_DEPS,
      THEN_AND_THEN_DEPS_IN_CALL,
    );

    const getDefaultTableComponent = addInternalFunction(
      'getDefaultTableComponent',
      'tableId: TableId',
      join(
        mapTablesSchema(
          (_, tableName, TABLE_ID) =>
            `(tableId == ${TABLE_ID}) ? ${tableName}TableView : `,
        ),
      ) + `() => null`,
    );

    const tablesPropsType = addType(
      'TablesProps',
      '{' +
        getPropsList(
          storeInstance + '?: ' + storeType,
          'tableComponents?: {' +
            join(
              mapTablesSchema(
                (tableId: Id, tableName: string) =>
                  `'${tableId}'?: ComponentType<${tableName}TableProps>`,
              ),
              ', ',
            ) +
            '}',
          `getTableComponentProps?: (tableId: ${tableIdType}) => ExtraProps`,
          'separator?: ReactElement | string',
          'debugIds?: boolean',
        ) +
        '}',
      'The props passed to a component that renders Tables',
    );
    addImport(1, uiReactModuleDefinition, tablesPropsType);

    addComponent(
      TABLES + VIEW,
      '{' +
        storeInstance +
        ', tableComponents, getTableComponentProps, separator, debugIds}: ' +
        tablesPropsType,
      [
        wrap + `(useTableIds(${storeInstance}).map((tableId) => {`,
        'const Table = tableComponents?.[tableId] ?? ' +
          getDefaultTableComponent +
          '(tableId);',
        'return <Table ',
        `{...${getProps}(getTableComponentProps, tableId)} `,
        'key={tableId} ',
        `${storeInstance}={${storeInstance}} `,
        'debugIds={debugIds} ',
        '/>;',
        '}), separator)',
      ],
      getTheContentOfTheStoreDoc(1, 13) + AND_REGISTERS,
    );

    mapTablesSchema((tableId: Id, tableName: string, TABLE_ID: string) => {
      const [tableType, rowType, rowWhenSetType, cellIdType] = mapGet(
        tablesTypes,
        tableId,
      ) as TableTypes;

      addImport(
        0,
        moduleDefinition,
        tableType,
        rowType,
        rowWhenSetType,
        cellIdType,
      );
      addImport(
        1,
        moduleDefinition,
        tableType,
        rowType,
        rowWhenSetType,
        cellIdType,
      );

      addProxyHook(
        tableName + TABLE,
        TABLE,
        tableType,
        getTableContentDoc(tableId) + AND_REGISTERS,
        EMPTY_STRING,
        TABLE_ID,
      );

      const useRowIds = addProxyHook(
        tableName + ROW_IDS,
        ROW_IDS,
        IDS,
        getIdsDoc(ROW, getTableDoc(tableId)) + AND_REGISTERS,
        EMPTY_STRING,
        TABLE_ID,
      );

      const useSortedRowIds = addProxyHook(
        tableName + SORTED_ROW_IDS,
        SORTED_ROW_IDS,
        IDS,
        getIdsDoc(ROW, getTableDoc(tableId), 1) + AND_REGISTERS,
        'cellId?: ' +
          cellIdType +
          ', descending?: boolean, offset?: number, limit?: number',
        TABLE_ID + ', cellId, descending, offset, limit',
      );

      addProxyHook(
        tableName + ROW,
        ROW,
        rowType,
        getRowContentDoc(tableId) + AND_REGISTERS,
        TYPED_ROW_ID,
        getParameterList(TABLE_ID, ROW_ID),
      );

      addProxyHook(
        tableName + CELL_IDS,
        CELL_IDS,
        cellIdType + SQUARE_BRACKETS,
        getIdsDoc(CELL, getRowDoc(tableId)) + AND_REGISTERS,
        TYPED_ROW_ID,
        getParameterList(TABLE_ID, ROW_ID),
      );

      addProxyHook(
        SET + tableName + TABLE + CALLBACK,
        SET + TABLE + CALLBACK,
        PARAMETERIZED_CALLBACK,
        getTableContentDoc(tableId, 9) + BASED_ON_A_PARAMETER,
        getParameterList(
          getGet(TABLE) + GETTER_ARGS + tableType,
          getGet(TABLE) + DEPS_SUFFIX,
        ),
        getParameterList(TABLE_ID, getGetAndGetDeps(TABLE)),
        GENERIC_PARAMETER,
        getParameterList(
          THEN_PREFIX,
          `table: ${tableType})` + RETURNS_VOID,
          THEN_DEPS,
        ),
        THEN_AND_THEN_DEPS_IN_CALL,
      );

      addProxyHook(
        DEL + tableName + TABLE + CALLBACK,
        DEL + TABLE + CALLBACK,
        CALLBACK,
        getTableContentDoc(tableId, 12),
        EMPTY_STRING,
        TABLE_ID,
        EMPTY_STRING,
        THEN_AND_THEN_DEPS,
        THEN_AND_THEN_DEPS_IN_CALL,
      );

      addProxyHook(
        SET + tableName + ROW + CALLBACK,
        SET + ROW + CALLBACK,
        PARAMETERIZED_CALLBACK,
        getRowContentDoc(tableId, 9) + BASED_ON_A_PARAMETER,
        getParameterList(
          TYPED_ROW_ID,
          getGet(ROW) + GETTER_ARGS + rowWhenSetType,
          getGet(ROW) + DEPS_SUFFIX,
        ),
        getParameterList(TABLE_ID, ROW_ID, getGetAndGetDeps(ROW)),
        GENERIC_PARAMETER,
        getParameterList(
          THEN_PREFIX,
          `row: ${rowWhenSetType})` + RETURNS_VOID,
          THEN_DEPS,
        ),
        THEN_AND_THEN_DEPS_IN_CALL,
      );

      addProxyHook(
        'Add' + tableName + ROW + CALLBACK,
        'Add' + ROW + CALLBACK,
        PARAMETERIZED_CALLBACK,
        getRowContentDoc(tableId, 10) + BASED_ON_A_PARAMETER,
        getParameterList(
          getGet(ROW) + GETTER_ARGS + rowWhenSetType,
          getGet(ROW) + DEPS_SUFFIX,
        ),
        getParameterList(TABLE_ID, getGetAndGetDeps(ROW)),
        GENERIC_PARAMETER,
        'then?: (' +
          getParameterList(
            TYPED_ROW_ID + OR_UNDEFINED,
            'store: Store',
            'row: ' + rowWhenSetType + ')' + RETURNS_VOID,
            'then' + DEPS_SUFFIX,
          ),
        THEN_AND_THEN_DEPS_IN_CALL,
      );

      addProxyHook(
        SET + tableName + PARTIAL + ROW + CALLBACK,
        SET + PARTIAL + ROW + CALLBACK,
        PARAMETERIZED_CALLBACK,
        getRowContentDoc(tableId, 11) + BASED_ON_A_PARAMETER,
        getParameterList(
          TYPED_ROW_ID,
          getGet(PARTIAL + ROW) + GETTER_ARGS + rowWhenSetType,
          getGet(PARTIAL + ROW) + DEPS_SUFFIX,
        ),
        getParameterList(TABLE_ID, ROW_ID, getGetAndGetDeps(PARTIAL + ROW)),
        GENERIC_PARAMETER,
        getParameterList(
          THEN_PREFIX,
          `partialRow: ${rowWhenSetType})` + RETURNS_VOID,
          THEN_DEPS,
        ),
        THEN_AND_THEN_DEPS_IN_CALL,
      );

      addProxyHook(
        DEL + tableName + ROW + CALLBACK,
        DEL + ROW + CALLBACK,
        CALLBACK,
        getRowContentDoc(tableId, 12),
        TYPED_ROW_ID,
        getParameterList(TABLE_ID, ROW_ID),
        EMPTY_STRING,
        THEN_AND_THEN_DEPS,
        THEN_AND_THEN_DEPS_IN_CALL,
      );

      const rowPropsType = addType(
        tableName + 'RowProps',
        'any',
        'The props passed to a component that renders a Row in the ' +
          `'${tableId}' Table`,
      );

      const tablePropsType = addType(
        tableName + 'TableProps',
        '{' +
          getPropsList(
            storeInstance + '?: ' + storeType,
            `rowComponent?: ComponentType<${rowPropsType}>`,
            `getRowComponentProps?: (rowId: Id) => ExtraProps`,
            'separator?: ReactElement | string',
            'debugIds?: boolean',
          ) +
          '}',
        `The props passed to a component that renders the '${tableId}' Table`,
      );

      const sortedTablePropsType = addType(
        tableName + 'SortedTableProps',
        '{' +
          getPropsList(
            'cellId?: ' + cellIdType,
            'descending?: boolean',
            'offset?: number',
            'limit?: number',
            storeInstance + '?: ' + storeType,
            `rowComponent?: ComponentType<${rowPropsType}>`,
            `getRowComponentProps?: (rowId: Id) => ExtraProps`,
            'separator?: ReactElement | string',
            'debugIds?: boolean',
          ) +
          '}',
        'The props passed to a component that renders the ' +
          `'${tableId}' Table, sorted`,
      );

      addImport(
        1,
        uiReactModuleDefinition,
        rowPropsType,
        tablePropsType,
        sortedTablePropsType,
      );

      const rowView = addComponent(
        tableName + ROW + VIEW,
        '_props: ' + rowPropsType,
        `<b>${tableName} row</b>`,
        getRowContentDoc(tableId, 13) + AND_REGISTERS,
      );

      addComponent(
        tableName + 'Sorted' + TABLE + VIEW,
        '{cellId, descending, offset, limit, ...props}: ' +
          sortedTablePropsType,
        tableView +
          '(props, ' +
          useSortedRowIds +
          `(cellId, descending, offset, limit, props.${storeInstance}), ` +
          `${TABLE_ID}, ${rowView});`,
        getTableContentDoc(tableId, 13) + ', sorted' + AND_REGISTERS,
      );

      addComponent(
        tableName + TABLE + VIEW,
        'props: ' + tablePropsType,
        tableView +
          '(props, ' +
          useRowIds +
          `(props.${storeInstance}), ${TABLE_ID}, ${rowView});`,
        getTableContentDoc(tableId, 13) + AND_REGISTERS,
      );

      mapCellSchema(
        tableId,
        (cellId, type, defaultValue, CELL_ID, cellName) => {
          const mapCellType = 'Map' + camel(type, 1);
          addImport(0, moduleDefinition, mapCellType);
          addImport(1, moduleDefinition, mapCellType);

          addProxyHook(
            tableName + cellName + CELL,
            CELL,
            type + (isUndefined(defaultValue) ? OR_UNDEFINED : EMPTY_STRING),
            getCellContentDoc(tableId, cellId) + AND_REGISTERS,
            TYPED_ROW_ID,
            getParameterList(TABLE_ID, ROW_ID, CELL_ID),
          );

          addProxyHook(
            SET + tableName + cellName + CELL + CALLBACK,
            SET + CELL + CALLBACK,
            PARAMETERIZED_CALLBACK,
            getCellContentDoc(tableId, cellId, 9) + BASED_ON_A_PARAMETER,
            getParameterList(
              TYPED_ROW_ID,
              getGet(CELL) + GETTER_ARGS + type + ' | ' + mapCellType,
              getGet(CELL) + DEPS_SUFFIX,
            ),
            getParameterList(TABLE_ID, ROW_ID, CELL_ID, getGetAndGetDeps(CELL)),
            GENERIC_PARAMETER,
            getParameterList(
              THEN_PREFIX,
              `cell: ${type} | ${mapCellType})` + RETURNS_VOID,
              THEN_DEPS,
            ),
            THEN_AND_THEN_DEPS_IN_CALL,
          );

          addProxyHook(
            DEL + tableName + cellName + CELL + CALLBACK,
            DEL + CELL + CALLBACK,
            CALLBACK,
            getCellContentDoc(tableId, cellId, 12),
            getParameterList(TYPED_ROW_ID, 'forceDel?: boolean'),
            getParameterList(TABLE_ID, ROW_ID, CELL_ID, 'forceDel'),
            EMPTY_STRING,
            THEN_AND_THEN_DEPS,
            THEN_AND_THEN_DEPS_IN_CALL,
          );
        },
      );
    });

    const cellIdsType = join(
      mapTablesSchema(
        (tableId) => mapGet(tablesTypes, tableId)?.[3] ?? EMPTY_STRING,
      ),
      ' | ',
    );

    addProxyHook(
      TABLES + LISTENER,
      TABLES + LISTENER,
      VOID,
      getTheContentOfTheStoreDoc(1, 8) + ' changes',
      getListenerHookParams(tablesListenerType),
      getListenerHookParamsInCall(),
    );

    addProxyHook(
      TABLE_IDS + LISTENER,
      TABLE_IDS + LISTENER,
      VOID,
      getListenerDoc(2, 0, 1),
      getListenerHookParams(tableIdsListenerType),
      getListenerHookParamsInCall(),
    );

    addProxyHook(
      TABLE + LISTENER,
      TABLE + LISTENER,
      VOID,
      getListenerDoc(3, 0),
      getListenerHookParams(
        tableListenerType,
        `tableId: ${tableIdType} | null`,
      ),
      getListenerHookParamsInCall('tableId'),
    );

    addProxyHook(
      ROW_IDS + LISTENER,
      ROW_IDS + LISTENER,
      VOID,
      getListenerDoc(4, 3, 1),
      getListenerHookParams(
        rowIdsListenerType,
        `tableId: ${tableIdType} | null`,
      ),
      getListenerHookParamsInCall('tableId'),
    );

    addProxyHook(
      SORTED_ROW_IDS + LISTENER,
      SORTED_ROW_IDS + LISTENER,
      VOID,
      getListenerDoc(13, 3, 1),
      getListenerHookParams(
        sortedRowIdsListenerType,
        `tableId: ${tableIdType} | null`,
        'cellId: ' + cellIdsType + OR_UNDEFINED,
        'descending: boolean',
        'offset: number',
        'limit: number' + OR_UNDEFINED,
      ),
      getListenerHookParamsInCall(
        'tableId',
        'cellId',
        'descending',
        'offset',
        'limit',
      ),
    );

    addProxyHook(
      ROW + LISTENER,
      ROW + LISTENER,
      VOID,
      getListenerDoc(5, 3),
      getListenerHookParams(
        rowListenerType,
        `tableId: ${tableIdType} | null`,
        ROW_ID + `: IdOrNull`,
      ),
      getListenerHookParamsInCall('tableId', ROW_ID),
    );

    addProxyHook(
      CELL_IDS + LISTENER,
      CELL_IDS + LISTENER,
      VOID,
      getListenerDoc(6, 5, 1),
      getListenerHookParams(
        cellIdsListenerType,
        `tableId: ${tableIdType} | null`,
        ROW_ID + `: IdOrNull`,
      ),
      getListenerHookParamsInCall('tableId', ROW_ID),
    );

    addProxyHook(
      CELL + LISTENER,
      CELL + LISTENER,
      VOID,
      getListenerDoc(7, 5),
      getListenerHookParams(
        cellListenerType,
        `tableId: ${tableIdType} | null`,
        ROW_ID + `: IdOrNull`,
        `cellId: ${cellIdsType} | null`,
      ),
      getListenerHookParamsInCall('tableId', ROW_ID, 'cellId'),
    );
  }

  if (!objIsEmpty(valuesSchema)) {
    const [
      valuesType,
      valuesWhenSetType,
      valueIdType,
      valuesListenerType,
      valueIdsListenerType,
      valueListenerType,
    ] = sharedValueTypes as SharedValueTypes;

    addImport(
      null,
      moduleDefinition,
      ...(sharedValueTypes as SharedValueTypes),
    );

    addProxyHook(
      VALUES,
      VALUES,
      valuesType,
      getTheContentOfTheStoreDoc(2, 0) + AND_REGISTERS,
    );

    addProxyHook(
      VALUE_IDS,
      VALUE_IDS,
      valueIdType + SQUARE_BRACKETS,
      getIdsDoc(VALUE, THE_STORE) + AND_REGISTERS,
    );

    addProxyHook(
      SET + VALUES + CALLBACK,
      SET + VALUES + CALLBACK,
      PARAMETERIZED_CALLBACK,
      getTheContentOfTheStoreDoc(2, 9) + BASED_ON_A_PARAMETER,
      getParameterList(
        getGet(VALUES) + GETTER_ARGS + valuesWhenSetType,
        getGet(VALUES) + DEPS_SUFFIX,
      ),
      getGetAndGetDeps(VALUES),
      GENERIC_PARAMETER,
      getParameterList(
        THEN_PREFIX,
        `values: ${valuesWhenSetType})` + RETURNS_VOID,
        THEN_DEPS,
      ),
      THEN_AND_THEN_DEPS_IN_CALL,
    );

    addProxyHook(
      SET + PARTIAL + VALUES + CALLBACK,
      SET + PARTIAL + VALUES + CALLBACK,
      PARAMETERIZED_CALLBACK,
      getTheContentOfTheStoreDoc(2, 11) + BASED_ON_A_PARAMETER,
      getParameterList(
        getGet(PARTIAL + VALUES) + GETTER_ARGS + valuesWhenSetType,
        getGet(PARTIAL + VALUES) + DEPS_SUFFIX,
      ),
      getGetAndGetDeps(PARTIAL + VALUES),
      GENERIC_PARAMETER,
      getParameterList(
        THEN_PREFIX,
        `partialValues: ${valuesWhenSetType})` + RETURNS_VOID,
        THEN_DEPS,
      ),
      THEN_AND_THEN_DEPS_IN_CALL,
    );

    addProxyHook(
      DEL + VALUES + CALLBACK,
      DEL + VALUES + CALLBACK,
      CALLBACK,
      getTheContentOfTheStoreDoc(2, 12),
      EMPTY_STRING,
      EMPTY_STRING,
      EMPTY_STRING,
      THEN_AND_THEN_DEPS,
      THEN_AND_THEN_DEPS_IN_CALL,
    );

    mapValuesSchema((valueId, type, _, VALUE_ID, valueName) => {
      const mapValueType = 'Map' + camel(type, 1);
      addImport(0, moduleDefinition, mapValueType);
      addImport(1, moduleDefinition, mapValueType);

      addProxyHook(
        valueName + VALUE,
        VALUE,
        type,
        getValueContentDoc(valueId) + AND_REGISTERS,
        EMPTY_STRING,
        VALUE_ID,
      );

      addProxyHook(
        SET + valueName + VALUE + CALLBACK,
        SET + VALUE + CALLBACK,
        PARAMETERIZED_CALLBACK,
        getValueContentDoc(valueId, 9) + BASED_ON_A_PARAMETER,
        getParameterList(
          getGet(VALUE) + GETTER_ARGS + type + ' | ' + mapValueType,
          getGet(VALUE) + DEPS_SUFFIX,
        ),
        getParameterList(VALUE_ID, getGetAndGetDeps(VALUE)),
        GENERIC_PARAMETER,
        getParameterList(
          THEN_PREFIX,
          `value: ${type} | ${mapValueType})` + RETURNS_VOID,
          THEN_DEPS,
        ),
        THEN_AND_THEN_DEPS_IN_CALL,
      );

      addProxyHook(
        DEL + valueName + VALUE + CALLBACK,
        DEL + VALUE + CALLBACK,
        CALLBACK,
        getValueContentDoc(valueId, 12),
        EMPTY_STRING,
        VALUE_ID,
        EMPTY_STRING,
        THEN_AND_THEN_DEPS,
        THEN_AND_THEN_DEPS_IN_CALL,
      );
    });

    addProxyHook(
      VALUES + LISTENER,
      VALUES + LISTENER,
      VOID,
      getTheContentOfTheStoreDoc(2, 8) + ' changes',
      getListenerHookParams(valuesListenerType),
      getListenerHookParamsInCall(),
    );

    addProxyHook(
      VALUE_IDS + LISTENER,
      VALUE_IDS + LISTENER,
      VOID,
      getListenerDoc(10, 0, 1),
      getListenerHookParams(valueIdsListenerType),
      getListenerHookParamsInCall(),
    );

    addProxyHook(
      VALUE + LISTENER,
      VALUE + LISTENER,
      VOID,
      getListenerDoc(11, 0),
      getListenerHookParams(
        valueListenerType,
        `valueId: ${valueIdType} | null`,
      ),
      getListenerHookParamsInCall('valueId'),
    );
  }

  addComponent(
    PROVIDER,
    `{${storeInstance}, ${storeInstance}ById, children}: ` +
      providerPropsType +
      ' & {children: React.ReactNode}',
    [
      '{',
      USE_CONTEXT,
      'return (',
      '<Context.' + PROVIDER,
      'value={useMemo(',
      `() => [${storeInstance} ?? contextValue[0], ` +
        `{...contextValue[1], ...${storeInstance}ById}],`,
      `[${storeInstance}, ${storeInstance}ById, contextValue],`,
      ')}>',
      '{children}',
      `</Context.${PROVIDER}>`,
      ');',
      '}',
    ],
    'Wraps part of an application in a context that provides default objects ' +
      'to be used by hooks and components within',
  );

  // --

  return [
    build(...getImports(0), ...getTypes(), ...getFunctions(0)),
    build(...getImports(1), ...getConstants(), ...getFunctions(1)),
  ];
};
