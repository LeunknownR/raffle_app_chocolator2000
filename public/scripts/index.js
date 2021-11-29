// What is use 'strict'?
const Random = (participants) => {
    const taken = [];
    let written = '<ul>';
    for (let i = 0; i < 2; i++) {
        written += '<li>';
        let idx = 0;
        do {
            idx = parseInt(Math.random()*participants.length);
        }
        while (taken.includes(idx));
        
        written += participants[idx];
        taken.push(idx);
        written += '</li>';
    }
    written += '</ul>';
    document.body.innerHTML = written;
}
// Random(['Ralf', 'Gianella', 'Maycol', 'Alexis']);