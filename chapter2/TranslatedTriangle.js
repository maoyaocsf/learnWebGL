var VSHADER_SOURCE = 
    'attribute vec4 a_Position;\n'+
    'uniform vec4 u_Translation;\n'+
    'void main(){\n'+
    '   gl_Position = a_Position + u_Translation;\n'+
    '   }\n';

var FSHADER_SOURCE =
    'void main(){\n'+
    '   gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n'+
    '}\n';

var Tx = 0.5, Ty = 0.5, Tz = 0.0;

function main(){
    var canvas = document.getElementById('webgl');
    var gl =  getWebGLContext(canvas);
    if(!gl){
        console.log('Failed to get the rendering context for WebGL');
        return;
    }
    if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
        console.log('Failed to initialize shaders');
        return;
    }
    var n = initVertexBuffers(gl);
    console.log(n)
    if(n<0){
        console.log('Failed to set the position of the vertices');
        return;
    }
    //将平移距离传输给定点着色器
    var u_Translation = gl.getUniformLocation(gl.program,'u_Translation');
    gl.uniform4f(u_Translation,Tx,Ty,Tz,0.0)
    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES,0,n);
}
function initVertexBuffers(gl){
    var vertices = new Float32Array([
        0.0,0.5, -0.5,-0.5, 0.5,-0.5
    ]);
    var n = 3;
    //创建缓冲区对象
    var vertexBuffer = gl.createBuffer();
    if(!vertexBuffer){
        console.log('Failed to create buffer object')
        return -1;
    }
    //将缓冲区对象绑定到目标对象上（只能向目标对象赋值）
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
    //向目标对象绑定数据
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
    //找到attrib变量的位置
    var a_Position = gl.getAttribLocation(gl.program,'a_Position');
    //将缓冲区对象分配给a_Position
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0)
    gl.enableVertexAttribArray(a_Position);
    return n;
}