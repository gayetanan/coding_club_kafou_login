var w=(t,e,s)=>{if(!e.has(t))throw TypeError("Cannot "+s)};var d=(t,e,s)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,s)};var a=(t,e,s)=>(w(t,e,"access private method"),s);import"./main-_E14Bfoa.js";var r,c,o,m;class h{constructor(){d(this,r);d(this,o);this.canSubmit=!1,this.validPassword=!1,this.validEmail=!1}toggleEmail(e){const s=e.target.value;!s||!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(s)?this.validEmail=!1:this.validEmail=!0,a(this,r,c).call(this)}togglePassword(e){e.target.value.trim()===""?this.validPassword=!1:this.validPassword=!0,a(this,r,c).call(this)}}r=new WeakSet,c=function(){!this.validEmail||!this.validPassword?this.canSubmit=!1:this.canSubmit=!0,a(this,o,m).call(this)},o=new WeakSet,m=function(){const e=document.querySelector("#b");if(this.canSubmit){e.removeAttribute("disabled");return}e.setAttribute("disabled","true")};const g=new h,v=document.querySelector("#email"),i=document.querySelector("#password");v.addEventListener("input",t=>g.toggleEmail(t));i.addEventListener("input",t=>g.togglePassword(t));document.querySelector("#show").addEventListener("click",t=>{const e=t.target;i.getAttribute("type")==="password"?(i.type="text",e.classList.remove("bxs-show"),e.classList.add("bxs-hide")):(i.type="password",e.classList.remove("bxs-hide"),e.classList.add("bxs-show"))});function f({email:t,password:e}){const s=localStorage.getItem("users");if(!s)throw new Error("invalid credentails");const l=JSON.parse(s);if(l.length===0)throw new Error("invalid credentails");const n=l.find(u=>u.email==t&&u.password===e);if(!n)throw new Error("invalid credentails");delete n.password,localStorage.setItem("currentUser",JSON.stringify({...n})),window.location.href="/"}document.querySelector("#form").addEventListener("submit",t=>{try{t.preventDefault();const e=t.target.password.value,s=t.target.email.value;f({password:e,email:s})}catch(e){document.querySelector("#message-ctn span")||(document.querySelector("#message-ctn").innerHTML=`<span>${e.message}</span>`,setTimeout(()=>{document.querySelector("#message-ctn").innerHTML=""},6e3))}});