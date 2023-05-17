var e,t;e=this,t=function(e){"use strict";const t=e=>typeof e,l="",a=t(l),n=t(!0),o=t(0),d="type",r="default",s="Listener",I="get",c="add",$="Ids",i="Table",u=i+"s",p=i+$,b="Row",C=b+$,h="Sorted"+b+$,m="Cell",f=m+$,g="Value",w=g+"s",y=g+$,T=(e,t)=>e.every(t),v=(e,t)=>e.sort(t),V=(e,t)=>e.forEach(t),x=(e,t)=>e.map(t),R=e=>e.length,k=e=>0==R(e),S=(e,t)=>e.filter(t),P=(e,...t)=>e.push(...t),A=e=>e.pop(),E=(e,...t)=>e.unshift(...t),D=e=>e.shift(),O=JSON.parse,N=isFinite,j=(e,t)=>e instanceof t,L=e=>null==e,M=e=>e==a||e==n,G=e=>t(e)==a,J=e=>Array.isArray(e),z=e=>{const l=t(e);return M(l)||l==o&&N(e)?l:void 0},W=Object,B=W.keys,F=W.freeze,U=e=>j(e,W)&&e.constructor==W,_=(e,t)=>x(W.entries(e),(([e,l])=>t(l,e))),Z=e=>U(e)&&k(B(e)),H=(e,t)=>e?.has(t)??!1,Q=e=>[...e?.values()??[]],q=(e,t)=>e?.forEach(t),K=(e,t)=>e?.delete(t),X=e=>new Map(e),Y=(e,t)=>e?.get(t),ee=(e,t)=>q(e,((e,l)=>t(l,e))),te=(e,t)=>x([...e?.entries()??[]],(([e,l])=>t(l,e))),le=(e,t,l)=>L(l)?(K(e,t),e):e?.set(t,l),ae=(e,t,l)=>(H(e,t)||le(e,t,l()),Y(e,t)),ne=e=>e.toUpperCase(),oe=e=>e.toLowerCase(),de="a ",re="A function for",se=", and registers a listener so that any changes to that result will cause a re-render",Ie="Callback",ce="Del",$e="Deps",ie=$e+"?: React.DependencyList",ue="doRollback?: DoRollback",pe="actions: () => Return, "+ue,be="export",Ce="Id",he="Invalid",me="Json",fe=oe(s),ge="?: ",we=" | undefined",ye="NonNullable",Te="Partial",ve="Props",Ve="Provider",xe=`Registers a ${fe} that will be called`,Re="Represents",ke="rowId: "+Ce,Se="Schema",Pe="Set",Ae=", descending?: boolean, offset?: number, limit?: number",Ee="[]",De="the Store",Oe="Transaction",Ne=oe(Oe),je="Execute a "+Ne+" to make multiple mutations",Le="Explicitly starts a "+Ne,Me="Explicitly finishes a "+Ne,Ge="the end of the "+Ne,Je="void",ze=" => "+Je,We="WhenSet",Be=" when setting it",Fe=de+"string serialization of",Ue=" ",_e="Gets a callback that can ",Ze="the ",He=" the schema for",Qe=(e=0,t=0)=>`the ${ut[e]}content of`+(t?Ue+De:l),qe=(e=0,t,a=0)=>ct[t]+Ue+Qe(e,1)+(a?" when setting it":l),Ke=(e,t=0)=>Re+` a Row when ${t?"s":"g"}etting ${Qe()} the '${e}' `+i,Xe=(e,t,l=0)=>`Gets ${l?"sorted, paginated":"the"} Ids of the ${e}s in `+t,Ye=(e,t)=>`Calls a function for each ${e} in `+t,et=e=>"The props passed to a component that renders "+e,tt=e=>"A function that takes "+e,lt=(e,t=0)=>re+" listening to changes to "+it[e]+" in "+it[t],at=(e,t,a=0)=>xe+" whenever "+it[e]+" in "+it[t]+" change"+(a?l:"s"),nt=e=>`the '${e}' `+i,ot=e=>"the specified Row in "+nt(e),dt=(e,t=0)=>ct[t]+` ${Qe()} `+nt(e),rt=(e,t=0)=>ct[t]+` ${Qe()} `+ot(e),st=(e,t,l=0)=>ct[l]+` the '${t}' Cell for `+ot(e),It=(e,t=0)=>ct[t]+` the '${e}' Value`,ct=["Gets","Checks existence of","Sets","Deletes","Sets part of",Re,"Gets "+Fe,"Sets "+Fe,xe+" whenever",_e+"set",_e+"add",_e+"set part of",_e+"delete","Renders","Gets "+Fe+He,"Sets"+He,"Deletes"+He],$t=[I,"has","set","del","set","forEach",c,l],it=[De,u,Ze+i+Ue+$,de+i,Ze+b+Ue+$,de+b,Ze+m+Ue+$,de+m,"invalid Cell changes",w,Ze+g+Ue+$,de+g,"invalid Value changes",Ze+"sorted "+b+Ue+$,Ze+m+Ue+$+" anywhere"],ut=[l,"tabular ","keyed value "],pt=e=>new Set(J(e)||L(e)?e:[e]),bt=(e,t)=>e?.add(t),Ct=/[^A-Za-z]+/,ht=/[^A-Za-z0-9]+/,mt=/^( *)\/\*\* *(.*?) *\*\/$/gm,ft=(e,t,l)=>e.substring(t,l),gt=e=>e.includes(","),wt=(e,t,l,a=1)=>{const n=`${t}${1==a?"":a}`;return H(e,n)?wt(e,t,l,a+1):(le(e,n,l),n)},yt=e=>e.replace(mt,((e,t,l)=>{const a=77-Tt(t);return`${t}/**\n${l.replace(RegExp(`([^\\n]{1,${a}})(\\s|$)`,"g"),t+" * $1\n")}${t} */`})),Tt=e=>e.length,vt=(e,t=l)=>e.join(t),Vt=e=>e.flat(1e3),xt=(e,t=0)=>vt(x(e.split(ht),((e,l)=>(l>0||t?ne:oe)(ft(e,0,1))+ft(e,1)))),Rt=e=>ne(vt((e&&!Ct.test(e[0])?e:" "+e).split(ht),"_")),kt=e=>`/** ${e}. */`,St=(...e)=>vt(S(e,(e=>e)),", "),Pt=(...e)=>"{"+vt(e,"; ")+"}",At=(...e)=>Pt(...x(e,(e=>"readonly "+e))),Et=()=>{const e=[X(),X(),X(),X()],t=X(),a=X(),n=e=>{const t=e.indexOf(" as ");return-1!=t?e.substring(t+4):e};return[(...e)=>vt(Vt(e),"\n"),(t,l,...a)=>V(a,(a=>V([0,1],(n=>(t??n)==n?bt(ae(e[n],l,pt),a):0)))),(e,a,n,o=l,d=1)=>wt(t,e,[a,n,o,d]),(e,t,l)=>wt(a,e,J(l)?[`(${t}) => {`,l,"}"]:[`(${t}) => ${l}`]),(e,t)=>Y(a,e)===t?e:wt(a,e,t),(t=0)=>x([...v(te(e[t],((e,t)=>`import {${vt(v(Q(e),((e,t)=>n(e)>n(t)?1:-1)),", ")}} from '${t}';`)),((e,t)=>gt(e)!=gt(t)?gt(e)?-1:1:e>t?1:-1)),l],(e=>e.replace("{React}","React"))),()=>te(t,(([e,t,a,n],o)=>[kt(t),`${n?be+" ":l}type ${o}${a} = ${e};`,l])),()=>te(a,((e,t)=>(e=J(e)?e:[e],P(e,A(e)+";"),[`const ${t} = ${D(e)}`,e,l])))]},Dt=e=>{const t=new WeakMap;return l=>(t.has(l)||t.set(l,e(l)),t.get(l))},Ot=(e,t,l)=>[t=>_(e,((e,a)=>t(a,xt(a,1),l(Rt(a),`'${a}'`)))),(t,a)=>_(e[t],((e,t)=>a(t,e[d],e[r],l(Rt(t),`'${t}'`),xt(t,1)))),e=>_(t,((t,a)=>e(a,t[d],t[r],l(Rt(a),`'${a}'`),xt(a,1))))],Nt=(e,t,a,n)=>[(n,o)=>{const d=n+": "+o,r=e(u,Pt(...t((e=>`'${e}'?: {[rowId: Id]: `+Pt(...a(e,((e,t,a)=>`'${e}'${L(a)?"?":l}: ${t}`)))+"}"))),qe(1,5)),I=e(u+We,Pt(...t((e=>`'${e}'?: {[rowId: Id]: `+Pt(...a(e,((e,t)=>`'${e}'?: ${t}`)))+"}"))),qe(1,5,1)),c=e(i+Ce,"keyof "+r,"A "+i+" Id in "+De),$=`<TId extends ${c}>`,g=e(i,ye+`<${r}[TId]>`,"A "+i+" in "+De,$),w=e(i+We,ye+`<${I}[TId]>`,"A "+i+" in "+De+Be,$),y=e(b,g+"<TId>[Id]","A "+b+" in a "+i,$),T=e(b+We,w+"<TId>[Id]","A "+b+" in a "+i+Be,$),v=e(m+Ce,`Extract<keyof ${y}<TId>, Id>`,"A "+m+" Id in a "+b,$),V=e(m,ye+`<${r}[TId]>[Id][CId]`,"A "+m+" in a "+b,`<TId extends ${c}, CId extends ${v}<TId>>`),x=e("CellIdCellArray",`CId extends ${v}<TId> ? [cellId: CId, cell: ${V}<TId, CId>] : never`,m+" Ids and types in a "+b,`<TId extends ${c}, CId = ${v}<TId>>`,0),R=e(m+Ie,`(...[cellId, cell]: ${x}<TId>)`+ze,tt(de+m+" Id, and "+m),$),k=e(b+Ie,"(rowId: Id, forEachCell: (cellCallback: CellCallback<TId>) "+ze+") "+ze,tt(de+b+" Id, and a "+m+" iterator"),$),S=e(i+m+Ie,`(cellId: ${v}<TId>, count: number) `+ze,tt(de+m+" Id, and count of how many times it appears"),$),P=e("TableIdForEachRowArray",`TId extends ${c} ? [tableId: TId, forEachRow: (rowCallback: ${k}<TId>)${ze}] : never`,i+" Ids and callback types",`<TId = ${c}>`,0),A=e(i+Ie,`(...[tableId, forEachRow]: ${P})`+ze,tt(de+i+" Id, and a "+b+" iterator"),l),E=e("TableIdRowIdCellIdArray",`TId extends ${c} ? [tableId: TId, rowId: Id, cellId: ${v}<TId>] : never`,"Ids for GetCellChange",`<TId = ${c}>`,0),D=e("GetCellChange",`(...[tableId, rowId, cellId]: ${E}) => CellChange`,re+" returning information about any Cell's changes during a "+Ne),O=e(u+s,`(${d}, getCellChange: ${D}${we})`+ze,lt(1)),N=e(p+s,`(${d})`+ze,lt(2)),j=e(i+s,`(${d}, tableId: ${c}, getCellChange: ${D}${we})`+ze,lt(3)),M=e(i+f+s,`(${d}, tableId: ${c})`+ze,lt(14,3)),G=e(C+s,`(${d}, tableId: ${c})`+ze,lt(4,3)),J=e(h+s,"("+St(d,"tableId: "+c,"cellId: Id"+we,"descending: boolean","offset: number","limit: number"+we,"sortedRowIds: Ids")+")"+ze,lt(13,3)),z=e(b+s,"("+St(""+d,"tableId: "+c,ke,`getCellChange: ${D}${we}`)+")"+ze,lt(5,3)),W=e(f+s,"("+St(""+d,"tableId: "+c,ke)+")"+ze,lt(6,5)),B=e("CellListenerArgsArrayInner",`CId extends ${v}<TId> ? [${d}, tableId: TId, ${ke}, cellId: CId, newCell: ${V}<TId, CId> ${we}, oldCell: ${V}<TId, CId> ${we}, getCellChange: ${D} ${we}] : never`,"Cell args for CellListener",`<TId extends ${c}, CId = ${v}<TId>>`,0),F=e("CellListenerArgsArrayOuter",`TId extends ${c} ? `+B+"<TId> : never","Table args for CellListener",`<TId = ${c}>`,0);return[r,I,c,g,w,y,T,v,V,R,k,S,A,O,N,j,M,G,J,z,W,e(m+s,`(...[${n}, tableId, rowId, cellId, newCell, oldCell, getCellChange]: ${F})`+ze,lt(7,5)),e(he+m+s,`(${d}, tableId: Id, ${ke}, cellId: Id, invalidCells: any[])`+ze,lt(8))]},(t,a)=>{const o=t+": "+a,d=e(w,Pt(...n(((e,t,a)=>`'${e}'${L(a)?"?":l}: ${t}`))),qe(2,5)),r=e(w+We,Pt(...n(((e,t)=>`'${e}'?: ${t}`))),qe(2,5,1)),I=e(g+Ce,"keyof "+d,"A "+g+" Id in "+De),c=e(g,ye+`<${d}[VId]>`,"A "+g+" Id in "+De,`<VId extends ${I}>`),$=e("ValueIdValueArray",`VId extends ${I} ? [valueId: VId, value: ${c}<VId>] : never`,g+" Ids and types in "+De,`<VId = ${I}>`,0),i=e(g+Ie,`(...[valueId, value]: ${$})`+ze,tt(de+g+" Id, and "+g)),u=e("GetValueChange",`(valueId: ${I}) => ValueChange`,re+" returning information about any Value's changes during a "+Ne),p=e(w+s,`(${o}, getValueChange: ${u}${we})`+ze,lt(9)),b=e(y+s,`(${o})`+ze,lt(10)),C=e("ValueListenerArgsArray",`VId extends ${I} ? [${o}, valueId: VId, newValue: ${c}<VId> ${we}, oldValue: ${c}<VId> ${we}, getValueChange: ${u} ${we}] : never`,"Value args for ValueListener",`<VId = ${I}>`,0);return[d,r,I,c,i,p,b,e(g+s,`(...[${t}, valueId, newValue, oldValue, getValueChange]: `+C+")"+ze,lt(11)),e(he+g+s,`(${o}, valueId: Id, invalidValues: any[])`+ze,lt(12))]},(t,l)=>e(Oe+s,`(${t}: ${l}, cellsTouched: boolean, valuesTouched: boolean)`+ze,re+" listening to the completion of a "+Ne)],jt=(e,t=l,a=l)=>`store.${e}(${t})`+(a?" as "+a:l),Lt=(e,t=l)=>`fluent(() => ${jt(e,t)})`,Mt=(e,t=l,a=l)=>`store.${e}(${t?t+", ":l}proxy(listener)${a?", "+a:l})`,Gt=(e,t,a)=>{const[o,I,T,v,x,R,k,S]=Et(),[A,D,O]=Ot(e,t,x),[N,j,M]=Nt(T,A,D,O),J=X(),z=(e=0)=>te(J,(([t,a,n,o,d],r)=>{const s=e?[r+`: ${d}(${t}): ${a} => ${n},`]:[r+d+`(${t}): ${a};`];return e||E(s,kt(o)),P(s,l),s})),W=(e,t,a,n,o,d=l)=>wt(J,e,[t,a,n,o,d]),B=(e,t,a,n,o,d=l,r=l,s=l)=>W($t[e]+t+(4==e?Te:l)+a,d,n,(n==_?Lt:jt)($t[e]+(4==e?Te:l)+a,r,e?void 0:n),o,s),F=(e,t,a,n=l,o=l,d=1,r=l)=>W(c+e+s,(n?n+", ":l)+fe+": "+t+(d?", mutator?: boolean":l),Ce,Mt(c+e+s,o,d?"mutator":l),a,r),U=`./${xt(a)}.d`,_=xt(a,1),H=xt(_),q=[],K=X();let ae=[],ne=[];if(I(1,U,_,`create${_} as create${_}Decl`),!Z(e)){I(0,"tinybase","CellChange"),I(null,"tinybase",$);const[e,t,a,o,s,c,g,w,y,v,R,k,S,E,O,j,M,J,z,W,Z,ee,te]=N(H,_),ne=X();A(((e,t)=>{const l=`<'${e}'>`,a=[T(t+i,o+l,Re+` the '${e}' `+i),T(t+i+We,s+l,Re+` the '${e}' `+i+Be),T(t+b,c+l,Ke(e)),T(t+b+We,g+l,Ke(e,1)),T(t+m+Ce,w+l,`A Cell Id for the '${e}' `+i),T(t+m+Ie,v+l,tt(`a Cell Id and value from a Row in the '${e}' `+i)),T(t+b+Ie,R+l,tt(`a Row Id from the '${e}' Table, and a Cell iterator`)),T(t+i+m+Ie,k+l,tt(`a Cell Id from anywhere in the '${e}' Table, and a count of how many times it appears`))];le(ne,e,a),I(1,U,...a)})),I(1,U,e,t,a,w,S,E,O,j,M,J,z,W,Z,ee,te),ae=[e,t,a,w,E,O,j,M,J,z,W,Z,ee,ne],V([[e],[n],[_,"tables: "+t,"tables"],[_]],(([e,t,a],n)=>B(n,l,u,e,qe(1,n),t,a))),B(0,l,p,a+Ee,Xe(i,De)),B(5,l,i,Je,Ye(i,De),"tableCallback: "+S,"tableCallback as any"),A(((e,t,a)=>{const[o,d,r,s,I,c,u,p]=Y(ne,e);V([[o],[n],[_,"table: "+d,", table"],[_]],(([n,o,d=l],r)=>B(r,t,i,n,dt(e,r),o,a+d))),B(0,t,i+f,$,Xe(m,"the whole of "+nt(e)),l,a),B(5,t,i+m,Je,Ye(i+m,"the whole of "+nt(e)),"tableCellCallback: "+p,a+", tableCellCallback as any"),B(0,t,C,$,Xe(b,nt(e)),l,a),B(0,t,h,$,Xe(b,nt(e),1),"cellId?: "+I+Ae,a+", cellId, descending, offset, limit"),B(5,t,b,Je,Ye(b,nt(e)),"rowCallback: "+u,a+", rowCallback as any"),V([[r],[n],[_,", row: "+s,", row"],[_],[_,", partialRow: "+s,", partialRow"]],(([n,o=l,d=l],r)=>B(r,t,b,n,rt(e,r),ke+o,a+", rowId"+d))),B(6,t,b,Ce+we,"Add a new Row to "+nt(e),"row: "+s+", reuseIds?: boolean",a+", row, reuseIds"),B(0,t,f,I+Ee,Xe(m,ot(e)),ke,a+", rowId"),B(5,t,m,Je,Ye(m,ot(e)),ke+", cellCallback: "+c,a+", rowId, cellCallback as any"),D(e,((o,d,r,s,I)=>{const c="Map"+xt(d,1);le(K,d,c);const $=d+(L(r)?we:l);V([[$],[n],[_,`, cell: ${d} | `+c,", cell as any"],[_]],(([n,d=l,r=l],c)=>B(c,t+I,m,n,st(e,o,c),ke+d,a+", rowId, "+s+r))),B(1,t+I,i+m,n,ct[1]+` the '${o}' Cell anywhere in `+nt(e),l,a+", "+s)}))})),B(0,l,u+me,me,qe(1,6)),B(2,l,u+me,_,qe(1,7),"tablesJson: "+me,"tables"+me),F(u,E,qe(1,8)+" changes"),F(p,O,at(2,0,1)),F(i,j,at(3,0),`tableId: ${a} | null`,"tableId"),F(i+f,M,at(14,3,1),`tableId: ${a} | null`,"tableId"),F(C,J,at(4,3,1),`tableId: ${a} | null`,"tableId"),F(h,z,at(13,3,1),St("tableId: TId",`cellId: ${w}<TId>`+we,"descending: boolean","offset: number","limit: number"+we),St("tableId","cellId","descending","offset","limit"),1,"<TId extends TableId>"),F(b,W,at(5,3),`tableId: ${a} | null, rowId: IdOrNull`,"tableId, rowId"),F(f,Z,at(6,5,1),`tableId: ${a} | null, rowId: IdOrNull`,"tableId, rowId"),F(m,ee,at(7,5),`tableId: ${a} | null, rowId: IdOrNull, cellId: ${vt(A((e=>Y(ne,e)?.[4]??l))," | ")} | null`,"tableId, rowId, cellId"),F(he+m,te,xe+" whenever an invalid Cell change was attempted","tableId: IdOrNull, rowId: IdOrNull, cellId: IdOrNull","tableId, rowId, cellId"),I(1,U,...Q(K)),P(q,".set"+u+Se+"({",Vt(A(((e,t,a)=>[`[${a}]: {`,...D(e,((e,t,a,n)=>`[${n}]: {[${x(Rt(d),`'${d}'`)}]: ${x(Rt(t),`'${t}'`)}${L(a)?l:`, [${x(Rt(r),`'${r}'`)}]: `+(G(a)?x(Rt(a),`'${a}'`):a)}},`)),"},"]))),"})")}if(!Z(t)){const[e,t,a,o,s,c,$,i,u]=j(H,_);I(1,U,e,t,a,s,c,$,i,u),ne=[e,t,a,c,$,i],V([[e],[n],[_,"values: "+t,"values"],[_],[_,"partialValues: "+t,"partialValues"]],(([e,t,a],n)=>B(n,l,w,e,qe(2,n),t,a))),B(0,l,y,a+Ee,Xe(g,De)),B(5,l,g,"void",Ye(g,De),"valueCallback: "+s,"valueCallback as any"),O(((e,t,a,o,d)=>{const r="Map"+xt(t,1);le(K,t,r),V([[t],[n],[_,`value: ${t} | `+r,", value as any"],[_]],(([t,a,n=l],r)=>B(r,d,g,t,It(e,r),a,o+n)))})),B(0,l,w+me,me,qe(2,6)),B(2,l,w+me,_,qe(2,7),"valuesJson: "+me,"values"+me),F(w,c,qe(2,8)+" changes"),F(y,$,at(10,0,1)),F(g,i,at(11,0),`valueId: ${a} | null`,"valueId"),F(he+g,u,xe+" whenever an invalid Value change was attempted","valueId: IdOrNull","valueId"),I(1,U,...Q(K)),I(0,"tinybase","ValueChange"),P(q,".set"+w+Se+"({",O(((e,t,a,n)=>[`[${n}]: {[${x(Rt(d),`'${d}'`)}]: ${x(Rt(t),`'${t}'`)}${L(a)?l:`, [${x(Rt(r),`'${r}'`)}]: `+(G(a)?x(Rt(a),`'${a}'`):a)}},`])),"})")}ee(K,((e,t)=>T(t,`(cell: ${e}${we}) => `+e,`Takes a ${e} Cell value and returns another`))),I(null,"tinybase","DoRollback",Ce,"IdOrNull",me,"Store"),B(0,l,me,me,qe(0,6)),B(2,l,me,_,qe(0,7),"tablesAndValuesJson: "+me,"tablesAndValuesJson"),B(7,l,Ne,"Return",je,pe,"actions, doRollback","<Return>"),B(7,l,"start"+Oe,_,Le),B(7,l,"finish"+Oe,_,Me,ue,"doRollback");const oe=M(H,_);return F("Start"+Oe,oe,xe+" just before the start of the "+Ne,l,l,0),F("WillFinish"+Oe,oe,xe+" just before "+Ge,l,l,0),F("DidFinish"+Oe,oe,xe+" just after "+Ge,l,l,0),B(7,l,"call"+s,_,"Manually provoke a listener to be called","listenerId: Id","listenerId"),B(3,l,s,_,"Remove a listener that was previously added to "+De,"listenerId: Id","listenerId"),W("getStore",l,"Store","store",ct[0]+" the underlying Store object"),I(1,"tinybase","createStore"),I(1,U,_,`create${_} as create${_}Decl`,oe),x("store",["createStore()",...q]),v("fluent","actions: () => Store",["actions();",`return ${H};`]),v("proxy","listener: any",`(_: Store, ...params: any[]) => listener(${H}, ...params)`),x(H,["{",...z(1),"}"]),[o(...R(0),...k(),be+" interface "+_+" {",...z(0),"}",l,kt(`Creates a ${_} object`),be+" function create"+_+"(): "+_+";"),o(...R(1),be+" const create"+_+": typeof create"+_+"Decl = () => {",...S(),`return Object.freeze(${H});`,"};"),ae,ne]},Jt=e=>I+e,zt=e=>St(Jt(e),Jt(e)+$e),Wt="debugIds?: boolean",Bt="debugIds={debugIds}",Ft="then"+ie,Ut="Parameter",_t=": (parameter: "+Ut+", store: Store) => ",Zt="const contextValue = useContext(Context);",Ht=", based on a parameter",Qt=": ",qt="<"+Ut+",>",Kt=Ut+"ized"+Ie+"<"+Ut+">",Xt="rowId",Yt="rowId={rowId}",el=", separator, debugIds",tl="separator?: ReactElement | string",ll="then?: (store: Store",al=St(ll+")"+ze,Ft),nl="then, then"+$e,ol=Xt+Qt+Ce,dl="View",rl=(e,...t)=>St(...t,fe+": "+e,fe+ie,"mutator?: boolean"),sl=(...e)=>St(...e,fe,fe+$e,"mutator"),Il=(e,t,a,n,o)=>{const[d,r,I,c,T,v,V,x]=Et(),[R,k,S]=Ot(e,t,T),A=`./${xt(a)}.d`,D=`./${xt(a)}-ui-react.d`,O="tinybase/ui-react",N=xt(a,1),j=xt(N),M=N+"Or"+N+Ce,G=j+"Or"+N+Ce,J=j+`={${j}}`,z=X(),W=(e,t,a,n,o,d=l)=>(r(1,D,e+" as "+e+"Decl"),wt(z,e,[t,a,n,o,d])),B=(e,t,a,n,o,d=l)=>W("use"+e,t,a,n,o,d),F=(e,t,a,n,o=l,d=l,s=l,I=l,c=l)=>(r(1,O,`use${t} as use${t}Core`),B(e,St(o,q,I),a,ee+`(${G}, use${t}Core, [`+(d||l)+(c?"], ["+c:l)+"]);",n,s)),U=(e,t,l,a)=>W(e,t,1,l,a),_=(e=0)=>te(z,(([t,a,n,o,d],r)=>{const s=e?[be+` const ${r}: typeof ${r}Decl = ${d}(${t}): ${1==a?"any":a} =>`,n]:[be+` function ${r}${d}(${t}): ${1==a?"ComponentReturnType":a};`];return e||E(s,kt(o)),P(s,l),s}));r(null,"tinybase",Ce,"Store",Ie,Ut+"ized"+Ie),r(0,O,"ComponentReturnType"),r(null,O,"ExtraProps"),r(0,A,N);const H=I(M,N+" | "+Ce,`Used when you need to refer to a ${N} in a React hook or component`),Q=I(Ve+ve,At(j+ge+N,j+`ById?: {[${j}Id: Id]: ${N}}`),`Used with the ${Ve} component, so that a `+N+" can be passed into the context of an application");r(0,"react","ReactElement","ComponentType"),r(1,"react","React"),r(1,D,H,Q);const q=G+ge+H;T("{createContext, useContext, useMemo}","React"),T("Context",`createContext<[${N}?, {[${j}Id: Id]: ${N}}?]>([])`),B("Create"+N,`create: () => ${N}, create`+ie,N,"\n// eslint-disable-next-line react-hooks/exhaustive-deps\nuseMemo(create, createDeps)",`Create a ${N} within a React application with convenient memoization`);const K=B(N,"id?: Id",N+we,["{",Zt,"return id == null ? contextValue[0] : contextValue[1]?.[id];","}"],`Get a reference to a ${N} from within a ${Ve} component context`),ee=c("useHook",G+`: ${H} | undefined, hook: (...params: any[]) => any, preParams: any[], postParams: any[] = []`,[`const ${j} = ${K}(${G} as Id);`,`return hook(...preParams, ((${G} == null || typeof ${G} == 'string')`,`? ${j} : ${G})?.getStore(), ...postParams)`]),le=c("getProps","getProps: ((id: any) => ExtraProps) | undefined, id: Id","(getProps == null) ? ({} as ExtraProps) : getProps(id)"),ae=c("wrap",St("children: any","separator?: any","encloseWithId?: boolean","id?: Id"),["const separated = separator==null || !Array.isArray(children)"," ? children"," : children.map((child, c) => (c > 0 ? [separator, child] : child));","return encloseWithId ? [id, ':{', separated, '}'] : separated;"]),ne=T("NullComponent","() => null");if(!Z(e)){const[e,t,a,o,d,g,w,y,T,v,V,x,S,P]=n;r(null,A,e,t,a,d,g,w,y,T,v,V,x,S),r(0,A,o),r(1,A,N),r(null,"tinybase",$,"IdOrNull");const E=c("tableView",`{${j}, rowComponent, getRowComponentProps`+el+"}: any, rowIds: Ids, tableId: Id, defaultRowComponent: React.ComponentType<any>",["const Row = rowComponent ?? defaultRowComponent;",`return ${ae}(rowIds.map((rowId) => (`,"<Row","{..."+le+"(getRowComponentProps, rowId)}","key={rowId}","tableId={tableId}",Yt,J,Bt,"/>","))",el,", tableId,",");"]),O=c("getDefaultTableComponent","tableId: Id",vt(R(((e,t,l)=>`tableId == ${l} ? ${t}TableView : `)))+ne),M=c("getDefaultCellComponent","tableId: Id, cellId: Id",vt(R(((e,t,l)=>`tableId == ${l} ? ${vt(k(e,((e,l,a,n,o)=>`cellId == ${n} ? `+t+o+"CellView : ")))+ne} : `)))+ne);F(u,u,e,qe(1,0)+se);const G=F(p,p,a+Ee,Xe(i,De)+se);F(Pe+u+Ie,Pe+u+Ie,Kt,qe(1,9)+Ht,St(Jt(u)+_t+t,Jt(u)+ie),zt(u),qt,St(ll,`tables: ${t})`+ze,Ft),nl),F(ce+u+Ie,ce+u+Ie,Ie,qe(1,12),l,l,l,al,nl);const z=I(m+ve,At("tableId?: TId","rowId: Id","cellId?: CId",j+ge+N,Wt),et(de+m),`<TId extends ${a}, CId extends ${o}<TId>>`),W=I(b+ve,At("tableId?: TId","rowId: Id",j+ge+N,"cellComponents?: {readonly [CId in "+o+`<TId>]?: ComponentType<${z}<TId, CId>>;}`,`getCellComponentProps?: (cellId: ${o}<TId>) => ExtraProps`,tl,Wt),et(de+b),`<TId extends ${a}>`),B=I(i+ve,At("tableId?: TId",j+ge+N,`rowComponent?: ComponentType<${W}<TId>>`,"getRowComponentProps?: (rowId: Id) => ExtraProps",tl,Wt),et(de+i),`<TId extends ${a}>`),_=I("Sorted"+i+ve,At("tableId?: TId","cellId?: "+o+"<TId>","descending?: boolean","offset?: number","limit?: number",j+ge+N,`rowComponent?: ComponentType<${W}<TId>>`,"getRowComponentProps?: (rowId: Id) => ExtraProps",tl,Wt),et(de+"sorted "+i),`<TId extends ${a}>`),Z=I(u+ve,At(j+ge+N,"tableComponents?: {readonly [TId in "+a+`]?: ComponentType<${B}<TId>>;}`,`getTableComponentProps?: (tableId: ${a}) => ExtraProps`,tl,Wt),et(Qe(1,1)));r(1,D,Z,B,_,W,z),U(u+dl,"{"+j+", tableComponents, getTableComponentProps"+el+"}: "+Z,[ae+`(${G}(${j}).map((tableId) => {`,"const Table = (tableComponents?.[tableId] ?? "+O+"(tableId)) as React.ComponentType<TableProps<typeof tableId>>;","return <Table",`{...${le}(getTableComponentProps, tableId)}`,"tableId={tableId}","key={tableId}",J,Bt,"/>;","}), separator)"],qe(1,13)+se),R(((e,t,a)=>{const[n,o,d,s,I]=Y(P,e);r(null,A,n,o,d,s,I),F(t+i,i,n,dt(e)+se,l,a),F(t+i+f,i+f,$,Xe(m,"the whole of "+nt(e))+se,l,a);const c=F(t+C,C,$,Xe(b,nt(e))+se,l,a),u=F(t+h,h,$,Xe(b,nt(e),1)+se,"cellId?: "+I+", descending?: boolean, offset?: number, limit?: number",a+", cellId, descending, offset, limit");F(t+b,b,d,rt(e)+se,ol,St(a,Xt));const p=F(t+f,f,I+Ee,Xe(m,ot(e))+se,ol,St(a,Xt));F(Pe+t+i+Ie,Pe+i+Ie,Kt,dt(e,9)+Ht,St(Jt(i)+_t+o,Jt(i)+ie),St(a,zt(i)),qt,St(ll,`table: ${o})`+ze,Ft),nl),F(ce+t+i+Ie,ce+i+Ie,Ie,dt(e,12),l,a,l,al,nl),F(Pe+t+b+Ie,Pe+b+Ie,Kt,rt(e,9)+Ht,St(ol,Jt(b)+_t+s,Jt(b)+ie),St(a,Xt,zt(b)),qt,St(ll,`row: ${s})`+ze,Ft),nl),F("Add"+t+b+Ie,"Add"+b+Ie,Kt,rt(e,10)+Ht,St(Jt(b)+_t+s,Jt(b)+ie),St(a,zt(b)),qt,"then?: ("+St(ol+we,"store: Store","row: "+s+")"+ze,"then"+ie)+", reuseRowIds?: boolean",nl+", reuseRowIds"),F(Pe+t+Te+b+Ie,Pe+Te+b+Ie,Kt,rt(e,11)+Ht,St(ol,Jt(Te+b)+_t+s,Jt(Te+b)+ie),St(a,Xt,zt(Te+b)),qt,St(ll,`partialRow: ${s})`+ze,Ft),nl),F(ce+t+b+Ie,ce+b+Ie,Ie,rt(e,12),ol,St(a,Xt),l,al,nl);const g=U(t+b+dl,"{rowId, "+j+", cellComponents, getCellComponentProps"+el+`}: ${W}<'${e}'>`,[ae+`(${p}(rowId, ${j}).map((cellId) => {`,"const Cell = (cellComponents?.[cellId] ?? "+M+`(${a}, cellId)) as React.ComponentType<CellProps<typeof `+a+", typeof cellId>>;","return <Cell",`{...${le}(getCellComponentProps, cellId)} `,"key={cellId}",`tableId={${a}}`,Yt,"cellId={cellId}",J,Bt,"/>;","})"+el+", rowId)"],rt(e,13)+se);U(t+"Sorted"+i+dl,"{cellId, descending, offset, limit, ...props}: "+_+`<'${e}'>`,E+"(props, "+u+`(cellId, descending, offset, limit, props.${j}), ${a}, ${g});`,dt(e,13)+", sorted"+se),U(t+i+dl,`props: ${B}<'${e}'>`,E+"(props, "+c+`(props.${j}), ${a}, ${g});`,dt(e,13)+se),k(e,((n,o,d,s,I)=>{const c="Map"+xt(o,1);r(0,A,c),r(1,A,c);const $=F(t+I+m,m,o+(L(d)?we:l),st(e,n)+se,ol,St(a,Xt,s));F(Pe+t+I+m+Ie,Pe+m+Ie,Kt,st(e,n,9)+Ht,St(ol,Jt(m)+_t+o+" | "+c,Jt(m)+ie),St(a,Xt,s,zt(m)),qt,St(ll,`cell: ${o} | ${c})`+ze,Ft),nl),F(ce+t+I+m+Ie,ce+m+Ie,Ie,st(e,n,12),St(ol,"forceDel?: boolean"),St(a,Xt,s,"forceDel"),l,al,nl),U(t+I+m+dl,`{rowId, ${j}, debugIds}: `+z+`<'${e}', '${n}'>`,[ae+`('' + ${$}(rowId, `+j+`) ?? '', undefined, debugIds, ${s})`],st(e,n,13)+se)}))}));const H=vt(R((e=>Y(P,e)?.[4]??l))," | ");F(u+s,u+s,Je,qe(1,8)+" changes",rl(d),sl()),F(p+s,p+s,Je,at(2,0,1),rl(g),sl()),F(i+s,i+s,Je,at(3,0),rl(w,`tableId: ${a} | null`),sl("tableId")),F(i+f+s,i+f+s,Je,at(14,3,1),rl(y,`tableId: ${a} | null`),sl("tableId")),F(C+s,C+s,Je,at(4,3,1),rl(T,`tableId: ${a} | null`),sl("tableId")),F(h+s,h+s,Je,at(13,3,1),rl(v,`tableId: ${a} | null`,"cellId: "+H+we,"descending: boolean","offset: number","limit: number"+we),sl("tableId","cellId","descending","offset","limit")),F(b+s,b+s,Je,at(5,3),rl(V,`tableId: ${a} | null`,Xt+": IdOrNull"),sl("tableId",Xt)),F(f+s,f+s,Je,at(6,5,1),rl(x,`tableId: ${a} | null`,Xt+": IdOrNull"),sl("tableId",Xt)),F(m+s,m+s,Je,at(7,5),rl(S,`tableId: ${a} | null`,Xt+": IdOrNull",`cellId: ${H} | null`),sl("tableId",Xt,"cellId"))}if(!Z(t)){const[e,t,a,n,d,$]=o;r(null,A,...o),r(1,A,N);const i=c("getDefaultValueComponent","valueId: Id",vt(S(((e,t,l,a,n)=>`valueId == ${a} ? `+n+"ValueView : ")))+ne);F(w,w,e,qe(2,0)+se);const u=F(y,y,a+Ee,Xe(g,De)+se);F(Pe+w+Ie,Pe+w+Ie,Kt,qe(2,9)+Ht,St(Jt(w)+_t+t,Jt(w)+ie),zt(w),qt,St(ll,`values: ${t})`+ze,Ft),nl),F(Pe+Te+w+Ie,Pe+Te+w+Ie,Kt,qe(2,11)+Ht,St(Jt(Te+w)+_t+t,Jt(Te+w)+ie),zt(Te+w),qt,St(ll,`partialValues: ${t})`+ze,Ft),nl),F(ce+w+Ie,ce+w+Ie,Ie,qe(2,12),l,l,l,al,nl);const p=I(g+ve,At("valueId?: VId",j+ge+N,Wt),et("a Value"),`<VId extends ${a}>`),b=I(w+ve,At(j+ge+N,"valueComponents?: {readonly [VId in "+a+`]?: ComponentType<${p}<VId>>;}`,`getValueComponentProps?: (valueId: ${a}) => ExtraProps`,tl,Wt),et(Qe(2,1)));r(1,D,b,p),U(w+dl,"{"+j+", valueComponents, getValueComponentProps"+el+"}: "+b,[ae+`(${u}(${j}).map((valueId) => {`,"const Value = valueComponents?.[valueId] ?? "+i+"(valueId);","return <Value",`{...${le}(getValueComponentProps, valueId)}`,"key={valueId}",J,Bt,"/>;","}), separator)"],qe(2,13)+se),S(((e,t,a,n,o)=>{const d="Map"+xt(t,1);r(0,A,d),r(1,A,d);const s=F(o+g,g,t,It(e)+se,l,n);F(Pe+o+g+Ie,Pe+g+Ie,Kt,It(e,9)+Ht,St(Jt(g)+_t+t+" | "+d,Jt(g)+ie),St(n,zt(g)),qt,St(ll,`value: ${t} | ${d})`+ze,Ft),nl),F(ce+o+g+Ie,ce+g+Ie,Ie,It(e,12),l,n,l,al,nl),U(o+g+dl,`{${j}, debugIds}: ${p}<'${e}'>`,[ae+`('' + ${s}(`+j+`) ?? '', undefined, debugIds, ${n})`],It(e,13)+se)})),F(w+s,w+s,Je,qe(2,8)+" changes",rl(n),sl()),F(y+s,y+s,Je,at(10,0,1),rl(d),sl()),F(g+s,g+s,Je,at(11,0),rl($,`valueId: ${a} | null`),sl("valueId"))}return U(Ve,`{${j}, ${j}ById, children}: `+Q+" & {children: React.ReactNode}",["{",Zt,"return (","<Context."+Ve,"value={useMemo(",`() => [${j} ?? contextValue[0], {...contextValue[1], ...${j}ById}],`,`[${j}, ${j}ById, contextValue],`,")}>","{children}",`</Context.${Ve}>`,");","}"],"Wraps part of an application in a context that provides default objects to be used by hooks and components within"),[d(...v(0),...V(),..._(0)),d(...v(1),...x(),..._(1))]},cl=(e,t,a)=>{if(Z(e)&&Z(t))return[l,l,l,l];const[n,o,d,r]=Gt(e,t,a);return[n,o,...Il(e,t,a,d,r)]},$l={parser:"typescript",singleQuote:!0,trailingComma:"all",bracketSpacing:!1,jsdocSingleLineComment:!1},il=Dt((e=>{const t=()=>{const t=O(e.getTablesSchemaJson());return!Z(t)||T(e.getTableIds(),(l=>{const a=e.getRowIds(l),n=X();if(T(a,(t=>T(e.getCellIds(l,t),(a=>{const o=e.getCell(l,t,a),d=ae(n,a,(()=>[z(o),X(),[0],0])),[r,s,[I]]=d,c=ae(s,o,(()=>0))+1;return c>I&&(d[2]=[c,o]),le(s,o,c),d[3]++,r==z(o)})))))return t[l]={},q(n,(([e,,[,n],o],s)=>{t[l][s]={[d]:e,...o==R(a)?{[r]:n}:{}}})),1}))?t:{}},l=()=>{const t=O(e.getValuesSchemaJson());return Z(t)&&e.forEachValue(((e,l)=>{t[e]={[d]:z(l)}})),t},a=e=>cl(t(),l(),e),n=async e=>{const t=["d.ts","ts","d.ts","tsx"];let l;try{l=(await import("prettier")).format}catch(e){l=e=>e}return x(a(e),((e,a)=>yt(l(e,{...$l,filepath:"_."+t[a]}))))};return F({getStoreStats:t=>{let l=0,a=0,n=0;const o={};return e.forEachTable(((e,d)=>{l++;let r=0,s=0;const I={};d(((e,l)=>{r++;let a=0;l((()=>a++)),s+=a,t&&(I[e]={rowCells:a})})),a+=r,n+=s,t&&(o[e]={tableRows:r,tableCells:s,rows:I})})),{totalTables:l,totalRows:a,totalCells:n,totalValues:R(e.getValueIds()),jsonLength:Tt(e.getJson()),...t?{detail:{tables:o}}:{}}},getStoreTablesSchema:t,getStoreValuesSchema:l,getStoreApi:a,getPrettyStoreApi:n,getStore:()=>e})}));e.createTools=il},"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).TinyBaseTools={});
