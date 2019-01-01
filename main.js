var prog = undefined;

function main() {
    const canvas = document.querySelector("canvas");
    
    const gl = canvas.getContext("webgl2");
    
    
    if (gl === null) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }
     
    gl.clearColor(0.6, 0.6, 0.6, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    gl.frontFace(gl.CCW);
    prog = new Program(gl, test_vert, test_frag);

    const positionBuffer = gl.createBuffer();

    const positions = [
        -1,  1,  1,
         1,  1,  1,
        -1, -1,  1,
         1, -1,  1,
        -1,  1, -1,
         1,  1, -1,
        -1, -1, -1,
         1, -1, -1
    ];

    const colors = [
        0, 1, 1, // 0 cyan
        1, 1, 1, // 1 white
        0, 0, 1, // 2 blue
        1, 0, 1, // 3 magenta
        0, 1, 0, // 4 green
        1, 1, 0, // 5 yellow
        0, 0, 0, // 6 black
        1, 0, 0  // 7 red
    ];

    const indices = [
        2, 1, 0, 
        3, 1, 2, 
        4, 5, 6,
        6, 5, 7,
        7, 3, 2,
        6, 7, 2,
        3, 7, 5, 
        1, 3, 5, 
        1, 5, 4,  
        0, 1, 4, 
        0, 4, 6, 
        2, 0, 6  
    ];

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    gl.vertexAttribPointer(prog.getAttributeLocation("aVertexPosition"), 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(prog.getAttributeLocation("aVertexPosition"));

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    gl.vertexAttribPointer(prog.getAttributeLocation("aVertexColor"), 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(prog.getAttributeLocation("aVertexColor"));
    
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(indices), gl.STATIC_DRAW);

    function drawScene(now) {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        prog.bind();
        var projection = mat4.create();
        mat4.perspective(projection, 45.0 * Math.PI / 180.0, gl.canvas.clientWidth / gl.canvas.clientHeight, 0.1, 100.0);
        var mv = mat4.create();
        mat4.translate(mv, mv, [0, 0, -6]);
        mat4.rotateY(mv, mv, cube_rotation * Math.PI / 180);
        mat4.rotateX(mv, mv, 35 * Math.PI / 180);
        mat4.rotateZ(mv, mv, 45 * Math.PI / 180);
        var view = mat4.create();
        
        gl.uniformMatrix4fv(prog.getUniformLocation("uModelMatrix"), false, mv);
        gl.uniformMatrix4fv(prog.getUniformLocation("uViewMatrix"), false, view);
        gl.uniformMatrix4fv(prog.getUniformLocation("uProjectionMatrix"), false, projection)
        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_INT, 0);

        requestAnimationFrame(drawScene);
    }

    requestAnimationFrame(drawScene);
}
