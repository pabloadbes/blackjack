const miModulo=(()=>{"use strict";let e,t;const a=document.querySelector("#btnPedir"),n=document.querySelector("#btnDetener"),r=document.querySelector("#btnNuevo"),s=document.querySelectorAll("small"),l=document.querySelectorAll(".divCartas"),d=(r=1)=>{e=o(),t=[];for(let e=0;e<=r;e++)t.push(0);s.forEach(e=>e.innerText=0),l.forEach(e=>e.innerText=""),n.disabled=!1,a.disabled=!1},o=()=>{const t=["C","D","H","S"],a=["A","J","Q","K"];e=[];for(let a=2;a<=10;a++)for(let n of t)e.push(a+n);for(let n of a)for(let a of t)e.push(n+a);return _.shuffle(e)},c=()=>{if(0===e.length)throw"No quedan más cartas";return e.pop()},i=(e,a)=>(t[a]+=(e=>isNaN(e.substring(0,e.length-1))?"A"===e.substring(0,e.length-1)?11:10:1*e.substring(0,e.length-1))(e),s[a].innerText=t[a],t[a]),u=(e,t)=>{const a=document.createElement("img");a.src=`assets/cartas/cartas/${e}.png`,a.classList.add("carta"),l[t].append(a)},g=e=>{let a=0;do{const e=c();a=i(e,t.length-1),u(e,t.length-1)}while(a<e&&e<=21);(()=>{const[e,a]=t;setTimeout(()=>{a===e?alert("Empate! Nadie gana"):a<=21?alert("La casa gana!!! Siga participando"):alert("La casa pierde")},500)})()};return a.addEventListener("click",()=>{const e=c(),t=i(e,0);u(e,0),t>21?(a.disabled=!0,n.disabled=!0,g(t)):21===t&&(a.disabled=!0,n.disabled=!0,g(t))}),n.addEventListener("click",()=>{a.disabled=!0,n.disabled=!0,g(t[0])}),r.addEventListener("click",()=>{d()}),{nuevoJuego:d}})();