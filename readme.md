<section id="hero"><h2 id="a-javascript-library-for-structured-state">A JavaScript library for <em>structured state</em>.</h2><p>Using plain old JavaScript objects to manage data gets old very quickly. It&#x27;s error-prone, tricky to track changes efficiently, and easy to mistakenly incur performance costs.</p><p><em>TinyBase is a smarter way to structure your application state:</em></p><ul><li>Familiar concepts of <a href="#set-and-get-tables-rows-and-cells">tables, rows, and cells</a>, and <a href="#apply-schemas-to-tables">schematization</a> to model your data domain.</li><li><a href="#register-listeners-at-any-granularity">Flexibly reactive</a> to reconciled updates, so you only spend cycles on the data that changes.</li><li><a href="#create-indexes-for-fast-lookups">Indexing</a>, <a href="#define-metrics-and-aggregations">metrics</a>, <a href="#configure-relationships-between-tables">relationships</a> - and even an <a href="#use-checkpoints-for-an-easy-undo-stack">undo stack</a> for your app state! - out of the box.</li><li>Easily <a href="#persist-data-to-browser-file-or-server">sync your data</a> to local or remote storage, and use <a href="#call-react-hooks-to-bind-to-data">idiomatic bindings</a> to your React UI.</li></ul><p><em>Tiny by name, tiny by nature</em>, TinyBase only costs <a href="#did-we-say-tiny">2.9kB - 5.9kB</a> when compressed, and has zero dependencies. And of course it&#x27;s <a href="#well-tested-and-documented">well tested</a>, <a href="https://tinybase.org/guides/the-basics/getting-started">fully documented</a>, and <a href="https://github.com/tinyplex/tinybase">open source</a>. Other <a href="https://tinybase.org/guides/faq/">FAQs</a>?</p></section><hr><p><a id="start" href="https://tinybase.org/guides/the-basics/getting-started">Get started</a></p><p><a href="https://tinybase.org/demos">Try the demos</a></p><p><a href="https://tinybase.org/api/store/interfaces/store/store/">Read the docs</a></p><hr><section><h2 id="set-and-get-tables-rows-and-cells">Set and get tables, rows, and cells.</h2><p>Creating a <a href="https://tinybase.org/api/store/interfaces/store/store"><code>Store</code></a> requires just a simple call to the <a href="https://tinybase.org/api/store/functions/creation/createstore"><code>createStore</code></a> function. Once you have one, you can easily set <a href="https://tinybase.org/api/store/type-aliases/store/table"><code>Table</code></a>, <a href="https://tinybase.org/api/store/type-aliases/store/row"><code>Row</code></a>, or <a href="https://tinybase.org/api/store/type-aliases/store/cell"><code>Cell</code></a> values by their <a href="https://tinybase.org/api/common/type-aliases/identity/id"><code>Id</code></a>. And of course you can easily get the values back out again.</p><p>Read more about setting and changing data in <a href="https://tinybase.org/guides/the-basics">The Basics</a> guide.</p></section>

```js
const store = createStore()
  .setTable('pets', {fido: {species: 'dog'}})
  .setCell('pets', 'fido', 'color', 'brown');

console.log(store.getRow('pets', 'fido'));
// -> {species: 'dog', color: 'brown'}
```

<section><h2 id="register-listeners-at-any-granularity">Register listeners at any granularity.</h2><p>The magic starts to happen when you register listeners on a <a href="https://tinybase.org/api/store/interfaces/store/store"><code>Store</code></a>, <a href="https://tinybase.org/api/store/type-aliases/store/table"><code>Table</code></a>, <a href="https://tinybase.org/api/store/type-aliases/store/row"><code>Row</code></a>, or <a href="https://tinybase.org/api/store/type-aliases/store/cell"><code>Cell</code></a>. They get called when any part of that object changes. You can also use wildcards - useful when you don&#x27;t know the <a href="https://tinybase.org/api/common/type-aliases/identity/id"><code>Id</code></a> of the objects that might change.</p><p>Read more about listeners in the <a href="https://tinybase.org/guides/the-basics/listening-to-stores">Listening To Stores</a> guide.</p></section>

```js
const listenerId = store.addTableListener('pets', () =>
  console.log('changed'),
);

store.setCell('pets', 'fido', 'sold', false);
// -> 'changed'

store.delListener(listenerId);
```

<section><h2 id="call-react-hooks-to-bind-to-data">Call React hooks to bind to data.</h2><p>If you&#x27;re using React in your application, the optional <a href="https://tinybase.org/api/ui-react"><code>ui-react</code></a> module provides hooks to bind to the data in a <a href="https://tinybase.org/api/store/interfaces/store/store"><code>Store</code></a>.</p><p>More magic! The <a href="https://tinybase.org/api/ui-react/functions/store-hooks/usecell"><code>useCell</code></a> hook in this example fetches the dog&#x27;s color. But it also registers a listener on that cell that will fire and re-render the component whenever the value changes.</p><p>Basically you simply describe what data you want in your user interface and TinyBase will take care of the whole lifecycle of updating it for you.</p><p>Read more about the using hooks in the <a href="https://tinybase.org/guides/building-uis/using-react-hooks">Using React Hooks</a> guide.</p></section>

```jsx
const App1 = () => {
  const color = useCell('pets', 'fido', 'color', store);
  return <>Color: {color}</>;
};

const app = document.createElement('div');
ReactDOM.render(<App1 />, app);
console.log(app.innerHTML);
// -> 'Color: brown'

store.setCell('pets', 'fido', 'color', 'walnut');
console.log(app.innerHTML);
// -> 'Color: walnut'
```

<section><h2 id="use-components-to-make-reactive-apps">Use components to make reactive apps.</h2><p>The react module provides simple React components with bindings that make it easy to create a fully reactive user interface based on a <a href="https://tinybase.org/api/store/interfaces/store/store"><code>Store</code></a>.</p><p>In this example, the library&#x27;s <a href="https://tinybase.org/api/ui-react/functions/store-components/rowview"><code>RowView</code></a> component just needs a reference to the <a href="https://tinybase.org/api/store/interfaces/store/store"><code>Store</code></a>, the <code>tableId</code>, and the <code>rowId</code> in order to render the contents of that row. An optional <code>cellComponent</code> prop lets you override how you want each <a href="https://tinybase.org/api/store/type-aliases/store/cell"><code>Cell</code></a> rendered. Again, all the listeners and updates are taken care of for you.</p><p>The module also includes a context Provider that sets up default for an entire app to use, reducing the need to drill all your props down into your app&#x27;s hierarchy.</p><p>Most of the demos showcase the use of these React hooks and components. Take a look at <a href="https://tinybase.org/demos/todo-app/todo-app-v1-the-basics">Todo App v1 (the basics)</a> to see these user interface binding patterns in action.</p><p>Read more about the <a href="https://tinybase.org/api/ui-react"><code>ui-react</code></a> module in the <a href="https://tinybase.org/guides/building-uis">Building UIs</a> guides.</p></section>

```jsx
const MyCellView = (props) => (
  <>
    {props.cellId}: <CellView {...props} />
    <hr />
  </>
);

const App2 = () => (
  <RowView
    store={store}
    tableId="pets"
    rowId="fido"
    cellComponent={MyCellView}
  />
);

ReactDOM.render(<App2 />, app);
console.log(app.innerHTML);
// -> 'species: dog<hr>color: walnut<hr>sold: false<hr>'

store.setCell('pets', 'fido', 'sold', true);
console.log(app.innerHTML);
// -> 'species: dog<hr>color: walnut<hr>sold: true<hr>'

ReactDOM.unmountComponentAtNode(app);
```

<section><h2 id="apply-schemas-to-tables">Apply schemas to tables.</h2><p>By default, a <a href="https://tinybase.org/api/store/type-aliases/store/row"><code>Row</code></a> can contain any arbitrary <a href="https://tinybase.org/api/store/type-aliases/store/cell"><code>Cell</code></a>. But you can add a schema to a <a href="https://tinybase.org/api/store/interfaces/store/store"><code>Store</code></a> to ensure that the values are always what you expect. For example, you can limit their types, and provide defaults. You can also create mutating listeners that can programmatically enforce a schema.</p><p>In this example, we set a second <a href="https://tinybase.org/api/store/type-aliases/store/row"><code>Row</code></a> without the <code>sold</code> <a href="https://tinybase.org/api/store/type-aliases/store/cell"><code>Cell</code></a> in it. The schema ensures it&#x27;s present with default of <code>false</code>.</p><p>Read more about schemas in the <a href="https://tinybase.org/guides/schemas-and-persistence/using-schemas">Using Schemas</a> guide.</p></section>

```js
store.setSchema({
  pets: {
    species: {type: 'string'},
    color: {type: 'string'},
    sold: {type: 'boolean', default: false},
  },
});

store.setRow('pets', 'felix', {species: 'cat'});
console.log(store.getRow('pets', 'felix'));
// -> {species: 'cat', sold: false}

store.delSchema();
```

<section><h2 id="persist-data-to-browser-file-or-server">Persist data to browser, file, or server.</h2><p>You can easily persist a <a href="https://tinybase.org/api/store/interfaces/store/store"><code>Store</code></a> between browser page reloads or sessions. You can also synchronize it with a web endpoint, or (if you&#x27;re using TinyBase in an appropriate environment), load and save it to a file.</p><p>Read more about persisters in the <a href="https://tinybase.org/guides/schemas-and-persistence/persisting-data">Persisting Data</a> guide.</p></section>

```js
const persister = createSessionPersister(store, 'demo');
await persister.save();

console.log(sessionStorage.getItem('demo'));
// -> '{"pets":{"fido":{"species":"dog","color":"walnut","sold":true},"felix":{"species":"cat","sold":false}}}'

persister.destroy();
sessionStorage.clear();
```

<section><h2 id="define-metrics-and-aggregations">Define metrics and aggregations.</h2><p>A <a href="https://tinybase.org/api/metrics/interfaces/metrics/metrics"><code>Metrics</code></a> object makes it easy to keep a running aggregation of <a href="https://tinybase.org/api/store/type-aliases/store/cell"><code>Cell</code></a> values in each <a href="https://tinybase.org/api/store/type-aliases/store/row"><code>Row</code></a> of a <a href="https://tinybase.org/api/store/type-aliases/store/table"><code>Table</code></a>. This is useful for counting rows, but also supports averages, ranges of values, or arbitrary aggregations.</p><p>In this example, we create a new table of the pet species, and keep a track of which is most expensive. When we add horses to our pet store, the listener detects that the highest price has changed.</p><p>Read more about <a href="https://tinybase.org/api/metrics/interfaces/metrics/metrics"><code>Metrics</code></a> in the <a href="https://tinybase.org/guides/metrics-and-indexes/using-metrics">Using Metrics</a> guide.</p></section>

```js
store.setTable('species', {
  dog: {price: 5},
  cat: {price: 4},
  worm: {price: 1},
});

const metrics = createMetrics(store);
metrics.setMetricDefinition(
  'highestPrice', // metricId
  'species', //      tableId to aggregate
  'max', //          aggregation
  'price', //        cellId to aggregate
);

console.log(metrics.getMetric('highestPrice'));
// -> 5

metrics.addMetricListener('highestPrice', () =>
  console.log(metrics.getMetric('highestPrice')),
);
store.setCell('species', 'horse', 'price', 20);
// -> 20

metrics.destroy();
```

<section><h2 id="create-indexes-for-fast-lookups">Create indexes for fast lookups.</h2><p>An <a href="https://tinybase.org/api/indexes/interfaces/indexes/indexes"><code>Indexes</code></a> object makes it easy to look up all the <a href="https://tinybase.org/api/store/type-aliases/store/row"><code>Row</code></a> objects that have a certain value in a <a href="https://tinybase.org/api/store/type-aliases/store/cell"><code>Cell</code></a>.</p><p>In this example, we create an index on the <code>species</code> <a href="https://tinybase.org/api/store/type-aliases/store/cell"><code>Cell</code></a> values. We can then get the the list of distinct <a href="https://tinybase.org/api/store/type-aliases/store/cell"><code>Cell</code></a> value present for that index (known as &#x27;slices&#x27;), and the set of <a href="https://tinybase.org/api/store/type-aliases/store/row"><code>Row</code></a> objects that match each value.</p><p><a href="https://tinybase.org/api/indexes/interfaces/indexes/indexes"><code>Indexes</code></a> objects are reactive too. So you can set listeners on them just as you do for the data in the underlying <a href="https://tinybase.org/api/store/interfaces/store/store"><code>Store</code></a>.</p><p>Read more about <a href="https://tinybase.org/api/indexes/interfaces/indexes/indexes"><code>Indexes</code></a> in the <a href="https://tinybase.org/guides/metrics-and-indexes/using-indexes">Using Indexes</a> guide.</p></section>

```js
const indexes = createIndexes(store);
indexes.setIndexDefinition(
  'bySpecies', // indexId
  'pets', //      tableId to index
  'species', //   cellId to index
);

console.log(indexes.getSliceIds('bySpecies'));
// -> ['dog', 'cat']
console.log(indexes.getSliceRowIds('bySpecies', 'dog'));
// -> ['fido']

indexes.addSliceIdsListener('bySpecies', () =>
  console.log(indexes.getSliceIds('bySpecies')),
);
store.setRow('pets', 'lowly', {species: 'worm'});
// -> ['dog', 'cat', 'worm']

indexes.destroy();
```

<section><h2 id="model-relationships-between-tables">Model relationships between tables.</h2><p>A <a href="https://tinybase.org/api/relationships/interfaces/relationships/relationships"><code>Relationships</code></a> object lets you associate a <a href="https://tinybase.org/api/store/type-aliases/store/row"><code>Row</code></a> in a local <a href="https://tinybase.org/api/store/type-aliases/store/table"><code>Table</code></a> with the <a href="https://tinybase.org/api/common/type-aliases/identity/id"><code>Id</code></a> of a <a href="https://tinybase.org/api/store/type-aliases/store/row"><code>Row</code></a> in a remote <a href="https://tinybase.org/api/store/type-aliases/store/table"><code>Table</code></a>. You can also reference a table to itself to create linked lists.</p><p>In this example, the <code>species</code> <a href="https://tinybase.org/api/store/type-aliases/store/cell"><code>Cell</code></a> of the <code>pets</code> <a href="https://tinybase.org/api/store/type-aliases/store/table"><code>Table</code></a> is used to create a relationship to the <code>species</code> <a href="https://tinybase.org/api/store/type-aliases/store/table"><code>Table</code></a>, so that we can access the price of a given pet.</p><p>Like everything else, you can set listeners on <a href="https://tinybase.org/api/relationships/interfaces/relationships/relationships"><code>Relationships</code></a> too.</p><p>Read more about <a href="https://tinybase.org/api/relationships/interfaces/relationships/relationships"><code>Relationships</code></a> in the <a href="https://tinybase.org/guides/relationships-and-checkpoints/using-relationships">Using Relationships</a> guide.</p></section>

```js
const relationships = createRelationships(store);
relationships.setRelationshipDefinition(
  'petSpecies', // relationshipId
  'pets', //       local tableId to link from
  'species', //    remote tableId to link to
  'species', //    cellId containing remote key
);

console.log(
  store.getCell(
    relationships.getRemoteTableId('petSpecies'),
    relationships.getRemoteRowId('petSpecies', 'fido'),
    'price',
  ),
);
// -> 5

relationships.destroy();
```

<section><h2 id="set-checkpoints-for-an-undo-stack">Set checkpoints for an undo stack.</h2><p>A <a href="https://tinybase.org/api/checkpoints/interfaces/checkpoints/checkpoints"><code>Checkpoints</code></a> object lets you set checkpoints on a <a href="https://tinybase.org/api/store/interfaces/store/store"><code>Store</code></a>. Move forward and backward through them to create undo and redo functions.</p><p>In this example, we set a checkpoint, then sell one of the pets. Later, the pet is brought back to the shop, and we go back to that checkpoint to revert the store to its previous state.</p><p>Read more about <a href="https://tinybase.org/api/checkpoints/interfaces/checkpoints/checkpoints"><code>Checkpoints</code></a> in the <a href="https://tinybase.org/guides/relationships-and-checkpoints/using-checkpoints">Using Checkpoints</a> guide.</p></section>

```js
const checkpoints = createCheckpoints(store);
checkpoints.addCheckpoint('pre-sale');

store.setCell('pets', 'felix', 'sold', true);
console.log(store.getCell('pets', 'felix', 'sold'));
// -> true

checkpoints.goBackward();
console.log(store.getCell('pets', 'felix', 'sold'));
// -> false
```

<section><h2 id="did-we-say-tiny">Did we say tiny?</h2><p>If you use the basic <a href="https://tinybase.org/api/store"><code>store</code></a> module alone, you&#x27;ll only add a gzipped <em>2.9kB</em> to your app. You can incrementally add the other modules as you need more functionality, or get it all for <em>5.9kB</em>. The <code>ui-react</code> adaptor is just another <em>2.6kB</em>, and everything is fast.</p><p>Life&#x27;s easy when you have zero dependencies.</p><p>Read more about how TinyBase is structured in the <a href="https://tinybase.org/guides/how-tinybase-is-built/architecture">Architecture</a> guide.</p></section><div class="table"><table class="fixed"><tbody><tr><th width="30%"> </th><th>.js.gz</th><th>.js</th><th>debug.js</th><th>.d.ts</th></tr><tr><th class="right"><a href="https://tinybase.org/api/store">store</a></th><td>2.9kB</td><td>6.5kB</td><td>27.4kB</td><td>102.0kB</td></tr><tr><th class="right"><a href="https://tinybase.org/api/indexes">indexes</a></th><td>1.6kB</td><td>3.2kB</td><td>14.1kB</td><td>32.9kB</td></tr><tr><th class="right"><a href="https://tinybase.org/api/metrics">metrics</a></th><td>1.5kB</td><td>3.1kB</td><td>12.6kB</td><td>29.1kB</td></tr><tr><th class="right"><a href="https://tinybase.org/api/relationships">relationships</a></th><td>1.6kB</td><td>3.2kB</td><td>14.8kB</td><td>42.1kB</td></tr><tr><th class="right"><a href="https://tinybase.org/api/checkpoints">checkpoints</a></th><td>1.3kB</td><td>2.5kB</td><td>10.4kB</td><td>33.0kB</td></tr><tr><th class="right"><a href="https://tinybase.org/api/persisters">persisters</a></th><td>0.8kB</td><td>1.6kB</td><td>4.9kB</td><td>26.7kB</td></tr><tr><th class="right"><a href="https://tinybase.org/api/common">common</a></th><td>0.1kB</td><td>0.1kB</td><td>0.1kB</td><td>3.5kB</td></tr><tr><th class="right"><a href="https://tinybase.org/api/tinybase">tinybase</a></th><td>5.9kB</td><td>14.0kB</td><td>59.1kB</td><td>0.3kB</td></tr></tbody></table></div><section><h2 id="well-tested-and-documented">Well tested and documented.</h2><p>TinyBase has <em>100.0%</em> test coverage, including the code throughout the documentation - even on this page! The guides, demos, and API examples are designed to make it as easy as possible to get up and running.</p><p>Read more about how TinyBase is tested in the Unit <a href="https://tinybase.org/guides/how-tinybase-is-built/testing">Testing</a> guide.</p></section><div class="table"><table class="fixed"><tbody><tr><th width="30%"> </th><th>Total</th><th>Tested</th><th>Coverage</th></tr><tr><th class="right">Lines</th><td>985</td><td>985</td><td>100.0%</td></tr><tr><th class="right">Statements</th><td>1,074</td><td>1,074</td><td>100.0%</td></tr><tr><th class="right">Functions</th><td>411</td><td>411</td><td>100.0%</td></tr><tr><th class="right">Branches</th><td>359</td><td>359</td><td>100.0%</td></tr><tr><th class="right">Tests</th><td colspan="3">1,776</td></tr><tr><th class="right">Assertions</th><td colspan="3">8,848</td></tr></tbody></table></div><hr><p><a id="start" href="https://tinybase.org/guides/the-basics/getting-started">Get started</a></p><p><a href="https://tinybase.org/demos">Try the demos</a></p><p><a href="https://tinybase.org/api/store/interfaces/store/store/">Read the docs</a></p><hr><section><h2 id="follow">Follow</h2><ul><li>News and updates on <a href="https://twitter.com/tinybasejs">Twitter</a> and <a href="https://facebook.com/tinybasejs">Facebook</a>.</li><li><a href="https://github.com/tinyplex/tinybase/issues">Issues</a> and <a href="https://github.com/tinyplex/tinybase/releases">release notes</a> on <a href="https://github.com/tinyplex/tinybase">GitHub</a></li><li>Packages on <a href="https://www.npmjs.com/package/tinybase/v/1.2.0-beta.1">NPM</a>.</li></ul></section><section><h2 id="about">About</h2><p>Building TinyBase was an interesting exercise in API design, minification, and documentation. It&#x27;s not <a href="https://www.linkedin.com/in/jamespearce">my day job</a>, but I do intend to maintain it, so please provide feedback. I could not have done this without these great <a href="https://tinybase.org/guides/how-tinybase-is-built/credits/#giants">projects</a> and <a href="https://tinybase.org/guides/how-tinybase-is-built/credits/#and-friends">friends</a>, and I hope you enjoy using it!</p></section>