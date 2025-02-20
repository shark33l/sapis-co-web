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
  
  // Debug visualization
  vec2 mouseUV = mouse / resolution;
  float mouseDot = smoothstep(0.02, 0.01, distance(uv, mouseUV));
  
  if (frame == 0) {
    // Initialize with debug grid
    vec2 grid = step(vec2(0.1), fract(uv * 10.0));
    float debugGrid = 1.0 - (grid.x * grid.y) * 0.1;
    gl_FragColor = vec4(debugGrid * 0.1);
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

  // Enhanced mouse visualization
  // In your simulationFragmentShader, replace the mouse interaction part with:
vec2 mouseUV = mouse / resolution;
float mouseRadius = 0.05; // Increased radius for visibility

// Add clear debug visualization
vec4 debugColor = vec4(0.0);
if (mouse.x > 0.0) {
    float dist = distance(uv, mouseUV);
    if (dist <= mouseRadius) {
        pressure += 2.0 * (1.0 - dist / mouseRadius);
        debugColor = vec4(1.0, 0.0, 0.0, 1.0) * (1.0 - dist / mouseRadius);
    }
}

gl_FragColor = vec4(pressure, pvel,
    (p_right - p_left) / 2.0,
    (p_up - p_down) / 2.0) + debugColor;

  
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
  
  // Show debug grid and mouse position more clearly
  vec3 normal = normalize(vec3(-data.z * 2.0, 0.5, -data.w * 2.0));
  vec3 lightDir = normalize(vec3(-3.0, 10.0, 3.0));
  float specular = pow(max(0.0, dot(normal, lightDir)), 60.0) * 1.5;
  
  // Make the debug visualization more visible
  if (data.x > 0.5) {  // This will show the mouse position in red
    color = mix(color, vec4(1.0, 0.0, 0.0, 1.0), 0.5);
  }
  
  gl_FragColor = color + vec4(specular);
}
`;