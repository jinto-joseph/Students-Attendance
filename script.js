function submitAttendance() {
    const selectedStudents = document.querySelectorAll('.attendance:checked');
    
    if (selectedStudents.length === 0) {
        alert("Please select at least one student!");
        return;
    }

    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();

    let printContent = `
        <html>
        <head>
            <style>
                body { font-family: 'Poppins', sans-serif; padding: 20px; }
                .print-student { display: flex; align-items: center; margin: 15px 0; }
                .print-student img { width: 60px; height: 60px; border-radius: 50%; margin-right: 15px; }
                h2 { font-weight: 600; }
            </style>
        </head>
        <body>
            <h2>Attendance Report - ${dateString} ${timeString}</h2>
    `;

    selectedStudents.forEach(student => {
        const name = student.getAttribute('data-name');
        const reg = student.getAttribute('data-reg');
        const imgSrc = student.getAttribute('data-img');
        printContent += `
            <div class="print-student">
                <img src="${imgSrc}" alt="${name}">
                <p>${name} (Reg: ${reg})</p>
            </div>
        `;
    });

    printContent += `</body></html>`;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
}