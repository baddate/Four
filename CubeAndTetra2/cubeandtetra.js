"use strict";
var program;
var texCoordsArray = [];
var colorsArray = [];
var pointsArray1 = [];
var texture;
var vTexCoord;
var tBuffer;
var texCoord = [

    vec2(0, 0),
    vec2(0, 1),
    vec2(1, 1),
    vec2(1, 0)



];
function configureTexture( image ) {
    texture = gl.createTexture();
    gl.bindTexture( gl.TEXTURE_2D, texture );
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB,
         gl.RGB, gl.UNSIGNED_BYTE, image );
    gl.generateMipmap( gl.TEXTURE_2D );
    //gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR );
    //gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
// Prevents s-coordinate wrapping (repeating).
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
// Prevents t-coordinate wrapping (repeating).
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.uniform1i(gl.getUniformLocation(program, "texture"), 0);
}


function quad1(a, b, c, d) {
     pointsArray1.push(vertices[a]);
     colorsArray.push(vertexColors[a]);
     texCoordsArray.push(texCoord[0]);

     pointsArray1.push(vertices[b]);
     colorsArray.push(vertexColors[a]);
     texCoordsArray.push(texCoord[1]);

     pointsArray1.push(vertices[c]);
     colorsArray.push(vertexColors[a]);
     texCoordsArray.push(texCoord[2]);

     pointsArray1.push(vertices[a]);
     colorsArray.push(vertexColors[a]);
     texCoordsArray.push(texCoord[0]);

     pointsArray1.push(vertices[c]);
     colorsArray.push(vertexColors[a]);
     texCoordsArray.push(texCoord[2]);

     pointsArray1.push(vertices[d]);
     colorsArray.push(vertexColors[a]);
     texCoordsArray.push(texCoord[3]);
}


function colorCube1()
{
    quad1( 1, 0, 3, 2 );
    quad1( 2, 3, 7, 6 );
    quad1( 3, 0, 4, 7 );
    quad1( 6, 5, 1, 2 );
    quad1( 4, 5, 6, 7 );
    quad1( 5, 4, 0, 1 );
}
///
var canvas;
var gl;
var projectionMatrix, projectionMatrixLoc;
var eye;
var at;
const up = vec3(0.0, 1.0, 0.0);
var near = 0.5;
var far = 10.0;
var radius = 4.0;
var theta  = 0.0;
var phi    = 0.0;
var dr = 5.0 * Math.PI/180.0;

var  fovy = 45.0;  // Field-of-view in Y direction angle (in degrees)
var  aspect;       // Viewport aspect ratio

var EyeZ=7.0;
var EyeY=0.0;
var EyeX=-0.5;
var atX=1.5;
var alpha=0.0;

var normalsArray = [];
var lightZ=10.0;
var lightY=0.0;
var lightX=0.0;
var lightBuffer;
    var lightvertices = [
        vec3(lightX+0.65, lightY+0.1, lightZ),
        vec3(lightX+0.65, lightY-0.1, lightZ),
        vec3(lightX-0.65, lightY+0.1, lightZ)];

var lightPosition, lightPositionLoc;
var lightAmbient = vec4(0.2, 0.2, 0.2, 1.0 );
var lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
var lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );

var materialAmbient = vec4( 1.0, 0.0, 1.0, 1.0 );
var materialDiffuse = vec4( 1.0, 0.8, 0.0, 1.0);
var materialSpecular = vec4( 1.0, 0.8, 0.0, 1.0 );
var materialShininess = 100.0;
var ambientColor, diffuseColor, specularColor;
var ambientProduct, diffuseProduct, specularProduct;

////////////////
var numVertices  = 36;
var modelViewMatrix,modelViewMatrixLoc;
var iBufferCubeID, cBufferCubeID, vBufferCubeID;
var cBufferTetraID, vBufferTetraID;
var cBufferTetraID0, vBufferTetraID0;
var cBufferTetraID1, vBufferTetraID1;
var cBufferTetraID2, vBufferTetraID2;
var cBufferTetraID11, vBufferTetraID11;
var cBufferTetraID22, vBufferTetraID22, nBuffer;
var vColor, vPosition, vNormal;
var vColor0, vPosition0;//header
var vColor2, vPosition2;
var vColor3, vPosition3;//right arm
var vColor33, vPosition33;//right leg
var vColor4, vPosition4;//left arm
var vColor44, vPosition44;//left leg
var lColor;

var iBufferCubeIDs, cBufferCubeIDs, vBufferCubeIDs;
var cBufferTetraIDs, vBufferTetraIDs;
var cBufferTetraIDs0, vBufferTetraIDs0;
var cBufferTetraIDs1, vBufferTetraIDs1;
var cBufferTetraIDs2, vBufferTetraIDs2;
var cBufferTetraIDs11, vBufferTetraIDs11;
var cBufferTetraIDs22, vBufferTetraIDs22;
var vColors, vPositions;
var vColors0, vPositions0;//header
var vColors2, vPositions2;
var vColors3, vPositions3;//right arm
var vColors33, vPositions33;//right leg
var vColors4, vPositions4;//left arm
var vColors44, vPositions44;//left leg

var pointsArray=[];
var CurModelViewMatrix = mat4();
var CurModelViewMatrixLoc;
var CubeTx = 0.5;
var CubeTx1 = -0.5;
var TetraTx = 0;
var CubeRotateAngle = 0;
var Cube1RotateAngle = 0;
var TetraRotateAngle = 0;
var AScale=0.7;
var AScale1=0.7;
var A_Scale = mat4(0.5, 0.0,  0.0, 0.0,
                  0.0, 0.5,  0.0, 0.0,
                  0.0, 0.0,  0.5, 0.0,
                  0.0, 0.0,  0.0, 1.0 );
var Scale = mat4( 0.5, 0.0,  0.0, 0.0,
                  0.0, 0.5,  0.0, 0.0,
                  0.0, 0.0,  0.5, 0.0,
                  0.0, 0.0,  0.0, 1.0 );
var Scale1 = mat4( 0.25, 0.0,  0.0, 0.0,
                  0.0, 0.25,  0.0, 0.0,
                  0.0, 0.0,  0.25, 0.0,
                  0.0, 0.0,  0.0, 1.0 );

var Scale2 = mat4( 0.1, 0.0,  0.0, 0.0,
                  0.0, 0.5,  0.0, 0.0,
                  0.0, 0.0,  0.15, 0.0,
                  0.0, 0.0,  0.0, 1.0 );
var Scale22 = mat4(0.1, 0.0,  0.0, 0.0,
                  0.0, 0.7,  0.0, 0.0,
                  0.0, 0.0,  0.15, 0.0,
                  0.0, 0.0,  0.0, 1.0 );
var Scale3 = mat4(0.3, 0.0,  0.0, 0.0,
                  0.0, 0.3,  0.0, 0.0,
                  0.0, 0.0,  0.3, 0.0,
                  0.0, 0.0,  0.0, 1.0 );
    //header
    var vertices0 = [
        vec3( -0.5,  0.0,  0.5 ),
        vec3( -0.5,  1.0,  0.5 ),
        vec3(  0.5,  1.0,  0.5 ),
        vec3(  0.5,  0.0,  0.5 ),
        vec3( -0.5,  0.0, -0.5 ),
        vec3( -0.5,  1.0, -0.5 ),
        vec3(  0.5,  1.0, -0.5 ),
        vec3(  0.5,  0.0, -0.5 )
    ];
    var lightcolor = [
        vec4( 1.0, 1.0, 0.0, 1.0 ),  // black
        vec4( 1.0, 1.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
        vec4( 1.0, 1.0, 0.0, 1.0 ) ];

     var vertexColors0 = [
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // black
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // red
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // yellow
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // green
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // blue
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // magenta
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // white
        vec4( 0.8, 0.8, 0.0, 1.0 )   // cyan
    ];
    //body
    var vertices = [
        vec3( -0.5, -0.5,  0.5),
        vec3( -0.5,  0.5,  0.5),
        vec3(  0.5,  0.5,  0.5),
        vec3(  0.5, -0.5,  0.5),
        vec3( -0.5, -0.5, -0.5),
        vec3( -0.5,  0.5, -0.5),
        vec3(  0.5,  0.5, -0.5),
        vec3(  0.5, -0.5, -0.5)
    ];

     var vertexColors = [
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // black
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // red
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // yellow
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // green
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // blue
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // magenta
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // white
        vec4( 0.8, 0.8, 0.0, 1.0 )   // cyan

    ];
    //right arm
    var vertices1 = [
        vec3(  0.0, -0.7,  0.5 ),
        vec3(  0.0,  0.3,  0.5 ),
        vec3(  1.0,  0.3,  0.5 ),
        vec3(  1.0, -0.7,  0.5 ),
        vec3(  0.0, -0.7, -0.5 ),
        vec3(  0.0,  0.3, -0.5 ),
        vec3(  1.0,  0.3, -0.5 ),
        vec3(  1.0, -0.7, -0.5 )
    ];

     var vertexColors1 = [
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // black
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // red
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // yellow
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // green
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // blue
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // magenta
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // white
        vec4( 0.8, 0.8, 0.0, 1.0 )   // cyan

    ];
    //right leg
    var vertices11 = [
        vec3(  0.0, -1.0,  0.5 ),
        vec3(  0.0,  0.0,  0.5 ),
        vec3(  1.0,  0.0,  0.5 ),
        vec3(  1.0, -1.0,  0.5 ),
        vec3(  0.0, -1.0, -0.5 ),
        vec3(  0.0,  0.0, -0.5 ),
        vec3(  1.0,  0.0, -0.5 ),
        vec3(  1.0, -1.0, -0.5 )
    ];

     var vertexColors11 = [
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // black
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // red
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // yellow
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // green
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // blue
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // magenta
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // white
        vec4( 0.8, 0.8, 0.0, 1.0 )   // cyan

    ];
    //left arm
    var vertices2 = [
        vec3( -1.0, -0.7,  0.5 ),
        vec3( -1.0,  0.3,  0.5 ),
        vec3(  0.0,  0.3,  0.5 ),
        vec3(  0.0, -0.7,  0.5 ),
        vec3( -1.0, -0.7, -0.5 ),
        vec3( -1.0,  0.3, -0.5 ),
        vec3(  0.0,  0.3, -0.5 ),
        vec3(  0.0, -0.7, -0.5 )
    ];

     var vertexColors2 = [
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // black
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // red
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // yellow
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // green
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // blue
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // magenta
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // white
        vec4( 0.8, 0.8, 0.0, 1.0 )   // cyan

    ];
    //left leg
    var vertices22 = [
        vec3( -0.5, -1.0,  0.5 ),
        vec3( -0.5,  0.0,  0.5 ),
        vec3(  0.5,  0.0,  0.5 ),
        vec3(  0.5, -1.0,  0.5 ),
        vec3( -0.5, -1.0, -0.5 ),
        vec3( -0.5,  0.0, -0.5 ),
        vec3(  0.5,  0.0, -0.5 ),
        vec3(  0.5, -1.0, -0.5 )
    ];

     var vertexColors22 = [
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // black
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // red
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // yellow
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // green
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // blue
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // magenta
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // white
        vec4( 0.8, 0.8, 0.0, 1.0 )   // cyan

    ];
// indices of the 12 triangles that compise the cube

var indices = [
    1, 0, 3,
    3, 2, 1,
    2, 3, 7,
    7, 6, 2,
    3, 0, 4,
    4, 7, 3,
    6, 5, 1,
    1, 2, 6,
    4, 5, 6,
    6, 7, 4,
    5, 4, 0,
    0, 1, 5
];
//head
var basevertices = [
        vec3( -0.5,  0.3,  0.5 ),
        vec3( -0.5,  1.3,  0.5 ),
        vec3(  0.5,  1.3,  0.5 ),
        vec3(  0.5,  0.3,  0.5 ),
        vec3( -0.5,  0.3, -0.5 ),
        vec3( -0.5,  1.3, -0.5 ),
        vec3(  0.5,  1.3, -0.5 ),
        vec3(  0.5,  0.3, -0.5 )
    ];

var basecolors_tetrahedron = [
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // black
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // red
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // yellow
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // green
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // blue
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // magenta
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // white
        vec4( 0.8, 0.8, 0.0, 1.0 )   // cyan

    ];
/////////////////////////
   //header
    var header = [
        vec3( -0.5,  0.0,  0.5 ),
        vec3( -0.5,  1.0,  0.5 ),
        vec3(  0.5,  1.0,  0.5 ),
        vec3(  0.5,  0.0,  0.5 ),
        vec3( -0.5,  0.0, -0.5 ),
        vec3( -0.5,  1.0, -0.5 ),
        vec3(  0.5,  1.0, -0.5 ),
        vec3(  0.5,  0.0, -0.5 )
    ];

     var headerColors = [
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // black
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // red
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // yellow
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // green
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // blue
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // magenta
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // white
        vec4( 0.8, 0.8, 0.0, 1.0 )   // cyan

    ];
    //body
    var body = [
        vec3( -0.5, -0.5,  0.5),
        vec3( -0.5,  0.5,  0.5),
        vec3(  0.5,  0.5,  0.5),
        vec3(  0.5, -0.5,  0.5),
        vec3( -0.5, -0.5, -0.5),
        vec3( -0.5,  0.5, -0.5),
        vec3(  0.5,  0.5, -0.5),
        vec3(  0.5, -0.5, -0.5)

    ];

     var bodyColors = [
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // black
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // red
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // yellow
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // green
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // blue
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // magenta
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // white
        vec4( 0.8, 0.8, 0.0, 1.0 )   // cyan

    ];
    //right arm
    var rightarm = [
        vec3(  0.0, -0.7,  0.5 ),
        vec3(  0.0,  0.3,  0.5 ),
        vec3(  1.0,  0.3,  0.5 ),
        vec3(  1.0, -0.7,  0.5 ),
        vec3(  0.0, -0.7, -0.5 ),
        vec3(  0.0,  0.3, -0.5 ),
        vec3(  1.0,  0.3, -0.5 ),
        vec3(  1.0, -0.7, -0.5 )
    ];

     var rightarmColors = [
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // black
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // red
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // yellow
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // green
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // blue
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // magenta
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // white
        vec4( 0.8, 0.8, 0.0, 1.0 )   // cyan

    ];
    //right leg
    var rightleg = [
        vec3(  0.0, -1.0,  0.5 ),
        vec3(  0.0,  0.0,  0.5 ),
        vec3(  1.0,  0.0,  0.5 ),
        vec3(  1.0, -1.0,  0.5 ),
        vec3(  0.0, -1.0, -0.5 ),
        vec3(  0.0,  0.0, -0.5 ),
        vec3(  1.0,  0.0, -0.5 ),
        vec3(  1.0, -1.0, -0.5 )
    ];

     var rightlegColors = [
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // black
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // red
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // yellow
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // green
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // blue
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // magenta
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // white
        vec4( 0.8, 0.8, 0.0, 1.0 )   // cyan

    ];
    //left arm
    var leftarm = [
        vec3( -1.0, -0.7,  0.5 ),
        vec3( -1.0,  0.3,  0.5 ),
        vec3(  0.0,  0.3,  0.5 ),
        vec3(  0.0, -0.7,  0.5 ),
        vec3( -1.0, -0.7, -0.5 ),
        vec3( -1.0,  0.3, -0.5 ),
        vec3(  0.0,  0.3, -0.5 ),
        vec3(  0.0, -0.7, -0.5 )
    ];

     var leftarmColors = [
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // black
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // red
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // yellow
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // green
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // blue
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // magenta
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // white
        vec4( 0.8, 0.8, 0.0, 1.0 )   // cyan

    ];
    //left leg
    var leftleg = [
        vec3( -0.5, -1.0,  0.5 ),
        vec3( -0.5,  0.0,  0.5 ),
        vec3(  0.5,  0.0,  0.5 ),
        vec3(  0.5, -1.0,  0.5 ),
        vec3( -0.5, -1.0, -0.5 ),
        vec3( -0.5,  0.0, -0.5 ),
        vec3(  0.5,  0.0, -0.5 ),
        vec3(  0.5, -1.0, -0.5 )
    ];

     var leftlegColors = [
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // black
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // red
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // yellow
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // green
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // blue
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // magenta
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // white
        vec4( 0.8, 0.8, 0.0, 1.0 )   // cyan

    ];
// indices of the 12 triangles that compise the cube

var indices = [
    1, 0, 3,
    3, 2, 1,
    2, 3, 7,
    7, 6, 2,
    3, 0, 4,
    4, 7, 3,
    6, 5, 1,
    1, 2, 6,
    4, 5, 6,
    6, 7, 4,
    5, 4, 0,
    0, 1, 5
];
//head
var basevertices1 = [
        vec3( -0.5,  0.3,  0.5),
        vec3( -0.5,  1.3,  0.5),
        vec3(  0.5,  1.3,  0.5),
        vec3(  0.5,  0.3,  0.5),
        vec3( -0.5,  0.3, -0.5),
        vec3( -0.5,  1.3, -0.5),
        vec3(  0.5,  1.3, -0.5),
        vec3(  0.5,  0.3, -0.5)
    ];

var basecolors_tetrahedron1 = [
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // black
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // red
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // yellow
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // green
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // blue
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // magenta
        vec4( 0.8, 0.8, 0.0, 1.0 ),  // white
        vec4( 0.8, 0.8, 0.0, 1.0 )   // cyan

    ];
function quad(a, b, c, d) {

     var t1 = subtract(vertices[b], vertices[a]);
     var t2 = subtract(vertices[c], vertices[b]);
     var normal = cross(t1, t2);
     var normal = vec3(normal);


     pointsArray.push(vertices[a]);
     normalsArray.push(normal);
     pointsArray.push(vertices[b]);
     normalsArray.push(normal);
     pointsArray.push(vertices[c]);
     normalsArray.push(normal);
     pointsArray.push(vertices[a]);
     normalsArray.push(normal);
     pointsArray.push(vertices[c]);
     normalsArray.push(normal);
     pointsArray.push(vertices[d]);
     normalsArray.push(normal);

     var t1 = subtract(basevertices1[b], basevertices1[a]);
     var t2 = subtract(basevertices1[c], basevertices1[b]);
     var normal = cross(t1, t2);
     var normal = vec3(normal);


     pointsArray.push(basevertices1[a]);
     normalsArray.push(normal);
     pointsArray.push(basevertices1[b]);
     normalsArray.push(normal);
     pointsArray.push(basevertices1[c]);
     normalsArray.push(normal);
     pointsArray.push(basevertices1[a]);
     normalsArray.push(normal);
     pointsArray.push(basevertices1[c]);
     normalsArray.push(normal);
     pointsArray.push(basevertices1[d]);
     normalsArray.push(normal);


}


function colorCube()
{
    quad( 1, 0, 3, 2 );
    quad( 2, 3, 7, 6 );
    quad( 3, 0, 4, 7 );
    quad( 6, 5, 1, 2 );
    quad( 4, 5, 6, 7 );
    quad( 5, 4, 0, 1 );
}

window.onload = function init() {
    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    aspect =  canvas.width/canvas.height;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    gl.enable(gl.DEPTH_TEST);

    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    colorCube();
    colorCube1();

    nBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW );

    vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.enableVertexAttribArray( vNormal );

    //body
    // color array atrribute buffer
    cBufferCubeID = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferCubeID);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW);
    vColor = gl.getAttribLocation(program, "vColor");
    gl.enableVertexAttribArray(vColor);

    lColor = gl.createBuffer();
    gl.bufferData(gl.ARRAY_BUFFER, flatten(lightcolor), gl.STATIC_DRAW);

    vColor = gl.getAttribLocation(program, "vColor");
    gl.enableVertexAttribArray(vColor);

    lightBuffer = gl.createBuffer();
    gl.bufferData(gl.ARRAY_BUFFER, flatten(lightvertices), gl.STATIC_DRAW);

    vPosition = gl.getAttribLocation(program, "vPosition");

    gl.enableVertexAttribArray(vPosition);

    // array element buffer
    iBufferCubeID = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBufferCubeID);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);

    //vertex buffer
    vBufferCubeID = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferCubeID);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    vPosition = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPosition);

    //header
    //vertex buffer
    vBufferTetraID0 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferTetraID0);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices0), gl.STATIC_DRAW);
    vPosition0 = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPosition0);


    // color array atrribute buffer
    cBufferTetraID0 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferTetraID0);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors0), gl.STATIC_DRAW);
    vColor0 = gl.getAttribLocation(program, "vColor");
    gl.enableVertexAttribArray(vColor0);
    //head
    //vertex buffer
    vBufferTetraID = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferTetraID);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(basevertices), gl.STATIC_DRAW);
    vPosition2 = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPosition2);


    // color array atrribute buffer
    cBufferTetraID = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferTetraID);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(basecolors_tetrahedron), gl.STATIC_DRAW);
    vColor2 = gl.getAttribLocation(program, "vColor");
    gl.enableVertexAttribArray(vColor2);

    //right arm
    vBufferTetraID1 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferTetraID1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices1), gl.STATIC_DRAW);
    vPosition3 = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPosition3);


    // color array atrribute buffer
    cBufferTetraID1 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferTetraID1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors1), gl.STATIC_DRAW);
    vColor3 = gl.getAttribLocation(program, "vColor");
    gl.enableVertexAttribArray(vColor3);
    //right leg
    vBufferTetraID11 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferTetraID11);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices11), gl.STATIC_DRAW);
    vPosition33 = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPosition33);


    // color array atrribute buffer
    cBufferTetraID11 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferTetraID11);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors11), gl.STATIC_DRAW);
    vColor33 = gl.getAttribLocation(program, "vColor");
    gl.enableVertexAttribArray(vColor33);
    //left arm
    vBufferTetraID2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferTetraID2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices2), gl.STATIC_DRAW);
    vPosition4 = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPosition4);


    // color array atrribute buffer
    cBufferTetraID2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferTetraID2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors2), gl.STATIC_DRAW);
    vColor4 = gl.getAttribLocation(program, "vColor");
    gl.enableVertexAttribArray(vColor4);
    //left leg
    vBufferTetraID22 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferTetraID22);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices22), gl.STATIC_DRAW);
    vPosition44 = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPosition44);


    // color array atrribute buffer
    cBufferTetraID22 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferTetraID22);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors22), gl.STATIC_DRAW);
    vColor44 = gl.getAttribLocation(program, "vColor");
    gl.enableVertexAttribArray(vColor44);
/////////////////////////////
///
   //body
    // color array atrribute buffer
    cBufferCubeIDs = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferCubeIDs);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(bodyColors), gl.STATIC_DRAW);
    vColors = gl.getAttribLocation(program, "vColor");
    gl.enableVertexAttribArray(vColors);

    // array element buffer
    iBufferCubeID = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBufferCubeID);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);

    //vertex buffer
    vBufferCubeID = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferCubeID);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(body), gl.STATIC_DRAW);
    vPosition = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPosition);

    //header
    //vertex buffer
    vBufferTetraIDs0 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferTetraIDs0);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(header), gl.STATIC_DRAW);
    vPosition0 = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPosition0);


    // color array atrribute buffer
    cBufferTetraID0 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferTetraID0);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(headerColors), gl.STATIC_DRAW);
    vColors0 = gl.getAttribLocation(program, "vColor");
    gl.enableVertexAttribArray(vColors0);
    //head
    //vertex buffer
    vBufferTetraID = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferTetraID);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(basevertices1), gl.STATIC_DRAW);
    vPositions2 = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPositions2);


    // color array atrribute buffer
    cBufferTetraID = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferTetraID);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(basecolors_tetrahedron1), gl.STATIC_DRAW);
    vColors2 = gl.getAttribLocation(program, "vColor");
    gl.enableVertexAttribArray(vColors2);

    //right arm
    vBufferTetraIDs1 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferTetraIDs1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(rightarm), gl.STATIC_DRAW);
    vPositions3 = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPositions3);


    // color array atrribute buffer
    cBufferTetraIDs1 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferTetraIDs1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(rightarmColors), gl.STATIC_DRAW);
    vColors3 = gl.getAttribLocation(program, "vColor");
    gl.enableVertexAttribArray(vColors3);
    //right leg
    vBufferTetraIDs11 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferTetraIDs11);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(rightleg), gl.STATIC_DRAW);
    vPositions33 = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPositions33);


    // color array atrribute buffer
    cBufferTetraIDs11 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferTetraIDs11);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(rightlegColors), gl.STATIC_DRAW);
    vColors33 = gl.getAttribLocation(program, "vColor");
    gl.enableVertexAttribArray(vColors33);
    //left arm
    vBufferTetraIDs2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferTetraIDs2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(leftarm), gl.STATIC_DRAW);
    vPositions4 = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPositions4);


    // color array atrribute buffer
    cBufferTetraIDs2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferTetraIDs2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(leftarm), gl.STATIC_DRAW);
    vColors4 = gl.getAttribLocation(program, "vColor");
    gl.enableVertexAttribArray(vColors4);
    //left leg

    vPositions44 = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPositions44);


    // color array atrribute buffer
    cBufferTetraIDs22 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferTetraIDs22);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(leftlegColors), gl.STATIC_DRAW);
    vColors44 = gl.getAttribLocation(program, "vColor");
    gl.enableVertexAttribArray(vColors44);

//////////////
    tBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(texCoordsArray), gl.STATIC_DRAW );

    vTexCoord = gl.getAttribLocation( program, "vTexCoord" );
    gl.vertexAttribPointer( vTexCoord, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vTexCoord );

//////////////
    CurModelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");

    //modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );
    lightPositionLoc = gl.getUniformLocation( program, "lightPosition" );


    document.getElementById("CubeLeft").onclick = function() {
        CubeTx -= 0.1;
    };

    document.getElementById("CubeRight").onclick = function() {
        CubeTx += 0.1;
    };
    document.getElementById("CubeR1").onclick = function() {
        CubeRotateAngle -= 5;
    };
    document.getElementById("CubeR2").onclick = function() {
        CubeRotateAngle += 5;
    };
    document.getElementById("Cube1Left").onclick = function() {
        CubeTx1 -= 0.1;
    };
    document.getElementById("Cube1Right").onclick = function() {
        CubeTx1 += 0.1;
    };
    document.getElementById("Cube1R1").onclick = function() {
        Cube1RotateAngle -= 5;
    };
    document.getElementById("Cube1R2").onclick = function() {
        Cube1RotateAngle += 5;
    };
    document.getElementById("Scale1").onclick = function() {
        AScale1 += 0.2;
    };
    document.getElementById("Scales1").onclick = function() {
        AScale1 -= 0.2;
    };
    document.getElementById("Scale").onclick = function() {
        AScale += 0.2;
    };
    document.getElementById("Scales").onclick = function() {
        AScale -= 0.2;
    };
    document.getElementById("EyeX").onclick = function() {
        lightX -= 0.2;
    };
    document.getElementById("EyeY").onclick = function() {
        lightY -= 0.2;
    };
    document.getElementById("EyeZ").onclick = function() {
        lightZ -= 0.2;
    };
    document.getElementById("EyeX1").onclick = function() {
        lightX += 0.2;
    };
    document.getElementById("EyeY1").onclick = function() {
        lightY += 0.2;
    };
    document.getElementById("EyeZ1").onclick = function() {
        lightZ += 0.2;
    };
    ambientProduct = mult(lightAmbient, materialAmbient);
    diffuseProduct = mult(lightDiffuse, materialDiffuse);
    specularProduct = mult(lightSpecular, materialSpecular);



    gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"),
       flatten(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"),
       flatten(diffuseProduct) );
    gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"),
       flatten(specularProduct) );
    var image = document.getElementById("texImage");

    configureTexture( image );

    gl.uniform1f(gl.getUniformLocation(program,
       "shininess"),materialShininess);



    render();
}

function render() {



    //EyeZ=EyeZ+0.04;
    //if(EyeZ>2)EyeZ=0.6;
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);    at=vec3(atX,0.0,0.0);
    eye=vec3(EyeX,EyeY,EyeZ);
    //eye = vec3(radius*Math.sin(theta)*Math.cos(phi),
    //    radius*Math.sin(theta)*Math.sin(phi), radius*Math.cos(theta));
    var CurModelViewMatrixx = lookAt(eye, at , up);
    projectionMatrix = perspective(fovy, aspect, near, far);

    lightPosition = vec4(lightX, lightY, lightZ, 1.0 );
    gl.uniform4fv( lightPositionLoc, flatten(lightPosition) );

    var tTriangle= translate(lightX,lightY,lightZ);
    CurModelViewMatrix = mult(tTriangle, CurModelViewMatrix);
    gl.uniformMatrix4fv(CurModelViewMatrixLoc, false, flatten(CurModelViewMatrix));

    gl.bindBuffer(gl.ARRAY_BUFFER, lColor);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, lightBuffer );
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES,0, 3);


    //body
    var S=scalem(AScale,AScale,AScale);

    var R = rotateY(CubeRotateAngle);
    var Tx = translate(1.0, 0.0, 0.0);

    CurModelViewMatrix = mult(Scale, R);
    CurModelViewMatrix = mult(S, CurModelViewMatrix);
    var T1 = translate(CubeTx, 0.0, 0.0);
    CurModelViewMatrix = mult(T1, CurModelViewMatrix);
    CurModelViewMatrix = mult(Tx, CurModelViewMatrix);
    CurModelViewMatrix = mult(CurModelViewMatrixx, CurModelViewMatrix);

    gl.uniformMatrix4fv(CurModelViewMatrixLoc, false, flatten(CurModelViewMatrix));


    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferCubeID);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);



    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferCubeID);
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBufferCubeID);

    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.drawElements(gl.TRIANGLES, numVertices, gl.UNSIGNED_BYTE, 0);
    //head
    T = translate(TetraTx, 0.0, 0.0);
    var TTT = translate(0.0, -0.8, 0.0);
    R = rotateY(CubeRotateAngle);
    var TT = translate(0.0, +0.8, 0.0);
    CurModelViewMatrix = mult(R,TTT);
    CurModelViewMatrix = mult(TT,CurModelViewMatrix);
    CurModelViewMatrix = mult(T,CurModelViewMatrix);
    CurModelViewMatrix = mult(Scale1,CurModelViewMatrix);
    var S=scalem(AScale,AScale,AScale);
    CurModelViewMatrix = mult(S, CurModelViewMatrix);
    var T1 = translate(CubeTx, 0.0, 0.0);
    CurModelViewMatrix = mult(T1, CurModelViewMatrix);
    CurModelViewMatrix = mult(Tx, CurModelViewMatrix);
    CurModelViewMatrix = mult(CurModelViewMatrixx, CurModelViewMatrix);
    gl.uniformMatrix4fv(CurModelViewMatrixLoc, false, flatten(CurModelViewMatrix));


    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferTetraID);
    gl.vertexAttribPointer(vColor2, 4, gl.FLOAT, false, 0, 0);



    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferTetraID);
    gl.vertexAttribPointer(vPosition2, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBufferCubeID);

    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.drawElements(gl.TRIANGLES, numVertices,  gl.UNSIGNED_BYTE, 0);
    //header
    T = translate(0.0, 1.0, 0.0);
    var TTT = translate(0.0, -0.8, 0.0);
    R = rotateY(CubeRotateAngle);
    var TT = translate(0.0, +0.8, 0.0);
    CurModelViewMatrix = mult(R,TTT);
    var test=mult(TT,CurModelViewMatrix);
    CurModelViewMatrix = mult(T,test);
    CurModelViewMatrix = mult(Scale3,CurModelViewMatrix);
    var S=scalem(AScale,AScale,AScale);
    CurModelViewMatrix = mult(S, CurModelViewMatrix);
    var T1 = translate(CubeTx, 0.0, 0.0);
    CurModelViewMatrix = mult(T1, CurModelViewMatrix);
    CurModelViewMatrix = mult(Tx, CurModelViewMatrix);
    CurModelViewMatrix = mult(CurModelViewMatrixx, CurModelViewMatrix);
    gl.uniformMatrix4fv(CurModelViewMatrixLoc, false, flatten(CurModelViewMatrix));


    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferTetraID0);
    gl.vertexAttribPointer(vColor0, 4, gl.FLOAT, false, 0, 0);



    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferTetraID0);
    gl.vertexAttribPointer(vPosition0, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBufferCubeID);

    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.drawElements(gl.TRIANGLES, numVertices,  gl.UNSIGNED_BYTE, 0);

    //right arm
    var S=scalem(AScale,AScale,AScale);
    var T1 = translate(CubeTx, 0.0, 0.0);
    T = translate(2.5, 0.0, 0.0);
    R = rotateY(CubeRotateAngle);
    CurModelViewMatrix = mult(R,T);
    CurModelViewMatrix = mult(Scale2,CurModelViewMatrix);
    CurModelViewMatrix = mult(S, CurModelViewMatrix);
    CurModelViewMatrix = mult(T1, CurModelViewMatrix);
    CurModelViewMatrix = mult(Tx, CurModelViewMatrix);
    CurModelViewMatrix = mult(CurModelViewMatrixx, CurModelViewMatrix);
    gl.uniformMatrix4fv(CurModelViewMatrixLoc, false, flatten(CurModelViewMatrix));


    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferTetraID1);
    gl.vertexAttribPointer(vColor3, 4, gl.FLOAT, false, 0, 0);



    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferTetraID1);
    gl.vertexAttribPointer(vPosition3, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBufferCubeID);
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.drawElements(gl.TRIANGLES, numVertices,  gl.UNSIGNED_BYTE, 0);
    //left arm
    T = translate(-2.5, 0.0, 0.0);
    var T1 = translate(CubeTx, 0.0, 0.0);
    R = rotateY(CubeRotateAngle);
    CurModelViewMatrix = mult(R,T);
    CurModelViewMatrix = mult(Scale2,CurModelViewMatrix);
    var S=scalem(AScale,AScale,AScale);
    CurModelViewMatrix = mult(S, CurModelViewMatrix);
    CurModelViewMatrix = mult(T1, CurModelViewMatrix);
    CurModelViewMatrix = mult(Tx, CurModelViewMatrix);
    CurModelViewMatrix = mult(CurModelViewMatrixx, CurModelViewMatrix);
    gl.uniformMatrix4fv(CurModelViewMatrixLoc, false, flatten(CurModelViewMatrix));


    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferTetraID2);
    gl.vertexAttribPointer(vColor4, 4, gl.FLOAT, false, 0, 0);



    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferTetraID2);
    gl.vertexAttribPointer(vPosition4, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBufferCubeID);
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.drawElements(gl.TRIANGLES, numVertices,  gl.UNSIGNED_BYTE, 0);
    //right leg
    T = translate(CubeTx, 0.0, 0.0);
    var T1 = translate(1.0, -0.3, 0.0);
    var S=scalem(AScale,AScale,AScale);
    R = rotateY(CubeRotateAngle);
    CurModelViewMatrix = mult(R,T1);
    CurModelViewMatrix = mult(Scale22,CurModelViewMatrix);
    CurModelViewMatrix = mult(S, CurModelViewMatrix);
    CurModelViewMatrix = mult(T, CurModelViewMatrix);
    CurModelViewMatrix = mult(Tx, CurModelViewMatrix);
    CurModelViewMatrix = mult(CurModelViewMatrixx, CurModelViewMatrix);

    gl.uniformMatrix4fv(CurModelViewMatrixLoc, false, flatten(CurModelViewMatrix));


    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferTetraID1);
    gl.vertexAttribPointer(vColor33, 4, gl.FLOAT, false, 0, 0);



    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferTetraID1);
    gl.vertexAttribPointer(vPosition33, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBufferCubeID);

    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.drawElements(gl.TRIANGLES, numVertices,  gl.UNSIGNED_BYTE, 0);

    //left leg
    T = translate(CubeTx, 0.0, 0.0);
    var T1=translate(-1.0, -0.3, 0.0);


    R = rotateY(CubeRotateAngle);
    CurModelViewMatrix = mult(R, T1);
    CurModelViewMatrix = mult(Scale22,CurModelViewMatrix);
    var S=scalem(AScale,AScale,AScale);
    CurModelViewMatrix = mult(S, CurModelViewMatrix);

    CurModelViewMatrix = mult(T, CurModelViewMatrix);
    CurModelViewMatrix = mult(Tx, CurModelViewMatrix);
    CurModelViewMatrix = mult(CurModelViewMatrixx, CurModelViewMatrix);
    gl.uniformMatrix4fv(CurModelViewMatrixLoc, false, flatten(CurModelViewMatrix));


    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferTetraID2);
    gl.vertexAttribPointer(vColor44, 4, gl.FLOAT, false, 0, 0);



    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferTetraID2);
    gl.vertexAttribPointer(vPosition44, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBufferCubeID);
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.drawElements(gl.TRIANGLES, numVertices,  gl.UNSIGNED_BYTE, 0);
    ////////////////////////////

    //body
    var S=scalem(AScale1,AScale1,AScale1);
    var T = translate(CubeTx1, 0.0, 0.0);
    var R = rotateY(Cube1RotateAngle);
    CurModelViewMatrix = mult(T, R);
    CurModelViewMatrix = mult(Scale, R);
    CurModelViewMatrix = mult(S, CurModelViewMatrix);
    var T1 = translate(CubeTx1, 0.0, 0.0);
    CurModelViewMatrix = mult(T1, CurModelViewMatrix);
    CurModelViewMatrix = mult(CurModelViewMatrixx, CurModelViewMatrix);
    gl.uniformMatrix4fv(CurModelViewMatrixLoc, false, flatten(CurModelViewMatrix));


    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferCubeID);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);



    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferCubeID);
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBufferCubeID);

    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.drawElements(gl.TRIANGLES, numVertices, gl.UNSIGNED_BYTE, 0);
    //head
    T = translate(TetraTx, 0.0, 0.0);
    var TTT = translate(0.0, -0.8, 0.0);
    R = rotateY(Cube1RotateAngle);
    var TT = translate(0.0, +0.8, 0.0);
    CurModelViewMatrix = mult(R,TTT);
    var test=mult(TT,CurModelViewMatrix);
    CurModelViewMatrix = mult(T,test);
    CurModelViewMatrix = mult(Scale1,CurModelViewMatrix);
    var S=scalem(AScale1,AScale1,AScale1);
    CurModelViewMatrix = mult(S, CurModelViewMatrix);
    var T1 = translate(CubeTx1, 0.0, 0.0);
    CurModelViewMatrix = mult(T1, CurModelViewMatrix);
    CurModelViewMatrix = mult(CurModelViewMatrixx, CurModelViewMatrix);
    gl.uniformMatrix4fv(CurModelViewMatrixLoc, false, flatten(CurModelViewMatrix));


    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferTetraID);
    gl.vertexAttribPointer(vColor2, 4, gl.FLOAT, false, 0, 0);



    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferTetraID);
    gl.vertexAttribPointer(vPosition2, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBufferCubeID);

    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.drawElements(gl.TRIANGLES, numVertices,  gl.UNSIGNED_BYTE, 0);
    //header
    T = translate(0.0, 1.0, 0.0);
    var TTT = translate(0.0, -0.8, 0.0);
    R = rotateY(Cube1RotateAngle);
    var TT = translate(0.0, +0.8, 0.0);
    CurModelViewMatrix = mult(R,TTT);
    var test=mult(TT,CurModelViewMatrix);
    CurModelViewMatrix = mult(T,test);
    CurModelViewMatrix = mult(Scale3,CurModelViewMatrix);
    var S=scalem(AScale1,AScale1,AScale1);
    CurModelViewMatrix = mult(S, CurModelViewMatrix);
    var T1 = translate(CubeTx1, 0.0, 0.0);
    CurModelViewMatrix = mult(T1, CurModelViewMatrix);
    CurModelViewMatrix = mult(CurModelViewMatrixx, CurModelViewMatrix);
    gl.uniformMatrix4fv(CurModelViewMatrixLoc, false, flatten(CurModelViewMatrix));


    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferTetraID0);
    gl.vertexAttribPointer(vColor0, 4, gl.FLOAT, false, 0, 0);



    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferTetraID0);
    gl.vertexAttribPointer(vPosition0, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBufferCubeID);

    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.drawElements(gl.TRIANGLES, numVertices,  gl.UNSIGNED_BYTE, 0);

    //right arm
    var S=scalem(AScale1,AScale1,AScale1);
    var T1 = translate(CubeTx1, 0.0, 0.0);
    T = translate(2.5, 0.0, 0.0);
    R = rotateY(Cube1RotateAngle);
    CurModelViewMatrix = mult(R,T);
    CurModelViewMatrix = mult(Scale2,CurModelViewMatrix);
    CurModelViewMatrix = mult(S, CurModelViewMatrix);
    CurModelViewMatrix = mult(T1, CurModelViewMatrix);
    CurModelViewMatrix = mult(CurModelViewMatrixx, CurModelViewMatrix);
    gl.uniformMatrix4fv(CurModelViewMatrixLoc, false, flatten(CurModelViewMatrix));


    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferTetraID1);
    gl.vertexAttribPointer(vColor3, 4, gl.FLOAT, false, 0, 0);



    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferTetraID1);
    gl.vertexAttribPointer(vPosition3, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBufferCubeID);
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.drawElements(gl.TRIANGLES, numVertices,  gl.UNSIGNED_BYTE, 0);
    //left arm
    T = translate(-2.5, 0.0, 0.0);
    var T1 = translate(CubeTx1, 0.0, 0.0);
    R = rotateY(Cube1RotateAngle);
    CurModelViewMatrix = mult(R,T);
    CurModelViewMatrix = mult(Scale2,CurModelViewMatrix);
    var S=scalem(AScale1,AScale1,AScale1);
    CurModelViewMatrix = mult(S, CurModelViewMatrix);
    CurModelViewMatrix = mult(T1, CurModelViewMatrix);
    CurModelViewMatrix = mult(CurModelViewMatrixx, CurModelViewMatrix);
    gl.uniformMatrix4fv(CurModelViewMatrixLoc, false, flatten(CurModelViewMatrix));


    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferTetraID2);
    gl.vertexAttribPointer(vColor4, 4, gl.FLOAT, false, 0, 0);



    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferTetraID2);
    gl.vertexAttribPointer(vPosition4, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBufferCubeID);
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.drawElements(gl.TRIANGLES, numVertices,  gl.UNSIGNED_BYTE, 0);
    //right leg
    //
    T = translate(CubeTx1, 0.0, 0.0);
    var T1 = translate(1.0, -0.3, 0.0);
    var S=scalem(AScale1,AScale1,AScale1);
    R = rotateY(Cube1RotateAngle);
    CurModelViewMatrix = mult(R,T1);
    CurModelViewMatrix = mult(Scale22,CurModelViewMatrix);
    CurModelViewMatrix = mult(S, CurModelViewMatrix);
    CurModelViewMatrix = mult(T, CurModelViewMatrix);
    CurModelViewMatrix = mult(CurModelViewMatrixx, CurModelViewMatrix);
    gl.uniformMatrix4fv(CurModelViewMatrixLoc, false, flatten(CurModelViewMatrix));


    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferTetraID1);
    gl.vertexAttribPointer(vColor33, 4, gl.FLOAT, false, 0, 0);



    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferTetraID1);
    gl.vertexAttribPointer(vPosition33, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBufferCubeID);
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.drawElements(gl.TRIANGLES, numVertices,  gl.UNSIGNED_BYTE, 0);

    //left leg
    T = translate(CubeTx1, 0.0, 0.0);
    var T1=translate(-1.0, -0.3, 0.0);


    R = rotateY(Cube1RotateAngle);
    CurModelViewMatrix = mult(R, T1);
    CurModelViewMatrix = mult(Scale22,CurModelViewMatrix);
    var S=scalem(AScale1,AScale1,AScale1);
    CurModelViewMatrix = mult(S, CurModelViewMatrix);

    CurModelViewMatrix = mult(T, CurModelViewMatrix);
    CurModelViewMatrix = mult(CurModelViewMatrixx, CurModelViewMatrix);
    gl.uniformMatrix4fv(CurModelViewMatrixLoc, false, flatten(CurModelViewMatrix));


    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferTetraID2);
    gl.vertexAttribPointer(vColor44, 4, gl.FLOAT, false, 0, 0);



    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferTetraID2);
    gl.vertexAttribPointer(vPosition44, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBufferCubeID);
    //gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );

    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.drawElements(gl.TRIANGLES, numVertices,  gl.UNSIGNED_BYTE, 0);

    requestAnimFrame(render);
}
