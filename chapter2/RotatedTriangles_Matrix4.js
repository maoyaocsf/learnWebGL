var VSHADER_SOURCE = 
    'attribute vec4 a_Position;\n'+
    'uniform mat4 u_xformMatrix;\n'+
    'void main(){\n'+
    '   gl_Position = u_xformMatrix * a_Position;\n'+
    '}\n';

var FSHADER_SOURCE = 
    'void main(){\n'+
    '   gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n'+
    '}\n';

var ANGLE = 90.0;

function main(){
    var canvas = document.getElementById('webgl');
    var gl = getWebGLContext(canvas);
    if(!gl){
        console.log('Failed to get the rendering context for WebGL');
        return;
    }
    if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
        console.log('Failed to initialize shaders');
        return
    }

    var n = initVertexBuffers(gl);
    
    // var rodian = Math.PI * ANGLE / 180.0;
    // var cosB = Math.cos(rodian),sinB = Math.sin(rodian);

    // var xformMatrix = new Float32Array([
    //     cosB,sinB,0.0,0.0,
    //     -sinB,cosB,0.0,0.0,
    //     0.0,0.0,1.0,0.0,
    //     0.0,0.0,0.0,1.0
    // ])
    var xformMatrix = new Matrix4();
    xformMatrix.setRotate(ANGLE,0,0,1);
    var u_xformMatrix = gl.getUniformLocation(gl.program,'u_xformMatrix');
    gl.uniformMatrix4fv(u_xformMatrix,false,xformMatrix.elements);

    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES,0,n);
};

function initVertexBuffers(gl){
    var vertices = new Float32Array([
        0.0,0.5, -0.5,-0.5, 0.5,-0.5
    ]);
    var n = 3;
    
    var vertexBuffer = gl.createBuffer();
    if(!vertexBuffer){
        console.log('Failed to create the buffer object');
        return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);

    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program,'a_Position');
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(a_Position);
    return n
}