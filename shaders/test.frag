var test_frag = `#version 300 es

precision highp float;

in vec3 color; 
in vec3 position;

out vec4 final_color;

void main() {
    vec3 dx = dFdx(position).xyz;
    vec3 dy = dFdy(position).xyz;
    vec3 norm = normalize(cross(dx, dy));

    vec3 diffuse = color * max(dot(-normalize(position), norm), 0.0);

    final_color = vec4(diffuse, 1);
}
`;