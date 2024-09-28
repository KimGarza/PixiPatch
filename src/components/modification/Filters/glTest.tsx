// import React from 'react';
// import { GLView } from 'expo-gl';
// import { PixelRatio } from 'react-native';
// import { Asset } from 'expo-asset';
// import { Surface } from 'gl-react-expo';
// import { Node, Shaders, GLSL } from 'gl-react';

// const shaders = Shaders.create({
//   // Custom shader for HSB and contrast adjustments
//   ImageFilter: {
//     frag: GLSL`
//     precision highp float;
//     varying vec2 uv;
//     uniform sampler2D t;
//     uniform float hue;
//     uniform float saturation;
//     uniform float brightness;
//     uniform float contrast;

//     vec3 rgb2hsv(vec3 c) {
//       vec4 K = vec4(0.0, -1.0/3.0, 2.0/3.0, -1.0);
//       vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
//       vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
//       float d = q.x - min(q.w, q.y);
//       float e = 1.0e-10;
//       return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
//     }

//     vec3 hsv2rgb(vec3 c) {
//       vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
//       vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
//       return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
//     }

//     void main() {
//       vec4 color = texture2D(t, uv);
//       vec3 hsv = rgb2hsv(color.rgb);

//       // Adjust Hue
//       hsv.x += hue;
//       // Adjust Saturation
//       hsv.y *= saturation;
//       // Adjust Brightness
//       hsv.z *= brightness;

//       // Convert back to RGB
//       vec3 rgb = hsv2rgb(hsv);

//       // Apply Contrast
//       rgb = (rgb - 0.5) * contrast + 0.5;

//       gl_FragColor = vec4(rgb, color.a);
//     }
//     `,
//   },
// });

// const ImageFilter = ({ hue, saturation, brightness, contrast, imageUri }) => (
//   <Surface style={{ width: '100%', height: '100%' }}>
//     <Node
//       shader={shaders.ImageFilter}
//       uniforms={{
//         t: imageUri,
//         hue,
//         saturation,
//         brightness,
//         contrast,
//       }}
//     />
//   </Surface>
// );

// export default function App() {
//   return (
//     <GLView
//       style={{ flex: 1 }}
//       onContextCreate={async (gl) => {
//         const pixelRatio = PixelRatio.get();
//         const width = gl.drawingBufferWidth / pixelRatio;
//         const height = gl.drawingBufferHeight / pixelRatio;
//         const asset = Asset.fromModule(require('./path/to/image.jpg'));
//         await asset.downloadAsync();

//         return (
//           <ImageFilter
//             hue={0.5}
//             saturation={1.2}
//             brightness={1.1}
//             contrast={1.3}
//             imageUri={asset.localUri}
//           />
//         );
//       }}
//     />
//   );
// }
