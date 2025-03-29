import{j as e,y as W,T as C,P as c,r as p,S as P,I as q,v as M,w as z,M as L,B as H,x as _,W as $}from"./index-4f470b80.js";import{a as E}from"./axios-9cbf0d09.js";import{b as B}from"./axios-c4247b21.js";import{T as y,a as h,b as G,c as J,d as K,e as Q,f as V}from"./TableSortLabel-278869ba.js";import{D as X,a as Y,b as Z,c as ee,S as te}from"./DialogTitle-924059e0.js";import{D as ne}from"./DialogContentText-833c681d.js";import{B as O}from"./Button-9fa635bc.js";import{C as se}from"./Container-e4a2ede8.js";import{C as oe}from"./Card-5879615a.js";import{P as re}from"./Pagination-87a9360e.js";import"./useId-5cbb1d54.js";import"./useControlled-b58863b4.js";function U({query:s}){return e.jsx(y,{children:e.jsx(h,{align:"center",colSpan:6,sx:{py:3},children:e.jsxs(W,{sx:{textAlign:"center"},children:[e.jsx(C,{variant:"h6",paragraph:!0,children:"Not found"}),e.jsxs(C,{variant:"body2",children:["No results found for  ",e.jsxs("strong",{children:['"',s,'"']}),".",e.jsx("br",{})," Try checking for typos or using complete words."]})]})})})}U.propTypes={query:c.string};function F({selected:s,_id:i,name:o,email:u,mobileNumber:l,title:t,type:g,status:k,onModification:f}){const[m,j]=p.useState(null),[S,T]=p.useState(""),[v,x]=p.useState(!1),D=r=>{j(r.currentTarget)},I=()=>{j(null)},N=()=>{x(!0)},n=()=>{x(!1)},d=async()=>{n();try{const r=localStorage.getItem("token");if(console.log("===>>>token",r),!r){console.error("No token found");return}const b=await E.put(`https://pasionneapi.codingacademy.world/api/user/user-soft-delete?id=${i}`,{},{headers:{Authorization:`${r}`}});f(),console.log("Response...",b),b.status===200?T("User deleted successfully."):console.error("Failed to delete user:",b)}catch(r){r.response?console.error("Error response data:",r.response.data):r.request?console.error("No response received:",r.request):console.error("Error",r.message)}},a=()=>{T("")};return e.jsxs(e.Fragment,{children:[e.jsxs(y,{hover:!0,tabIndex:-1,role:"checkbox",selected:s,children:[e.jsx(h,{padding:"checkbox",children:" "}),e.jsx(h,{component:"th",scope:"row",align:"center",padding:"none",children:e.jsx(P,{direction:"row",alignItems:"right",spacing:1,children:e.jsx(C,{variant:"subtitle2",noWrap:!0,children:o})})}),e.jsx(h,{children:u}),e.jsx(h,{children:l}),e.jsx(h,{children:t}),e.jsx(h,{align:"center",children:g}),e.jsx(h,{align:"right",children:e.jsx(q,{onClick:D,children:e.jsx(M,{icon:"eva:more-vertical-fill"})})})]}),e.jsx(z,{open:!!m,anchorEl:m,onClose:I,anchorOrigin:{vertical:"top",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"right"},PaperProps:{sx:{width:140}},children:e.jsxs(L,{onClick:N,sx:{color:"error.main"},children:[e.jsx(M,{icon:"eva:trash-2-outline",sx:{mr:2}}),"Delete"]})}),e.jsxs(X,{open:v,onClose:n,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[e.jsx(Y,{id:"alert-dialog-title",children:"Confirm Delete"}),e.jsx(Z,{children:e.jsx(ne,{id:"alert-dialog-description",children:"Are you sure you want to delete this user?"})}),e.jsxs(ee,{children:[e.jsx(O,{onClick:n,color:"primary",children:"Cancel"}),e.jsx(O,{onClick:d,color:"error",autoFocus:!0,children:"Delete"})]})]}),e.jsx(te,{open:!!S,autoHideDuration:6e3,onClose:a,message:S})]})}F.propTypes={email:c.string,mobileNumber:c.string,name:c.string,title:c.string,type:c.string,_id:c.string,selected:c.bool,status:c.string,onModification:c.string};const ie={border:0,margin:-1,padding:0,width:"1px",height:"1px",overflow:"hidden",position:"absolute",whiteSpace:"nowrap",clip:"rect(0 0 0 0)"};function A(s,i,o){return s[o]===null?1:i[o]===null||i[o]<s[o]?-1:i[o]>s[o]?1:0}function ae(s,i){return s==="desc"?(o,u)=>A(o,u,i):(o,u)=>-A(o,u,i)}function le({inputData:s,comparator:i,filterName:o}){console.log("========>>>filterName",o);const u=s.map((l,t)=>[l,t]);return u.sort((l,t)=>{const g=i(l[0],t[0]);return g!==0?g:l[1]-t[1]}),s=u.map(l=>l[0]),o&&(console.log("filterName...",o,"inputData...",s),s=s.filter(l=>{var t;return((t=l==null?void 0:l.name)==null?void 0:t.toLowerCase().indexOf(o.toLowerCase()))!==-1})),s}function R({order:s,orderBy:i,headLabel:o,onRequestSort:u}){const l=t=>g=>{u(g,t)};return e.jsx(G,{children:e.jsxs(y,{children:[e.jsx(h,{padding:"checkbox",children:" "}),o.map(t=>e.jsx(h,{align:t.align||"left",sortDirection:i===t.id?s:!1,sx:{width:t.width,minWidth:t.minWidth},children:e.jsxs(J,{hideSortIcon:!0,active:i===t.id,direction:i===t.id?s:"asc",onClick:l(t.id),children:[t.label,i===t.id?e.jsx(H,{sx:{...ie},children:s==="desc"?"sorted descending":"sorted ascending"}):null]})},t.id))]})})}R.propTypes={order:c.oneOf(["asc","desc"]),orderBy:c.string,headLabel:c.array,onRequestSort:c.func};function w({emptyRows:s,height:i}){return s?e.jsx(y,{sx:{...i&&{height:i*s}},children:e.jsx(h,{colSpan:9})}):null}w.propTypes={emptyRows:c.number,height:c.number};function ce(){const[s,i]=p.useState([]),[o,u]=p.useState(1),[l]=p.useState("asc"),[t,g]=p.useState([]),[k]=p.useState("name"),[f]=p.useState(""),[m]=p.useState(10),j=async()=>{var d;const n=localStorage.getItem("token");if(!n){console.error("No token found");return}try{const a=await E.get(`${B}message/get-notifications`,{headers:{Authorization:n}});i(((d=a==null?void 0:a.data)==null?void 0:d.data)||[])}catch(a){console.error("Error fetching user data:",a.message),alert(a.message)}};p.useEffect(()=>{j()},[]);const S=n=>{if(n.target.checked){const d=s.map(a=>a.name);g(d);return}g([])},T=(n,d)=>{const a=t.indexOf(d);let r=[];a===-1?r=r.concat(t,d):a===0?r=r.concat(t.slice(1)):a===t.length-1?r=r.concat(t.slice(0,-1)):a>0&&(r=r.concat(t.slice(0,a),t.slice(a+1))),g(r)},v=(n,d)=>{u(d)},x=le({inputData:s,comparator:ae(l,k),filterName:f}),D=!x.length&&!!f,I=Math.ceil(x.length/m),N=m-Math.min(m,x.length-(o-1)*m);return e.jsxs(se,{children:[e.jsx(P,{direction:"row",alignItems:"center",justifyContent:"space-between",mb:5,children:e.jsx(C,{variant:"h4",children:"Notifications"})}),e.jsxs(oe,{children:[e.jsx(_,{children:e.jsx(K,{sx:{overflow:"unset"},children:e.jsxs(Q,{sx:{minWidth:800},children:[e.jsx(R,{order:l,orderBy:k,rowCount:s.length,numSelected:t.length,onSelectAllClick:S,headLabel:[{id:"name",label:"Name"},{id:"email",label:"Email"},{id:"mobileNumber",label:"Mobile Number"},{id:"title",label:"Title"},{id:"type",label:"Type",align:"center"},{id:"action",label:"Action"}]}),e.jsxs(V,{children:[x.length?x.slice((o-1)*m,o*m).map(n=>{var d,a,r;return e.jsx(F,{name:(d=n==null?void 0:n.userId)==null?void 0:d.name,email:(a=n==null?void 0:n.userId)==null?void 0:a.email,mobileNumber:(r=n==null?void 0:n.userId)==null?void 0:r.mobileNumber,title:n.title,type:n.type,_id:n._id,avatarUrl:n.avatarUrl,userType:n.userType,selected:t.indexOf(n.name)!==-1,handleClick:b=>T(b,n.name),onModification:j},n._id)}):e.jsx(y,{children:e.jsx(h,{colSpan:6,align:"center",children:e.jsx("div",{style:{marginTop:"10%",fontWeight:"bold"},children:"No Data Found"})})}),e.jsx(w,{height:53,emptyRows:N}),D&&e.jsx(U,{query:f})]})]})})}),e.jsx(P,{alignItems:"center",mt:2,mb:2,children:e.jsx(re,{count:I,page:o,onChange:v,color:"primary"})})]})]})}function Te(){return e.jsxs(e.Fragment,{children:[e.jsx($,{children:e.jsx("title",{children:" Dashboard "})}),e.jsx(ce,{})]})}export{Te as default};
