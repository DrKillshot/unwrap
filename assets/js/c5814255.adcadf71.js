"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[362],{2241:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>E,contentTitle:()=>T,default:()=>S,frontMatter:()=>N,metadata:()=>A,toc:()=>_});var a=r(4848),n=r(8453),l=r(6540),s=r(4164),u=r(3104),i=r(6347),o=r(205),c=r(7485),d=r(1682),p=r(679);function b(e){return l.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,l.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function m(e){const{values:t,children:r}=e;return(0,l.useMemo)((()=>{const e=t??function(e){return b(e).map((e=>{let{props:{value:t,label:r,attributes:a,default:n}}=e;return{value:t,label:r,attributes:a,default:n}}))}(r);return function(e){const t=(0,d.XI)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,r])}function h(e){let{value:t,tabValues:r}=e;return r.some((e=>e.value===t))}function f(e){let{queryString:t=!1,groupId:r}=e;const a=(0,i.W6)(),n=function(e){let{queryString:t=!1,groupId:r}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!r)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return r??null}({queryString:t,groupId:r});return[(0,c.aZ)(n),(0,l.useCallback)((e=>{if(!n)return;const t=new URLSearchParams(a.location.search);t.set(n,e),a.replace({...a.location,search:t.toString()})}),[n,a])]}function g(e){const{defaultValue:t,queryString:r=!1,groupId:a}=e,n=m(e),[s,u]=(0,l.useState)((()=>function(e){let{defaultValue:t,tabValues:r}=e;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!h({value:t,tabValues:r}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${r.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const a=r.find((e=>e.default))??r[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:t,tabValues:n}))),[i,c]=f({queryString:r,groupId:a}),[d,b]=function(e){let{groupId:t}=e;const r=function(e){return e?`docusaurus.tab.${e}`:null}(t),[a,n]=(0,p.Dv)(r);return[a,(0,l.useCallback)((e=>{r&&n.set(e)}),[r,n])]}({groupId:a}),g=(()=>{const e=i??d;return h({value:e,tabValues:n})?e:null})();(0,o.A)((()=>{g&&u(g)}),[g]);return{selectedValue:s,selectValue:(0,l.useCallback)((e=>{if(!h({value:e,tabValues:n}))throw new Error(`Can't select invalid tab value=${e}`);u(e),c(e),b(e)}),[c,b,n]),tabValues:n}}var v=r(2303);const y={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function w(e){let{className:t,block:r,selectedValue:n,selectValue:l,tabValues:i}=e;const o=[],{blockElementScrollPositionUntilNextRender:c}=(0,u.a_)(),d=e=>{const t=e.currentTarget,r=o.indexOf(t),a=i[r].value;a!==n&&(c(t),l(a))},p=e=>{let t=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const r=o.indexOf(e.currentTarget)+1;t=o[r]??o[0];break}case"ArrowLeft":{const r=o.indexOf(e.currentTarget)-1;t=o[r]??o[o.length-1];break}}t?.focus()};return(0,a.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.A)("tabs",{"tabs--block":r},t),children:i.map((e=>{let{value:t,label:r,attributes:l}=e;return(0,a.jsx)("li",{role:"tab",tabIndex:n===t?0:-1,"aria-selected":n===t,ref:e=>o.push(e),onKeyDown:p,onClick:d,...l,className:(0,s.A)("tabs__item",y.tabItem,l?.className,{"tabs__item--active":n===t}),children:r??t},t)}))})}function x(e){let{lazy:t,children:r,selectedValue:n}=e;const u=(Array.isArray(r)?r:[r]).filter(Boolean);if(t){const e=u.find((e=>e.props.value===n));return e?(0,l.cloneElement)(e,{className:(0,s.A)("margin-top--md",e.props.className)}):null}return(0,a.jsx)("div",{className:"margin-top--md",children:u.map(((e,t)=>(0,l.cloneElement)(e,{key:t,hidden:e.props.value!==n})))})}function j(e){const t=g(e);return(0,a.jsxs)("div",{className:(0,s.A)("tabs-container",y.tabList),children:[(0,a.jsx)(w,{...t,...e}),(0,a.jsx)(x,{...t,...e})]})}function I(e){const t=(0,v.A)();return(0,a.jsx)(j,{...e,children:b(e.children)},String(t))}const V={tabItem:"tabItem_Ymn6"};function k(e){let{children:t,hidden:r,className:n}=e;return(0,a.jsx)("div",{role:"tabpanel",className:(0,s.A)(V.tabItem,n),hidden:r,children:t})}r(1432);const N={title:"Getting started",sidebar_label:"Getting started",sidebar_position:1},T=void 0,A={id:"library/getting-started",title:"Getting started",description:"To start using Unwrap, you can install it via npm or yarn. In your console:",source:"@site/docs/library/getting-started.md",sourceDirName:"library",slug:"/library/getting-started",permalink:"/unwrap/docs/library/getting-started",draft:!1,unlisted:!1,editUrl:"https://github.com/DrKillshot/unwrap/docs/library/getting-started.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{title:"Getting started",sidebar_label:"Getting started",sidebar_position:1},sidebar:"docs",previous:{title:"Learn",permalink:"/unwrap/docs/category/learn"},next:{title:"Monads",permalink:"/unwrap/docs/category/monads"}},E={},_=[];function q(e){const t={code:"code",p:"p",pre:"pre",...(0,n.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.p,{children:"To start using Unwrap, you can install it via npm or yarn. In your console:"}),"\n",(0,a.jsxs)(I,{children:[(0,a.jsx)(k,{value:"npm",label:"npm",default:!0,children:(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-sh",metastring:'edit title="Npm installation"',children:"npm install @unnullable/unwrap\n"})})}),(0,a.jsx)(k,{value:"yarn",label:"yarn",children:(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-sh",metastring:'edit title="Yarn installation"',children:"yarn add @unnullable/unwrap\n"})})}),(0,a.jsx)(k,{value:"pnpm",label:"pnpm",children:(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-sh",metastring:'edit title="Pnpm installation"',children:"pnpm add @unnullable/unwrap\n"})})})]})]})}function S(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(q,{...e})}):q(e)}}}]);