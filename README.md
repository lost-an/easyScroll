## if you want to scroll some elements , use it--20138-12

#### HTML:
``` html
<div class='default'>
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
#### Javascript
``` javascript
$(".default").Orz();
$("#special").Orz({
  wheel:true,
  info:true,
  loop:true
});
```
### ALL OPTIONS
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
/* make it on you own */
```

### DEMO
xxxxxx



