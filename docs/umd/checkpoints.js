var e,t;e=this,t=function(e){"use strict";const t=(e,t)=>e.includes(t),n=(e,t)=>e.forEach(t),o=e=>e.length,r=e=>0==o(e),s=(e,...t)=>e.push(...t),i=e=>e.pop(),c=e=>e.shift(),l=e=>null==e,d=(e,t,n)=>l(e)?n?.():t(e),a=(e,t)=>e?.has(t)??!1,u=e=>l(e)||0==(e=>e.size)(e),h=(e,t)=>e?.forEach(t),p=(e,t)=>e?.delete(t),f=e=>new Map(e),C=(e,t)=>e?.get(t),g=(e,t,n)=>l(n)?(p(e,t),e):e?.set(t,n),k=(e,t,n)=>(a(e,t)||g(e,t,n()),C(e,t)),y=(e,t,n,r,s=0)=>d((n?k:C)(e,t[s],s>o(t)-2?n:f),(i=>{if(s>o(t)-2)return r?.(i)&&g(e,t[s]),i;const c=y(i,t,n,r,s+1);return u(i)&&g(e,t[s]),c})),v=e=>new Set(Array.isArray(e)||l(e)?e:[e]),L=/^\d+$/,w=Object.freeze,b=(e=>{const b=new WeakMap;return e=>(b.has(e)||b.set(e,(e=>{let b,S,T,x=100,z=f(),E=1;const j=f(),m=f(),[A,B,I]=(e=>{let t;const[r,i]=(()=>{const e=[];let t=0;return[()=>c(e)??""+t++,t=>{L.test(t)&&o(e)<1e3&&s(e,t)}]})(),a=f();return[(e,n,o)=>{t??=V;const s=r();var i;return g(a,s,[e,n,o]),i=s,y(n,o??[""],v)?.add(i),s},(e,r,...i)=>n(((e,t=[""])=>{const r=[],i=(e,c)=>c==o(t)?s(r,e):null===t[c]?h(e,(e=>i(e,c+1))):n([t[c],null],(t=>i(C(e,t),c+1)));return i(e,0),r})(e,r),(e=>h(e,(e=>C(a,e)[0](t,...r??[],...i))))),e=>d(C(a,e),(([,t,n])=>(y(t,n??[""],void 0,(t=>(p(t,e),u(t)?1:0))),g(a,e),i(e),n))),(e,r,s)=>d(C(a,e),(([e,,i=[]])=>{const c=(...d)=>{const a=o(d);a==o(i)?e(t,...d,...s(d)):l(i[a])?n(r[a](...d),(e=>c(...d,e))):c(...d,i[a])};c()}))]})(),M=f(),F=f(),O=[],W=[],$=(t,n)=>{E=0,e.transaction((()=>h(C(M,n),((n,o)=>h(n,((n,r)=>h(n,((n,s)=>((e,t,n,o,r)=>l(r)?e.delCell(t,n,o,!0):e.setCell(t,n,o,r))(e,o,r,s,n[t]))))))))),E=1},q=e=>{g(M,e),g(F,e),B(m,[e])},D=(e,t)=>n(((e,t)=>e.splice(0,t))(e,t??o(e)),q),G=()=>D(O,o(O)-x),H=e.addCellListener(null,null,null,((e,t,n,o,r,c)=>{if(E){d(b,(()=>{s(O,b),G(),D(W),b=void 0,T=1}));const e=k(z,t,f),l=k(e,n,f),a=k(l,o,(()=>[c,void 0]));a[1]=r,a[0]===r&&u(g(l,o))&&u(g(e,n))&&u(g(z,t))&&(b=i(O),T=1),P()}})),J=(e="")=>(l(b)&&(b=""+S++,g(M,b,z),R(b,e),z=f(),T=1),b),K=()=>{r(O)||(((e,...t)=>{e.unshift(...t)})(W,J()),$(0,b),b=i(O),T=1)},N=()=>{r(W)||(s(O,b),b=c(W),$(1,b),T=1)},P=()=>{T&&(B(j),T=0)},Q=e=>{const t=J(e);return P(),t},R=(e,t)=>(U(e)&&C(F,e)!==t&&(g(F,e,t),B(m,[e])),V),U=e=>a(M,e),V={setSize:e=>(x=e,G(),V),addCheckpoint:Q,setCheckpoint:R,getStore:()=>e,getCheckpointIds:()=>[[...O],b,[...W]],forEachCheckpoint:e=>{return t=e,h(F,((e,n)=>t(n,e)));var t},hasCheckpoint:U,getCheckpoint:e=>C(F,e),goBackward:()=>(K(),P(),V),goForward:()=>(N(),P(),V),goTo:e=>{const n=t(O,e)?K:t(W,e)?N:null;for(;!l(n)&&e!=b;)n();return P(),V},addCheckpointIdsListener:e=>A(e,j),addCheckpointListener:(e,t)=>A(t,m,[e]),delListener:e=>(I(e),V),clear:()=>(D(O),D(W),l(b)||q(b),b=void 0,S=0,Q(),V),destroy:()=>{e.delListener(H)},getListenerStats:()=>({})};return w(V.clear())})(e)),b.get(e))})();e.createCheckpoints=b},"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).TinyBaseCheckpoints={});
