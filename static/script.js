function draw() {
    const canvas = document.getElementById('canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    const a = parseFloat(document.getElementById('a').value) || 0;
    const b = parseFloat(document.getElementById('b').value) || 0;
    const c = parseFloat(document.getElementById('c').value) || 0;
    const scale = parseFloat(document.getElementById('scale')?.value) || 30;
    
    if (document.getElementById('scaleValue')) { 
        document.getElementById('scaleValue').innerText = scale;
    }
    
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    
    ctx.clearRect(0, 0, width, height);
    
    // Сетка
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 0.5;
    
    for (let x = 0; x <= width; x += scale) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    
    for (let y = 0; y <= height; y += scale) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
    
    // Оси
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();
    
    // Парабола
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    let first = true;
    
    for (let screenX = 0; screenX <= width; screenX++) {
        const x = (screenX - centerX) / scale;
        const y = a * x * x + b * x + c;
        const screenY = centerY - y * scale;
        
        if (screenY >= 0 && screenY <= height) {
            if (first) {
                ctx.moveTo(screenX, screenY);
                first = false;
            } else {
                ctx.lineTo(screenX, screenY);
            }
        } else {
            first = true;
        }
    }
    ctx.stroke();
    
    // Обновляем информацию
    if (document.getElementById('formulaDisplay')) {
        const signB = b >= 0 ? '+' : '-';
        const signC = c >= 0 ? '+' : '-';
        document.getElementById('formulaDisplay').innerHTML = 
            `y = ${a.toFixed(2)}x² ${signB} ${Math.abs(b).toFixed(2)}x ${signC} ${Math.abs(c).toFixed(2)}`;
    }
    
    if (a !== 0) {
        const x0 = -b / (2 * a);
        const y0 = a * x0 * x0 + b * x0 + c;
        
        if (document.getElementById('vertex')) {
            document.getElementById('vertex').innerHTML = `(${x0.toFixed(2)}; ${y0.toFixed(2)})`;
        }
        if (document.getElementById('axis')) {
            document.getElementById('axis').innerHTML = `x = ${x0.toFixed(2)}`;
        }
        if (document.getElementById('yIntercept')) {
            document.getElementById('yIntercept').innerHTML = `(0.00; ${c.toFixed(2)})`;
        }
        
        const D = b * b - 4 * a * c;
        if (document.getElementById('discriminant')) {
            document.getElementById('discriminant').innerHTML = D.toFixed(2);
        }
        
        if (document.getElementById('roots')) {
            if (D > 0) {
                const x1 = (-b + Math.sqrt(D)) / (2 * a);
                const x2 = (-b - Math.sqrt(D)) / (2 * a);
                document.getElementById('roots').innerHTML = `x₁ = ${x1.toFixed(2)}, x₂ = ${x2.toFixed(2)}`;
            } else if (D === 0) {
                const x = -b / (2 * a);
                document.getElementById('roots').innerHTML = `x = ${x.toFixed(2)}`;
            } else {
                document.getElementById('roots').innerHTML = `нет действительных корней`;
            }
        }
        
        if (document.getElementById('direction')) {
            document.getElementById('direction').innerHTML = a > 0 ? 'вверх' : 'вниз';
        }
        
        // Отмечаем вершину
        const vertexX = centerX + x0 * scale;
        const vertexY = centerY - y0 * scale;
        
        ctx.fillStyle = '#3498db';
        ctx.beginPath();
        ctx.arc(vertexX, vertexY, 6, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

function updateScale() {
    const scaleInput = document.getElementById('scale');
    if (scaleInput) {
        document.getElementById('scaleValue').innerText = scaleInput.value;
        draw();
    }
}

window.onload = function() {
    draw();
    const scaleInput = document.getElementById('scale');
    if (scaleInput) {
        scaleInput.addEventListener('input', updateScale);
    }
};