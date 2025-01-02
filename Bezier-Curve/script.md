# Border Lines
Thiss is a set of simple expressions that will position four lines at the edges of a rectangular layer and maintain their relationship to the rectangle as it moves and scales.

## Expressions
### Lower Horizontal
```javascript
m = thisComp.layer("master");
[width/2,m.position[1] + (m.height/2)*(m.scale[1]/100)]
