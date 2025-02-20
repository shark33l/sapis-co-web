export const simulationVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const simulationFragmentShader = `
uniform sampler2D textureA;
uniform vec2 mouse;
uniform vec2 resolution;
uniform float time;
uniform int frame;
varying vec2 vUv;

const float delta = 1.4;

void main() {
  vec2 uv = vUv;
  if (frame == 0) {
    gl_FragColor = vec4(0.0);
    return;
  }

  vec4 data = texture2D(textureA, uv);
  float pressure = data.x;
  float pvel = data.y;

  vec2 texelSize = 1.0 / resolution;
  float p_right = texture2D(textureA, uv + vec2(texelSize.x, 0.0)).x;
  float p_left = texture2D(textureA, uv + vec2(-texelSize.x, 0.0)).x;
  float p_up = texture2D(textureA, uv + vec2(0.0, texelSize.y)).x;
  float p_down = texture2D(textureA, uv + vec2(0.0, -texelSize.y)).x;

  if (uv.x <= texelSize.x) p_left = p_right;
  if (uv.x >= 1.0 - texelSize.x) p_right = p_left;
  if (uv.y < texelSize.y) p_down = p_up;
  if (uv.y >= 1.0 - texelSize.y) p_up = p_down;

  pvel += delta * (-2.0 * pressure + p_right + p_left) / 4.0;
  pvel += delta * (-2.0 * pressure + p_up + p_down) / 4.0;
  
  pressure += delta * pvel;
  pvel -= 0.005 * delta * pressure;
  pvel *= 1.0 - 0.002 * delta;
  pressure *= 0.999;

  vec2 mouseUV = mouse / resolution;
  if (mouse.x > 0.0) {
    float dist = distance(uv, mouseUV);
    if (dist <= 0.02) {
      pressure += 2.0 * (1.0 - dist / 0.02);
    }
  }

  gl_FragColor = vec4(pressure, pvel, (p_right - p_left) / 2.0, (p_up - p_down) / 2.0);
}
`;

export const renderVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const renderFragmentShader = `
uniform sampler2D textureA;
uniform sampler2D textureB;
varying vec2 vUv;

void main() {
  vec4 data = texture2D(textureA, vUv);
  vec2 distortion = 0.3 * data.zw;
  vec4 color = texture2D(textureB, vUv + distortion);
  
  vec3 normal = normalize(vec3(-data.z * 2.0, 0.5, -data.w * 2.0));
  vec3 lightDir = normalize(vec3(-3.0, 10.0, 3.0));
  float specular = pow(max(0.0, dot(normal, lightDir)), 60.0) * 1.5;
  
  gl_FragColor = color + vec4(specular);
}
`;

export const rippleVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const rippleFragmentShader = `
    uniform float time;
    uniform vec2 resolution;
    uniform vec2 mouse;
    uniform vec3 colorA;
    uniform vec3 colorB;
    uniform sampler2D textureA;
    uniform sampler2D textureB;
    varying vec2 vUv;
    
    void main() {
      vec2 uv = gl_FragCoord.xy / resolution.xy;
      vec2 mouse_norm = mouse / resolution;  // Convert mouse to normalized UV space

      // Calculate distance from current pixel to mouse position
      float dist = length(uv - mouse_norm);
      
      // Create a smoother ripple effect
      float ripple = sin(dist * 10.0 - time * 3.0) * 0.5 + 0.5;
      ripple *= exp(-dist * 1.0); // Softer distance falloff
      
      // Base liquid movement
      float noise1 = sin(uv.x * 10.0 + time) * 0.5 + 0.5;
      float noise2 = cos(uv.y * 8.0 - time * 0.5) * 0.5 + 0.5;
      float noise3 = sin((uv.x + uv.y) * 5.0 + time * 0.7) * 0.5 + 0.5;
      
      float mixValue = noise1 * noise2 * noise3;
      mixValue = mixValue + ripple * 0.8; // Enhance ripple effect
      mixValue = smoothstep(0.2, 0.8, mixValue);
      
      vec3 color = mix(colorA, colorB, mixValue);

      // Mix from render
      vec4 data = texture2D(textureA, vUv);
      vec2 distortion = 0.3 * data.zw;
      vec4 colorV4 = vec4(color, 1.0);
  
      vec3 normal = normalize(vec3(-data.z * 2.0, 0.5, -data.w * 2.0));
      vec3 lightDir = normalize(vec3(-3.0, 10.0, 3.0));
      float specular = pow(max(0.0, dot(normal, lightDir)), 60.0) * 1.5;
  
      gl_FragColor = colorV4 + vec4(specular);
    }
    `
