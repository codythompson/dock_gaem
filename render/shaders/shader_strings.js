(function (scope) {
var vert = {};
var frag = {};
vert['tiles'] = ''
+ 'attribute vec2 aVertPos;'
+ 'attribute vec2 aUV;'
+ ''
+ 'varying highp vec2 vUV;'
+ ''
+ 'void main() {'
+ 'gl_Position = aVertPos;'
+ 'vUV = aUV;'
+ '}'
;
frag['tiles'] = ''
+ 'varying highp vec2 vUV;'
+ ''
+ 'uniform sampler2D uSampler;'
+ ''
+ 'void main() {'
+ 'gl_FragColor = texture2D(uSampler, vec2(vUV.s, vUV.t));'
+ '}'
;
scope.$dock.render.shader_sources = \{vert: vert, frag: frag \}\;
})(this);\n
