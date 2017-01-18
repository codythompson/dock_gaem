attribute vec2 aVertPos;
attribute vec2 aUV;

varying highp vec2 vUV;

void main() {
  gl_Position = aVertPos;
  vUV = aUV;
}
