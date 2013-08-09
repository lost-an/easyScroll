### HTML
``` html
<div class='scroll'>
  <ul>
    <li></li>
    <li></li>
  </ul>
</div>

OR
 
<div class='scroll'>
  <div>
    <p></p>
    <p></p>
  </div>
</div>
$(".scroll").Orz({content:div>p})
```

### javascript
``` javascript
$(".scroll").Orz();
```

### options
``` javascript
$(".scroll").Orz({
  marquee:false,
  lazy:false,
  wheel:false,
  info:false,
  vertical:false,
  button:true,
  auto:false,
  effect:"scroll",
  onMouse:"mouseover",
  delay:2000,
  loop:false,
  nav:false,
  all:false,
  content:"ul>li"
});

```
