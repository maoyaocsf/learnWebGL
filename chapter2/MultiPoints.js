var VSHADER_SOURCE = 
    'attribute vec4 a_Position;\n'+
    'void main(){\n'+
    '   gl_Position = a_Position;\n'+
    '   gl_PointSize = 10.0;\n'+
    '   }\n';

var FSHADER_SOURCE = 
    'void main(){\n'+
    '   gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n'+
    '}\n';

function main(){
    var canvas = document.getElementById('webgl');
    var gl = getWebGLContext(canvas);
    if(!gl){
        console.log('Failed to get the rendering context for WebGL');
        return
    };
    if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
        console.log('Failed to initialize shaders');
        return;
    }
    var n = initVertexBuffers(gl);
    if(n<0){
        console.log('Failed to set the positions of the vertices');
        return;
    }
    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS,0,n)
}
function initVertexBuffers(gl){
    var vertices = new Float32Array([
        0.0,0.5, -0.5,-0.5, 0.5,-0.5
    ]);
    var n = 3;
    //创建缓冲区对象
    var vertexBuffer = gl.createBuffer();
    if(!vertexBuffer){
        console.log('Failed to create the buffer object');
        return  -1;
    }; 
    //将缓冲区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);

    //向缓冲区对象中写入数据
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
    
    var a_Position = gl.getAttribLocation(gl.program,'a_Position');
    
    //将缓冲区对象分配给a_Position
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(a_Position);
    return n;

}
