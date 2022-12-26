function main(){
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    var vertices = [], colors = [], indices = [];
    
    let segment = 30;
    //BigTube
    [vertices, colors, indices] = getArray(0.2, 0.2, 0.22, -0.22, segment, 0.7, 0.7, 0.7, 0.8, 0.8, 0.8, vertices.length/3); //indices start dari vertices.lenth/3 karena terdiri dari 3 titik(segitiga)
    //Bigtube bottom curve detail
    [curve, curveC, curveI] = getArray(0.2, 0.17, -0.22, -0.25, segment, 0.5, 0.5, 0.5, 0.7, 0.7, 0.7, vertices.length/3);
    vertices.push(...curve)
    colors.push(...curveC)
    indices.push(...curveI);
    //Bigtube top curve detail
    [curve2, curve2C, curve2I] = getArray(0.15, 0.2, 0.25, 0.22, segment, 0.8, 0.8, 0.8, 0.82, 0.82, 0.82, vertices.length/3);
    vertices.push(...curve2)
    colors.push(...curve2C)
    indices.push(...curve2I);
    [curve3, curve3C, curve3I] = getArray(0.09, 0.15, 0.28, 0.25, segment, 0.82, 0.82, 0.82, 0.7, 0.7, 0.7, vertices.length/3);
    vertices.push(...curve3)
    colors.push(...curve3C)
    indices.push(...curve3I);
    [curve4, curve4C, curve4I] = getArray(0.09, 0.09, 0.3, 0.28, segment, 0.7, 0.7, 0.7,0.5,0.5,0.5, vertices.length/3);
    vertices.push(...curve4)
    colors.push(...curve4C)
    indices.push(...curve4I);

    //2 tube di atas tube besar
    [tube, tubeC, tubeI] = getArray(0.1, 0.1, 0.4, 0.3, segment, 0.6, 0.6, 0.6, 0.7, 0.7, 0.7, vertices.length/3);
    vertices.push(...tube)
    colors.push(...tubeC)
    indices.push(...tubeI);
    [tube3, tube3C, tube3I] = getArray(0.05, 0.05, 0.45, 0.4, segment, 0.5, 0.5, 0.5, 0.7, 0.7, 0.7, vertices.length/3);
    vertices.push(...tube3)
    colors.push(...tube3C)
    indices.push(...tube3I);

    //tube diameter kecil yang seperti selang/saluran
    [tube2, tube2C, tube2I] = getArray(0.03, 0.03, 0.55, 0.4, segment, 0.5, 0.5, 0.5, 0.7, 0.7, 0.7, vertices.length/3);
    vertices.push(...tube2)
    colors.push(...tube2C)
    indices.push(...tube2I);
    

    //silinder lingkaran tipis untuk tempat menekan
    [tube4, tube4C, tube4I] = getArray(0.08, 0.08, 0.6, 0.55, segment, 0.5, 0.5, 0.5, 0.7, 0.7, 0.7, vertices.length/3);
    vertices.push(...tube4)
    colors.push(...tube4C)
    indices.push(...tube4I);

    let iStart = vertices.length/3;

    //balok yang mengerucut (trapesium?) tempat keluarnya cairan handsanitizer
    vertices.push(
        0.06,0,0.55,     -0.06,0,0.55,    -0.025,0.15,0.55,      0.025,0.15,0.55,
        0.06,0,0.6,     -0.06,0,0.6,    -0.025,0.15,0.6,      0.025,0.15,0.6,
    );

    colors.push(
        0.5,0.5,0.5,    0.5,0.5,0.5,    0.5,0.5,0.5,    0.5,0.5,0.5,
        0.7,0.7,0.7,    0.7,0.7,0.7,    0.7,0.7,0.7,    0.7,0.7,0.7,
    );

    indices.push(
        iStart,iStart+1,iStart+2,   iStart+2,iStart+3,iStart,
        iStart+4,iStart+5,iStart+6,     iStart+6,iStart+7,iStart+4,
        iStart+1,iStart+2,iStart+6,     iStart+6,iStart+5,iStart+1,
        iStart,iStart+3,iStart+7,   iStart+7,iStart+4,iStart,
        // iStart+2,iStart+3,iStart+7, iStart+7,iStart+6,iStart+2, //sisi keluarnya cairan handsanitizer
    );

    console.log("indices: ");
    console.log(indices);
    console.log("vertices: ");
    console.log(vertices);


    //vertex buffer
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    
    //color buffer
    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    //index buffer
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);


    //mengambil dan menyimpan informasi vertex dari html dg document getElementById
    var vertexShaderCode = document.getElementById("vertexShaderCode").text;
    //membuat vertex shader
    var vertexShader = gl.createShader( gl.VERTEX_SHADER );
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    //mengambil dan menyimpan informasi fragment dari html dg document getElementByID
    var fragmentShaderCode = document.getElementById("fragmentShaderCode").text;
    //membuat fragment shader
    var fragmentShader = gl.createShader( gl.FRAGMENT_SHADER );
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    //menambahkan info shader ke package agar bisa dicompile
    var program = gl.createProgram();  
    gl.attachShader(program, vertexShader);   
    gl.attachShader(program, fragmentShader);   
    gl.linkProgram(program);
    gl.useProgram(program);

    //menambahkan vertices ke dalam aPosition dan aColor untuk digambar
    //position
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    var aPosition = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    //color
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    var aColor = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aColor);
    
    var Pmatrix = gl.getUniformLocation(program, "uProj");
    var Vmatrix = gl.getUniformLocation(program, "uView");
    var Mmatrix = gl.getUniformLocation(program, "uModel");
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    
    var projmatrix = glMatrix.mat4.create();
    glMatrix.mat4.perspective(
        projmatrix,
        glMatrix.glMatrix.toRadian(90),
        1.0,
        0.5,
        10.0
    );
    var modmatrix = glMatrix.mat4.create();
    var viewmatrix = glMatrix.mat4.create();
    glMatrix.mat4.lookAt(
        viewmatrix,
        [0.0, 0.0, 2.0],     //posisi kamera
        [0.0, 0.0, -2.0],    //arah kamera menghadap
        [0.0, 1.0, 0.0]     //arah atas kamera
    );

    var freeze = false;
    function onMouseClick(event){
        if(freeze) freeze = false;
        else freeze = true;
    }
    document.addEventListener('click', onMouseClick, false);

    function onKeyDown(event){
        if(event.keyCode == 32) freeze = true;
    }
    function onKeyUp(event){
        if(event.keyCode == 32) freeze = false;
    }
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
   
    var theta = glMatrix.glMatrix.toRadian(0.5);
    var animate = function(){
        if(!freeze){
            glMatrix.mat4.rotate(modmatrix, modmatrix, theta, [1, 1, 1]);
        }
        
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);

        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.clearDepth(1.0);

        gl.viewport(0.0, 0.0, canvas.width, canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.uniformMatrix4fv(Pmatrix, false, projmatrix);
        gl.uniformMatrix4fv(Vmatrix, false, viewmatrix);
        gl.uniformMatrix4fv(Mmatrix, false, modmatrix);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

        window.requestAnimationFrame(animate);
    }    
    animate(0);    
}