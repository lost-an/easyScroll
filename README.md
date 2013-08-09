### HTML:
``` html
<div class='scroll'>
  <ul>
    <li></li>
    <li></li>
  </ul>
</div>

OR
 
<div id='special'>
  <div>
    <p></p>
    <p></p>
  </div>
</div>
```
### JS
``` javascript
$(".scroll").Orz();
$("#special").Orz({
  wheel:true,
  info:true,
  loop:true
});
```
### OPTIONS:
``` javascript
{
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
  content:"ul>li" //'div>p'
}
```
### CSS
```css
you can make it on you own
```

### DEMO
xxxxxx



