

var canvas;
var gl;
////////////
var projectionMatrix, projectionMatrixLoc;
var eye;
var at=vec3();
const up = vec3(0.0, 1.0, 0.0);
var near = 0.5;
var far = 10.0;
var radius = 4.0;
var theta  = 0.0;
var phi    = 0.0;
var dr = 5.0 * Math.PI/180.0;

var  fovy = 45.0;  // Field-of-view in Y direction angle (in degrees)
var  aspect;       // Viewport aspect ratio

var distance=0;//移动的距离
var tempx,tempy,tempz;
var rad;//radius
var angleLR=0;//左右偏转角度
var angleTB=0;//上下偏转角度
var alphaX=0;//与X轴的夹角
var EyeZ=4.0;
var EyeY=1.0;
var EyeX=3.0;
var atX=0;
var atY=0;
var atZ=0;
var alpha=0.0;
//////////
var numVertices  = 36;
var modelViewMatrix;
var indicesBuffer, cBuffer, vBufferBody;
var vBufferNeck;
var vBufferHeader;//tou
var vBufferR;
var vBufferL;//left leg arm
var vColor, vPosition;
var cBufferX;


var CurModelViewMatrix = mat4();
var CurModelViewMatrixLoc;
var CubeTx = 0.5;
var CubeTx1 = -0.5;
var Cube1Tx=1;
var TetraTx = 0;
var CubeRotateAngle = 0;
var Cube1RotateAngle = 0;
var TetraRotateAngle = 0;
var AScale=1;
var AScale1=1;
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

     var vertexColors0 = [
        vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
        vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
        vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
        vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
    ];
    //body
    var vertices = [
        vec3( -0.5, -0.5,  0.5 ),
        vec3( -0.5,  0.5,  0.5 ),
        vec3(  0.5,  0.5,  0.5 ),
        vec3(  0.5, -0.5,  0.5 ),
        vec3( -0.5, -0.5, -0.5 ),
        vec3( -0.5,  0.5, -0.5 ),
        vec3(  0.5,  0.5, -0.5 ),
        vec3(  0.5, -0.5, -0.5 )
    ];

     var vertexColors = [
        vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
        vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
        vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
        vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
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
        vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
        vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
        vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
        vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
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
        vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
        vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
        vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
        vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
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
        vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
        vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
        vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
        vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
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
     var vertexColors22 = [
        vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
        vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
        vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
        vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
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
        vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
        vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
        vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
        vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
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
        vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
        vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
        vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
        vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
    ];
    //body
    var body = [
        vec3( -0.5, -0.5,  0.5 ),
        vec3( -0.5,  0.5,  0.5 ),
        vec3(  0.5,  0.5,  0.5 ),
        vec3(  0.5, -0.5,  0.5 ),
        vec3( -0.5, -0.5, -0.5 ),
        vec3( -0.5,  0.5, -0.5 ),
        vec3(  0.5,  0.5, -0.5 ),
        vec3(  0.5, -0.5, -0.5 )
    ];

     var bodyColors = [
        vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
        vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
        vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
        vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
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
        vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
        vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
        vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
        vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
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
        vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
        vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
        vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
        vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
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
        vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
        vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
        vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
        vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
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
        vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
        vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
        vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
        vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
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
        vec3( -0.5,  0.3,  0.5 ),
        vec3( -0.5,  1.3,  0.5 ),
        vec3(  0.5,  1.3,  0.5 ),
        vec3(  0.5,  0.3,  0.5 ),
        vec3( -0.5,  0.3, -0.5 ),
        vec3( -0.5,  1.3, -0.5 ),
        vec3(  0.5,  1.3, -0.5 ),
        vec3(  0.5,  0.3, -0.5 )
    ];

var basecolors_tetrahedron1 = [
        vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
        vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
        vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
        vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
    ];

window.onload = function init() {
    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }
    aspect =  canvas.width/canvas.height;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 0.0, 1.0);

    gl.enable(gl.DEPTH_TEST);

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    //body
    // color array atrribute buffer
    cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW);
    vColor = gl.getAttribLocation(program, "vColor");
    gl.enableVertexAttribArray(vColor);

    // array element buffer
    indicesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);

    //vertex buffer
    vBufferBody = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferBody);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    vPosition = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPosition);

    //header
    //vertex buffer
    vBufferHeader = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferHeader);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices0), gl.STATIC_DRAW);
    vPosition = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPosition);


    // color array atrribute buffer
    cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors0), gl.STATIC_DRAW);
    vColor = gl.getAttribLocation(program, "vColor");
    gl.enableVertexAttribArray(vColor);
    //head
    //vertex buffer
    vBufferNeck = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferNeck);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(basevertices), gl.STATIC_DRAW);
    vPosition = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPosition);


    // color array atrribute buffer
    cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(basecolors_tetrahedron), gl.STATIC_DRAW);
    vColor = gl.getAttribLocation(program, "vColor");
    gl.enableVertexAttribArray(vColor);

    //right arm
    vBufferR = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferR);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices1), gl.STATIC_DRAW);
    vPosition = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPosition);


    // color array atrribute buffer
    cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors1), gl.STATIC_DRAW);
    vColor = gl.getAttribLocation(program, "vColor");
    gl.enableVertexAttribArray(vColor);
    //right leg

    vPosition = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPosition);


    // color array atrribute buffer
    cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors11), gl.STATIC_DRAW);
    vColor = gl.getAttribLocation(program, "vColor");
    gl.enableVertexAttribArray(vColor);
    //left arm
    vBufferL = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferL);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices2), gl.STATIC_DRAW);
    vPosition = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPosition);


    // color array atrribute buffer
    cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors2), gl.STATIC_DRAW);
    vColor = gl.getAttribLocation(program, "vColor");
    gl.enableVertexAttribArray(vColor);
    //left leg

    vPosition = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPosition);


    // color array atrribute buffer
    cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors22), gl.STATIC_DRAW);
    vColor = gl.getAttribLocation(program, "vColor");
    gl.enableVertexAttribArray(vColor);
/////////////////////////////
///
   //body
    // color array atrribute buffer

    vColor = gl.getAttribLocation(program, "vColor");
    gl.enableVertexAttribArray(vColor);

    // array element buffer
    indicesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);

    //vertex buffer
    vBufferBody = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferBody);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(body), gl.STATIC_DRAW);
    vPosition = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPosition);

    //header
    //vertex buffer

    vPosition = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPosition);


    // color array atrribute buffer
    cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(headerColors), gl.STATIC_DRAW);
    vColor = gl.getAttribLocation(program, "vColor");
    gl.enableVertexAttribArray(vColor);
    //head
    //vertex buffer
    vBufferNeck = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferNeck);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(basevertices1), gl.STATIC_DRAW);
    vPosition = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPosition);


    // color array atrribute buffer
    cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(basecolors_tetrahedron1), gl.STATIC_DRAW);
    vColor = gl.getAttribLocation(program, "vColor");
    gl.enableVertexAttribArray(vColor);

    //right arm

    vPosition = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPosition);


    // color array atrribute buffer
    cBufferX = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferX);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(rightarmColors), gl.STATIC_DRAW);
    vColor = gl.getAttribLocation(program, "vColor");
    gl.enableVertexAttribArray(vColor);
    //right leg

    vPosition = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPosition);


    // color array atrribute buffer
    cBufferX = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferX);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(rightlegColors), gl.STATIC_DRAW);
    vColor = gl.getAttribLocation(program, "vColor");
    gl.enableVertexAttribArray(vColor);
    //left arm

    vPosition = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPosition);


    // color array atrribute buffer
    cBufferX = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferX);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(leftarm), gl.STATIC_DRAW);
    vColor = gl.getAttribLocation(program, "vColor");
    gl.enableVertexAttribArray(vColor);
    //left leg

    vPosition = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPosition);


    // color array atrribute buffer
    cBufferX = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferX);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(leftlegColors), gl.STATIC_DRAW);
    vColor = gl.getAttribLocation(program, "vColor");
    gl.enableVertexAttribArray(vColor);

//////////////

    CurModelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );

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


        tempx=EyeX-atX;//计算半径
        tempy=EyeY-atY;
        tempz=EyeZ-atZ;
        rad=Math.pow(tempx,2)+Math.pow(tempy,2)+Math.pow(tempz,2);
        rad=Math.sqrt(rad);
        alphaX=Math.atan(Math.tan((atZ-EyeZ)/(atX-EyeX)));
    //keyboard listener
    document.onkeydown=function(e){
        var isie = (document.all) ? true:false;
        var key;

        if(isie){
            key = window.event.keyCode;
        }else{
            key = e.which;
        }
        if(key==37){//left
            angleLR-=0.15;
            at=transView(rad,alphaX,angleLR,atX,atY,atZ,1);
        }
        if(key==39){//right
            angleLR+=0.15;
            at=transView(rad,alphaX,angleLR,atX,atY,atZ,1);
        }
        if(key==38){//top
            angleTB-=0.15;
            at=transView(rad,alphaX,angleTB,atX,atY,atZ,-1);
        }
        if(key==40){//down
            angleTB+=0.15;
            at=transView(rad,alphaX,angleTB,atX,atY,atZ,-1);
        }
        if(key==87){//w
            distance+=0.2
            moveIt(alphaX,angleLR,distance,1);
        }
        if(key==83){//s

        }
        if(key==65){//a

        }
        if(key==68){//d

        }
        if(key==32){//space

        }
    };


    render();
}

function render() {

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


/////////////////
    alpha+=1*(Math.PI)/180;
/*    if(alpha<Math.PI&&alpha>=0*Math.PI){
        EyeX=1.5+Math.cos(alpha);
        EyeZ=Math.sin(alpha);
    }else if(alpha>=Math.PI&&alpha<3*Math.PI){
        if(alpha>=2*Math.PI){
            atX=1.7;
        }
        EyeX=-0.5-Math.cos(alpha);
        EyeZ=Math.sin(alpha);
    }else if(alpha>=3*Math.PI&&alpha<4*Math.PI){
        EyeX=1.5+Math.cos(alpha);
        EyeZ=Math.sin(alpha);
    }else if (alpha>=4*Math.PI){
        alpha=0;
        atX=0;
        EyeX=1.5+Math.cos(alpha);
        EyeZ=Math.sin(alpha);
    }*/

    //at=vec3(atX,atY,atZ);
    eye=vec3(EyeX,EyeY,EyeZ);
    //eye = vec3(radius*Math.sin(theta)*Math.cos(phi),
    //    radius*Math.sin(theta)*Math.sin(phi), radius*Math.cos(theta));
    var CurModelViewMatrixx = lookAt(eye, at , up);
    projectionMatrix = perspective(fovy, aspect, near, far);
/////////////////
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


    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferBody);
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);


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


    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferNeck);
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);


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



    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferHeader);
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);


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


    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferR);
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);

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


    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferL);
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);

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


    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferR);
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
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


    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferL);
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);

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


    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferBody);
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);


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


    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferNeck);
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);


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


    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferHeader);
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);


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


    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferR);
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);

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


    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferL);
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);

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


    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferR);
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
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
    gl.uniformMatrix4fv(CurModelViewMatrixLoc, false, flatten(CurModelViewMatrix));


    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferL);
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );
    gl.drawElements(gl.TRIANGLES, numVertices,  gl.UNSIGNED_BYTE, 0);
    requestAnimFrame(render);
}

function transView(rad,alpha,theta,ax,ay,az,dir){//alpha 与x轴的夹角，theta转向的角度
    if(dir==1){
    ax=-rad*Math.cos(alpha+theta)+EyeX;
    az=-rad*Math.sin(alpha+theta)+EyeZ;
    }else if(dir==-1){
    ax=-rad*Math.cos(alpha+theta)+EyeX;
    ay=-rad*Math.sin(alpha+theta)+EyeY;
    }
    atX=ax;
    atY=ay;
    atZ=az;
    return vec3(ax,ay,az);
}
function moveIt(alpha,theta,len,dir){
    EyeX-=Math.sin(alpha+theta);
    EyeZ-=Math.cos(alpha+theta);
    rad-=len;
}
