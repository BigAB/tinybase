(()=>{var a=document,r=n=>a.querySelector(n);var t="dark",o="light",l="auto",c=()=>d(),d=()=>{let n=matchMedia("(prefers-color-scheme: dark)"),s=()=>{let e=localStorage.getItem(t)??l;r("#dark")?.setAttribute("class",e),r("html").className=e==t||e==l&&n.matches?t:o};n.addEventListener("change",s),window.addEventListener("storage",e=>{e.storageArea==localStorage&&e.key==t&&s()}),addEventListener("load",()=>{r("#dark").addEventListener("click",()=>{let e=localStorage.getItem(t);localStorage.setItem(t,e==t?o:e==o?l:t),s()}),s()}),s()};c();})();
