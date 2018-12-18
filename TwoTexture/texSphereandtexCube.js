

var canvas;
var gl;
var m = mat4();
var numTimesToSubdivide = 4;
var numVertices = 36;
var index = 0;

var pointsArray = [];
var texCoordsArray = [];
var vTexCoord;
var vTexCoord2;//body

var near = -10;
var far = 10;
var radius = 1.0;
var theta  = 0.0;
var phi    = 0.0;
var dr = 5.0 * Math.PI/180.0;

var left = -3.0;
var right = 3.0;
var ytop =3.0;
var bottom = -3.0;

var va = vec4(0.0, 0.0, -1.0,1);
var vb = vec4(0.0, 0.942809, 0.333333, 1);
var vc = vec4(-0.816497, -0.471405, 0.333333, 1);
var vd = vec4(0.816497, -0.471405, 0.333333,1);

var progrm;

var ctm;

var texCoord = [
    vec2(0, 0),
    vec2(0, 1),
    vec2(1, 1),
    vec2(1, 0)
];

////
var vBody=[
    vec4(-1, -1, 1, 1.0),
    vec4(-1, 1, 1, 1.0),
    vec4(1, 1, 1, 1.0),
    vec4(1, -1, 1, 1.0),
    vec4(-1, -1, -1, 1.0),
    vec4(-1, 1, -1, 1.0),
    vec4(1, 1, -1, 1.0),
    vec4(1, -1, -1, 1.0)];
function quad2(a, b, c, d) {
    pointsArray.push(vBody[a]);
    texCoordsArray.push(texCoord[0]);

    pointsArray.push(vBody[b]);
    texCoordsArray.push(texCoord[1]);

    pointsArray.push(vBody[c]);
    texCoordsArray.push(texCoord[2]);

    pointsArray.push(vBody[a]);
    texCoordsArray.push(texCoord[0]);

    pointsArray.push(vBody[c]);
    texCoordsArray.push(texCoord[2]);

    pointsArray.push(vBody[d]);
    texCoordsArray.push(texCoord[3]);
}



function texCube2() {
   quad2(1, 0, 3, 2);
   quad2(2, 3, 7, 6);
    quad2(3, 0, 4, 7);
    quad2(6, 5, 1, 2);
    quad2(4, 5, 6, 7);
    quad2(5, 4, 0, 1);

}
////
var vertices = [
    vec4(-1, -1, 1, 1.0),
    vec4(-1, 1, 1, 1.0),
    vec4(1, 1, 1, 1.0),
    vec4(1, -1, 1, 1.0),
    vec4(-1, -1, -1, 1.0),
    vec4(-1, 1, -1, 1.0),
    vec4(1, 1, -1, 1.0),
    vec4(1, -1, -1, 1.0)
];

function quad(a, b, c, d) {
    pointsArray.push(vertices[a]);
    texCoordsArray.push(texCoord[0]);

    pointsArray.push(vertices[b]);
    texCoordsArray.push(texCoord[1]);

    pointsArray.push(vertices[c]);
    texCoordsArray.push(texCoord[2]);

    pointsArray.push(vertices[a]);
    texCoordsArray.push(texCoord[0]);

    pointsArray.push(vertices[c]);
    texCoordsArray.push(texCoord[2]);

    pointsArray.push(vertices[d]);
    texCoordsArray.push(texCoord[3]);
}



function texCube() {
   quad(1, 0, 3, 2);
   quad(2, 3, 7, 6);
    quad(3, 0, 4, 7);
    quad(6, 5, 1, 2);
    quad(4, 5, 6, 7);
    quad(5, 4, 0, 1);

}

function configureTexture0( image ) {//球
    texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);

    gl.bindTexture( gl.TEXTURE_2D, texture );
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB,
         gl.RGB, gl.UNSIGNED_BYTE, image );
    gl.generateMipmap( gl.TEXTURE_2D );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
                      gl.NEAREST_MIPMAP_LINEAR );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );

    gl.uniform1i(gl.getUniformLocation(program, "texture0"), 0);
}

function configureTexture1(image) {
    texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE1);

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB,
         gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
                      gl.NEAREST_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.uniform1i(gl.getUniformLocation(program, "texture1"), 1);
}
//////////////////////////////////////////////body test
function configureTexture2(image) {
    texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE2);

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB,
         gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
                      gl.NEAREST_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.uniform1i(gl.getUniformLocation(program, "texture2"), 2);
}

var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;

var eye;
var at = vec3(0.0, 0.0, 0.0);
var up = vec3(0.0, 1.0, 0.0);

function triangle(a, b, c) {



     pointsArray.push(a);
     pointsArray.push(b);
     pointsArray.push(c);

     // normals are vectors

     index += 3;

}


function divideTriangle(a, b, c, count) {
    if ( count > 0 ) {

        var ab = mix( a, b, 0.5);
        var ac = mix( a, c, 0.5);
        var bc = mix( b, c, 0.5);

        ab = normalize(ab, true);
        ac = normalize(ac, true);
        bc = normalize(bc, true);

        divideTriangle( a, ab, ac, count - 1 );
        divideTriangle( ab, b, bc, count - 1 );
        divideTriangle( bc, c, ac, count - 1 );
        divideTriangle( ab, bc, ac, count - 1 );
    }
    else {
        triangle( a, b, c );
    }
}


function tetrahedron(a, b, c, d, n) {
    divideTriangle(a, b, c, n);
    divideTriangle(d, c, b, n);
    divideTriangle(a, d, b, n);
    divideTriangle(a, c, d, n);
}

window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

//先绘制cube
    texCube();
//后绘制球
    tetrahedron(va, vb, vc, vd, numTimesToSubdivide);
    //body
    texCube2();

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation( program, "vPosition");
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    projectionMatrixLoc = gl.getUniformLocation(program, "projectionMatrix");

    var tBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(texCoordsArray), gl.STATIC_DRAW);

    vTexCoord = gl.getAttribLocation(program, "vTexCoord");
    gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vTexCoord);

    document.getElementById("Button0").onclick = function(){radius *= 2.0;};
    document.getElementById("Button1").onclick = function(){radius *= 0.5;};
    document.getElementById("Button2").onclick = function(){theta += dr;};
    document.getElementById("Button3").onclick = function(){theta -= dr;};
    document.getElementById("Button4").onclick = function(){phi += dr;};
    document.getElementById("Button5").onclick = function(){phi -= dr;};

    document.getElementById("Button6").onclick = function(){
        numTimesToSubdivide++;
        index = 0;
        pointsArray = [];
        init();
    };
    document.getElementById("Button7").onclick = function(){
        if(numTimesToSubdivide) numTimesToSubdivide--;
        index = 0;
        pointsArray = [];
        init();
    };

    //球
    var image0 = document.getElementById("texImage");

    configureTexture0(image0);

    var image1 = document.getElementById("texImageBackGround");

    configureTexture1(image1);
    //body
    var image2 = document.getElementById("texImageBackGround2");

    configureTexture2(image2);



    render();
}



function render() {

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    eye = vec3(radius * Math.sin(theta) * Math.cos(phi),
        radius * Math.sin(theta) * Math.sin(phi), radius * Math.cos(theta));

    //背景
    modelViewMatrix = lookAt(eye, at, up);
    projectionMatrix = ortho(left, right, bottom, ytop, near, far);


    m = translate(0.0, -4.0, 0.0);
    modelViewMatrix = mult(modelViewMatrix, m);
    m = rotate(45, 1.0, 1.0, 0.0);
    modelViewMatrix = mult(modelViewMatrix, m);
    m = scalem(2.5, 2.5, 2.5);
    modelViewMatrix = mult(modelViewMatrix, m);

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));

    gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"), 1);
    gl.activeTexture(gl.TEXTURE0);
    gl.enableVertexAttribArray(vTexCoord);

    gl.drawArrays(gl.TRIANGLES, 0, numVertices);

    //body
    modelViewMatrix = lookAt(eye, at, up);
    projectionMatrix = ortho(left, right, bottom, ytop, near, far);

    m = translate(0.5, 0.0, 0.0);
    modelViewMatrix = mult(modelViewMatrix, m);
    m = rotate(15, 3.0, 1.0, 0.0);
    modelViewMatrix = mult(modelViewMatrix, m);
    m = scalem(0.5, 0.5, 0.5);
    modelViewMatrix = mult(modelViewMatrix, m);

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));

    gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"), 2);
    gl.activeTexture(gl.TEXTURE2);
    gl.enableVertexAttribArray(vTexCoord2);

    gl.drawArrays(gl.TRIANGLES, 0, numVertices);

    //球
    modelViewMatrix = lookAt(eye, at, up);
    projectionMatrix = ortho(left, right, bottom, ytop, near, far);

    m = translate(-1.0, 0.0, 0.0);
    modelViewMatrix = mult(m, modelViewMatrix);

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));

    gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"), 0);

    gl.activeTexture(gl.TEXTURE1);
    gl.disableVertexAttribArray(vTexCoord);

    for( var i=0; i<index; i+=3)
        gl.drawArrays(gl.TRIANGLES, i + numVertices, 3);


    window.requestAnimFrame(render);
}
