var e,t;e=this,t=function(e){"use strict";const t=e=>typeof e,n="",s=t(n),r=t(!0),o=t(0),l=t(t),a="type",i="default",c=e=>n+e,d=(e,t)=>e.forEach(t),u=(e,t)=>e.map(t),f=e=>e.length,h=(e,t,n)=>e.slice(t,n),T=(e,...t)=>e.push(...t),b=e=>JSON.stringify(e,((e,t)=>{return y(t,Map)?(n=(e,[t,n])=>(e[t]=n,e),s={},[...t].reduce(n,s)):t;var n,s})),g=JSON.parse,p=isFinite,y=(e,t)=>e instanceof t,v=e=>null==e,w=(e,t,n)=>v(e)?n?.():t(e),R=e=>e==s||e==r,S=(e,t)=>e?.has(t)??!1,C=e=>v(e)||0==(e=>e.size)(e),I=e=>e.clear(),L=(e,t)=>e?.forEach(t),m=(e,t)=>e?.delete(t),E=e=>new Map(e),J=e=>[...e?.keys()??[]],F=(e,t)=>e?.get(t),x=(e,t)=>L(e,((e,n)=>t(n,e))),z=(e,t,n)=>v(n)?(m(e,t),e):e?.set(t,n),O=(e,t,n)=>(S(e,t)||z(e,t,n()),F(e,t)),j=(e,t,n)=>{const s={},r=t??(e=>e);return L(e,((e,t)=>w(r(e),(e=>n?.(e)?0:s[t]=e)))),s},k=(e,t)=>{const n=E(),s=t??(e=>e);return L(e,((e,t)=>n.set(t,s(e)))),n},A=e=>k(e,k),M=(e,t,n,s,r=0)=>w((n?O:F)(e,t[r],r>f(t)-2?n:E),(o=>{if(r>f(t)-2)return s?.(o)&&z(e,t[r]),o;const l=M(o,t,n,s,r+1);return C(o)&&z(e,t[r]),l})),N=Object,B=N.keys,D=N.isFrozen,P=N.freeze,W=(e,t)=>!v(((e,t)=>w(e,(e=>e[t])))(e,t)),$=(e,t)=>delete e[t],q=(e,t)=>u(N.entries(e),(([e,n])=>t(n,e))),G=e=>{return t=B(e),0==f(t);var t},H=e=>new Set(Array.isArray(e)||v(e)?e:[e]),K=(e,t)=>e?.add(t),Q=/^\d+$/,U=()=>{const e=[];let t=0;return[()=>e.shift()??n+t++,t=>{Q.test(t)&&f(e)<1e3&&T(e,t)}]},V=e=>[e,e],X=()=>[E(),E()],Y=e=>{const n=t(e);return R(n)||n==o&&p(e)?n:void 0},Z=(e,t,n,s=z)=>{const r=(o=e=>!W(t,e),J(e).filter(o));var o;return d(B(t),(s=>n(e,s,t[s]))),d(r,(t=>s(e,t))),e},_=(e,t,n)=>v(e)||!(e=>y(e,N)&&e.constructor==N)(e)||G(e)||D(e)?(n?.(),!1):(q(e,((n,s)=>{t(n,s)||$(e,s)})),!G(e)),ee=(e,t,n)=>z(e,t,F(e,t)==-n?void 0:n),te=()=>{let e,s,r=0;const p=E(),y=E(),N=E(),B=E(),D=E(),Q=E(),ne=E(),se=E(),re=E(),oe=X(),le=X(),ae=X(),ie=X(),ce=X(),de=X(),ue=X(),fe=X(),he=X(),Te=X(),[be,ge,pe,ye]=(e=>{let t;const[s,r]=U(),o=E();return[(e,r,l)=>{t??=tt;const a=s();return z(o,a,[e,r,l]),K(M(r,l??[n],H),a),a},(e,s,...r)=>d(((e,t=[n])=>{const s=[],r=(e,n)=>n==f(t)?T(s,e):null===t[n]?L(e,(e=>r(e,n+1))):d([t[n],null],(t=>r(F(e,t),n+1)));return r(e,0),s})(e,s),(e=>L(e,(e=>F(o,e)[0](t,...s??[],...r))))),e=>w(F(o,e),(([,t,s])=>(M(t,s??[n],void 0,(t=>(m(t,e),C(t)?1:0))),z(o,e),r(e),s))),(e,n,s)=>w(F(o,e),(([e,,r=[]])=>{const o=(...l)=>{const a=f(l);a==f(r)?e(t,...l,...s(l)):v(r[a])?d(n[a](...l),(e=>o(...l,e))):o(...l,r[a])};o()}))]})(),ve=(t,n)=>(!e||S(Q,n)||Be(n))&&_(t,((e,t)=>we(n,t,e)),(()=>Be(n))),we=(e,t,n,s)=>_(s?n:Se(n,e,t),((s,r)=>w(Re(e,t,r,s),(e=>(n[r]=e,!0)),(()=>!1))),(()=>Be(e,t))),Re=(t,n,s,r)=>e?w(F(F(Q,t),s),(e=>Y(r)!=e.type?Be(t,n,s,r,e.default):r),(()=>Be(t,n,s,r))):v(Y(r))?Be(t,n,s,r):r,Se=(e,t,n)=>(w(F(ne,t),(([s,r])=>{L(s,((t,n)=>{W(e,n)||(e[n]=t)})),L(r,(s=>{W(e,s)||Be(t,n,s)}))})),e),Ce=e=>Z(Q,e,((e,t,n)=>{const s=E(),r=H();Z(O(Q,t,E),n,((e,t,n)=>{z(e,t,n),w(n.default,(e=>z(s,t,e)),(()=>K(r,t)))})),z(ne,t,[s,r])}),((e,t)=>{z(Q,t),z(ne,t)})),Ie=e=>Z(re,e,((e,t,n)=>Le(t,n)),((e,t)=>ze(t))),Le=(e,t)=>Z(O(re,e,(()=>(ke(e,1),E()))),t,((t,n,s)=>me(e,t,n,s)),((t,n)=>Oe(e,t,n))),me=(e,t,n,s,r)=>Z(O(t,n,(()=>(Ae(e,n,1),E()))),s,((t,s,r)=>Ee(e,n,t,s,r)),((s,o)=>je(e,t,n,s,o,r))),Ee=(e,t,n,s,r)=>{S(n,s)||Me(e,t,s,1);const o=F(n,s);r!==o&&(Ne(e,t,s,o,r),z(n,s,r))},Je=(e,t,n,s,r)=>w(F(t,n),(t=>Ee(e,n,t,s,r)),(()=>me(e,t,n,Se({[s]:r},e,n)))),Fe=e=>{const[t]=O(se,e,U),n=t();return S(F(re,e),n)?Fe(e):n},xe=e=>F(re,e)??Le(e,{}),ze=e=>Le(e,{}),Oe=(e,t,n)=>{const[,s]=O(se,e,U);s(n),me(e,t,n,{},!0)},je=(e,t,n,s,r,o)=>{const l=F(F(ne,e)?.[0],r);if(!v(l)&&!o)return Ee(e,n,s,r,l);const a=t=>{Ne(e,n,t,F(s,t)),Me(e,n,t,-1),z(s,t)};v(l)?a(r):x(s,a),C(s)&&(Ae(e,n,-1),C(z(t,n))&&(ke(e,-1),z(re,e),z(se,e)))},ke=(e,t)=>ee(p,e,t),Ae=(e,t,n)=>ee(O(y,e,E),t,n),Me=(e,t,n,s)=>ee(O(O(N,e,E),t,E),n,s),Ne=(e,t,n,s,r)=>O(O(O(B,e,E),t,E),n,(()=>[s,0]))[1]=r,Be=(e,t,n,s,r)=>(T(O(O(O(D,e,E),t,E),n,(()=>[])),s),r),De=(e,t,n)=>w(F(F(F(B,e),t),n),(([e,t])=>[!0,e,t]),(()=>[!1,...V(Ve(e,t,n))])),Pe=e=>C(D)||C(he[e])?0:L(e?k(D,A):D,((t,n)=>L(t,((t,s)=>L(t,((t,r)=>ge(he[e],[n,s,r],t))))))),We=(e,t,n)=>{if(!C(t))return ge(e,n),1},$e=e=>{const t=C(ce[e]),n=C(ue[e])&&C(ie[e])&&t&&C(le[e]),s=C(fe[e])&&C(de[e])&&C(ae[e])&&C(oe[e]);if(!n||!s){const r=e?[k(p),A(y),k(N,A),k(B,A)]:[p,y,N,B];if(!n){L(r[2],((t,n)=>L(t,((t,s)=>We(ue[e],t,[n,s])))));const n=H();L(r[1],((s,r)=>{We(ie[e],s,[r])&&!t&&(ge(ce[e],[r,null]),K(n,r))})),t||L(r[3],((t,s)=>{if(!S(n,s)){const n=H();L(t,(e=>L(e,(([t,s],r)=>s!==t?K(n,r):m(e,r))))),L(n,(t=>ge(ce[e],[s,t])))}})),We(le[e],r[0])}if(!s){let t;L(r[3],((n,s)=>{let r;L(n,((n,o)=>{let l;L(n,(([n,a],i)=>{a!==n&&(ge(fe[e],[s,o,i],a,n,De),t=r=l=1)})),l&&ge(de[e],[s,o],De)})),r&&ge(ae[e],[s],De)})),t&&ge(oe[e],void 0,De)}}},qe=(e,...t)=>(Ze((()=>e(...u(t,c)))),tt),Ge=()=>j(re,(e=>j(e,j))),He=()=>J(re),Ke=e=>J(F(re,c(e))),Qe=(e,t,n,s=0,r)=>{return u(h((l=F(re,c(e)),a=(e,n)=>[v(t)?n:F(e,c(t)),n],o=([e],[t])=>(e<t?-1:1)*(n?-1:1),u([...l?.entries()??[]],(([e,t])=>a(t,e))).sort(o)),s,v(r)?r:s+r),(([,e])=>e));var o,l,a},Ue=(e,t)=>J(F(F(re,c(e)),c(t))),Ve=(e,t,n)=>F(F(F(re,c(e)),c(t)),c(n)),Xe=e=>qe((()=>(e=>_(e,ve,Be))(e)?Ie(e):0)),Ye=()=>qe((()=>Ie({}))),Ze=(e,t)=>{if(-1==r)return;_e();const n=e();return et(t),n},_e=()=>(r++,tt),et=e=>(r>0&&(r--,0==r&&(s=!C(B),r=1,Pe(1),s&&$e(1),r=-1,e?.(j(B,(e=>j(e,(e=>j(e,(e=>[...e]),(([e,t])=>e===t))),G)),G),j(D,(e=>j(e,j))))&&(r=1,L(B,((e,t)=>L(e,((e,n)=>L(e,(([e],s)=>((e,t,n,s,r)=>v(r)?e.delCell(t,n,s,!0):e.setCell(t,n,s,r))(tt,t,n,s,e))))))),r=-1,s=!1),ge(Te[0],void 0,s),Pe(0),s&&$e(0),ge(Te[1],void 0,s),r=0,d([B,D,p,y,N],I))),tt),tt={getTables:Ge,getTableIds:He,getTable:e=>j(F(re,c(e)),j),getRowIds:Ke,getSortedRowIds:Qe,getRow:(e,t)=>j(F(F(re,c(e)),c(t))),getCellIds:Ue,getCell:Ve,hasTables:()=>!C(re),hasTable:e=>S(re,c(e)),hasRow:(e,t)=>S(F(re,c(e)),c(t)),hasCell:(e,t,n)=>S(F(F(re,c(e)),c(t)),c(n)),getJson:()=>b(re),getSchemaJson:()=>b(Q),setTables:Xe,setTable:(e,t)=>qe((e=>ve(t,e)?Le(e,t):0),e),setRow:(e,t,n)=>qe(((e,t)=>we(c(e),c(t),n)?me(c(e),xe(c(e)),c(t),n):0),e,t),addRow:(e,t)=>Ze((()=>{let n;return we(e,n,t)&&(e=c(e),me(e,xe(e),n=Fe(e),t)),n})),setPartialRow:(e,t,n)=>qe(((e,t)=>{if(we(e,t,n,1)){const s=xe(e);q(n,((n,r)=>Je(e,s,t,r,n)))}}),e,t),setCell:(e,n,s,r)=>qe(((e,n,s)=>w(Re(e,n,s,t(r)==l?r(Ve(e,n,s)):r),(t=>Je(e,xe(e),n,s,t)))),e,n,s),setJson:e=>{try{"{}"===e?Ye():Xe(g(e))}catch{}return tt},setSchema:t=>qe((()=>{if((e=(e=>_(e,(e=>_(e,(e=>{if(!_(e,((e,t)=>[a,i].includes(t))))return!1;const t=e.type;return!(!R(t)&&t!=o||(Y(e.default)!=t&&$(e,i),0))})))))(t))&&(Ce(t),!C(re))){const e=Ge();Ye(),Xe(e)}})),delTables:Ye,delTable:e=>qe((e=>S(re,e)?ze(e):0),e),delRow:(e,t)=>qe(((e,t)=>w(F(re,e),(n=>S(n,t)?Oe(e,n,t):0))),e,t),delCell:(e,t,n,s)=>qe(((e,t,n)=>w(F(re,e),(r=>w(F(r,t),(o=>S(o,n)?je(e,r,t,o,n,s):0))))),e,t,n),delSchema:()=>qe((()=>{Ce({}),e=!1})),transaction:Ze,startTransaction:_e,finishTransaction:et,forEachTable:e=>L(re,((t,n)=>e(n,(e=>L(t,((t,n)=>e(n,(e=>x(t,e))))))))),forEachRow:(e,t)=>L(F(re,c(e)),((e,n)=>t(n,(t=>x(e,t))))),forEachCell:(e,t,n)=>x(F(F(re,c(e)),c(t)),n),addSortedRowIdsListener:(e,t,n,s,r,o,l)=>{let a=Qe(e,t,n,s,r);return be((()=>{const l=Qe(e,t,n,s,r);var i,c,d;c=a,f(i=l)===f(c)&&(d=(e,t)=>c[t]===e,i.every(d))||(a=l,o(tt,e,t,n,s,r,a))}),ce[l?1:0],[e,t])},addWillFinishTransactionListener:e=>be(e,Te[0]),addDidFinishTransactionListener:e=>be(e,Te[1]),callListener:e=>(ye(e,[He,Ke,Ue],(e=>v(e[2])?[]:V(Ve(...e)))),tt),delListener:e=>(pe(e),tt),getListenerStats:()=>({}),createStore:te};return q({Tables:[0,oe],TableIds:[0,le],Table:[1,ae],RowIds:[1,ie],Row:[2,de],CellIds:[2,ue],Cell:[3,fe],InvalidCell:[3,he]},(([e,t],n)=>{tt["add"+n+"Listener"]=(...n)=>be(n[e],t[n[e+1]?1:0],e>0?h(n,0,e):void 0)})),P(tt)};e.createStore=te},"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).TinyBaseStore={});
