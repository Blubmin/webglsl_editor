function Program(gl, vertex_shader, fragment_shader) {
    this.gl = gl;
    this.attributes = {}
    this.uniforms = {}
    
    this.loadShader = function(gl, source, type) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader)
        
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        
        return shader;
    }

    this.vert = this.loadShader(gl, vertex_shader, gl.VERTEX_SHADER);
    this.frag = this.loadShader(gl, fragment_shader, gl.FRAGMENT_SHADER);
    this.prog = null;
    
    this.initProgram = function(gl) {
        if (this.vert == null || this.frag == null) {
            return null;
        }

        const prog = gl.createProgram();
        gl.attachShader(prog, this.vert);
        gl.attachShader(prog, this.frag);
        gl.linkProgram(prog);
        
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
            console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
            return null;
        }
        
        for (var i = 0; i < gl.getProgramParameter(prog, gl.ACTIVE_ATTRIBUTES); ++i) {
            const attribute = gl.getActiveAttrib(prog, i);
            this.attributes[attribute.name] = attribute;
        }
        
        for (var i = 0; i < gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS); ++i) {
            const uniform = gl.getActiveUniform(prog, i);
            this.uniforms[uniform.name] = uniform;
        }
        
        return prog;
    }

    this.prog = this.initProgram(this.gl, this.vert, this.frag);
    
    this.bind = function() {
        this.gl.useProgram(this.prog);
    }
    
    this.getAttributeLocation = function(name) {
        return this.gl.getAttribLocation(this.prog, name);
    }
    
    this.getUniformLocation = function(name) {
        return this.gl.getUniformLocation(this.prog, name);
    }
}