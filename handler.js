function getArray(topRadius, botRadius, topH, botH, segment, r, g, b, r2, g2, b2, indiceStart = 0){
    let colors = []
    let arr = []
    let indices = []
    let theta = 2*Math.PI/segment
    arr.push(0, 0, botH)
    colors.push(r, g, b)
    for(let i = 0; i<segment; i++){
        let x = botRadius*Math.cos(i*theta)
        let y = botRadius*Math.sin(i*theta)
        arr.push(x, y, botH)
        colors.push(r, g, b)
    }
    for(let i=1; i<segment; i++){
        indices.push(indiceStart + 0, indiceStart + i, indiceStart + i+1)
    }
    indices.push(indiceStart + 0, indiceStart + segment, indiceStart + 1)

    arr.push(0, 0, topH)
    colors.push(r2, g2, b2)
    for(let i = 0; i<segment; i++){
        let x = topRadius*Math.cos(i*theta)
        let y = topRadius*Math.sin(i*theta)
        arr.push(x, y, topH)
        colors.push(r2, g2, b2)
    }
    for(let i=1; i<segment; i++){
        indices.push(indiceStart + segment+1, indiceStart + segment+1+i, indiceStart + segment+1+i+1)
    }
    indices.push(indiceStart + segment+1, indiceStart + 2*segment+1, indiceStart + segment+1+1)


    for(let i=1; i<segment; i++){
        indices.push(indiceStart + i, indiceStart + i+1, indiceStart + segment+1+i+1)
        indices.push(indiceStart + segment+1+i, indiceStart + segment+1+i+1, indiceStart + i)
    }
    indices.push(indiceStart + segment, indiceStart + 1, indiceStart + segment+1+1)
    indices.push(indiceStart + segment, indiceStart + segment+1+1, indiceStart + 2*segment+1)

    return [arr, colors, indices] 
}