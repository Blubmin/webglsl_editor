var test_vert = `#version 300 es

in vec3 aVertexPosition;
in vec3 aVertexColor;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;

out vec3 color;
out vec3 position;

void main() {
    color = aVertexColor;
    position = (uModelMatrix * vec4(aVertexPosition, 1)).xyz;
    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1);
}
`;