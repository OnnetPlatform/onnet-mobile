import {
  BackdropBlur,
  Canvas,
  Fill,
  Shader,
  Skia,
  useClockValue,
  useComputedValue,
  useTouchHandler,
  useValue,
  vec,
} from '@shopify/react-native-skia';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { useColors } from '../../../Theme';

const source = Skia.RuntimeEffect.Make(`
uniform float4 colors[4];
uniform float2 center;
uniform float2 pointer;
uniform float clock;
const float4 black = vec4(0, 0, 0, 1);
struct Paint {
  float4 color;
  bool stroke;
  float strokeWidth;
};
float sdCircle(vec2 p, float r) {
  return length(p) - r;
}
float sdLine(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = saturate(dot(pa, ba) / dot(ba, ba));
  return length(pa - ba * h);
}
float4 draw(float4 color, float d, Paint paint) {
  bool isFill = !paint.stroke && d < 0;
  bool isStroke = paint.stroke && abs(d) < paint.strokeWidth/2;
  if (isFill || isStroke) {
    return paint.color;
  }
  return color;
}
float4 drawCircle(float4 color, float2 p, float radius, Paint paint) {
  float d = sdCircle(p, radius);
  return draw(color, d, paint);
}
float4 drawLine(float4 color, float2 p, float2 a, float2 b, Paint paint) {
  float d = sdLine(p, a, b);
  return draw(color, d, paint);
}
vec4 main(vec2 xy) {
  float4 color = black;
  float strokeWidth = 8;
  float radius = center.x - strokeWidth/2;
  Paint pointPaint = Paint(black, false, 0);
  Paint paint = Paint(colors[3], false, 0);
  float d = sdLine(xy, center, pointer);
  float offset = -clock * 0.08;
  float i = mod(floor((d + offset)/strokeWidth), 4);
  if (i == 0) {
    color = colors[0];
  } else if (i == 1) {
    color = colors[1];
  } else if (i == 2) {
    color = colors[2];
  } else if (i == 3) {
    color = colors[3];
  }
  return color; 
}
`)!;

export const Bones: React.FC = () => {
  const { width, height } = useWindowDimensions();
  const theme_colors = useColors();
  const colors = [theme_colors.blue, theme_colors.cyan, theme_colors.blue, theme_colors.cyan].map(
    (c) => Skia.Color(c)
  );

  const clock = useClockValue();
  const center = vec(width / 2, height / 2);
  const pointer = useValue(vec(height / 2, width / 2));
  const onTouch = useTouchHandler({
    onActive: (e) => {
      pointer.current = e;
    },
  });

  const uniforms = useComputedValue(
    () => ({ colors, center, pointer: pointer.current, clock: clock.current }),
    [pointer, clock]
  );

  return (
    <Canvas style={{ width, height }} onTouch={onTouch}>
      <Fill>
        <Shader source={source} uniforms={uniforms} />
      </Fill>
      {/* <BackdropBlur blur={100} blendMode={'difference'} /> */}
    </Canvas>
  );
};
