import{_ as a,c as e,a2 as i,o as t}from"./chunks/framework.O55dUdwi.js";const u=JSON.parse('{"title":"Out of the box types","description":"","frontmatter":{},"headers":[],"relativePath":"branded-types/out-of-the-box-types.md","filePath":"branded-types/out-of-the-box-types.md"}'),n={name:"branded-types/out-of-the-box-types.md"};function l(p,s,r,h,o,d){return t(),e("div",null,s[0]||(s[0]=[i(`<h1 id="out-of-the-box-types" tabindex="-1">Out of the box types <a class="header-anchor" href="#out-of-the-box-types" aria-label="Permalink to &quot;Out of the box types&quot;">​</a></h1><p>As discussed in the previous section, we can compose simpler types into more complex ones. So you don&#39;t have to create simple types like <code>Integer</code> for every code base, Unwrap gives you some types out of the box.</p><p>If you want us to add more please let us know in our <a href="https://github.com/DrKillshot/unwrap/issues" target="_blank" rel="noreferrer">GitHub issues</a> page.</p><h2 id="numbers" tabindex="-1">Numbers <a class="header-anchor" href="#numbers" aria-label="Permalink to &quot;Numbers&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Brand } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;@unnullable/unwrap&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Brand.Number.Integer </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Integer type</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Brand.Number.Float </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Float type</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Brand.Number.Positive </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Positive number</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Brand.Number.Negative </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Negative number</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Brand.Number.NonNegative </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Number greater or equal to zero</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Brand.Number.Digit </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Number between 0 and 10</span></span></code></pre></div><h2 id="strings" tabindex="-1">Strings <a class="header-anchor" href="#strings" aria-label="Permalink to &quot;Strings&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Brand.String.NotEmpty </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// String with at least one non white space</span></span></code></pre></div><h2 id="nullable" tabindex="-1">Nullable <a class="header-anchor" href="#nullable" aria-label="Permalink to &quot;Nullable&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Brand.Nullable.NotNullable </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Not equal to null or undefined</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Brand.Nullable.NotNull </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Not equal to null</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Brand.Nullable.NotUndefined </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Not equal to undefined</span></span></code></pre></div>`,9)]))}const c=a(n,[["render",l]]);export{u as __pageData,c as default};