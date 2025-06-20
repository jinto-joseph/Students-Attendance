function submitAttendance() {
    const selectedStudents = document.querySelectorAll('.attendance:checked');
    
    if (selectedStudents.length === 0) {
        alert("Please select at least one student!");
        return;
    }

    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();

    // Hardcoded GitHub Pages base URL
    const baseUrl = 'https://jinto-joseph.github.io/Students-Attendance/';

    // Preload images to ensure they are available for printing
    const imagePromises = [];
    selectedStudents.forEach(student => {
        const imgSrc = student.getAttribute('data-img');
        const fullImgSrc = `${baseUrl}${imgSrc}`;
        const img = new Image();
        img.src = fullImgSrc;
        imagePromises.push(
            new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = () => {
                    console.error(`Failed to load image: ${fullImgSrc}`);
                    resolve(); // Resolve even on error to continue
                };
            })
        );
    });

    // Wait for all images to load before generating the print content
    Promise.all(imagePromises).then(() => {
        let printContent = `
            <html>
            <head>
                <style>
                    body {
                        font-family: 'Poppins', sans-serif;
                        padding: 20px;
                        margin: 0;
                        color: #333;
                    }
                    h2 {
                        font-weight: 600;
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .print-student {
                        display: flex;
                        align-items: center;
                        margin: 15px 0;
                        padding: 10px;
                        border-bottom: 1px solid #eee;
                    }
                    .print-student img {
                        width: 60px;
                        height: 60px;
                        border-radius: 50%;
                        margin-right: 15px;
                        object-fit: cover;
                        border: 2px solid #007bff;
                    }
                    .print-student p {
                        margin: 0;
                        font-size: 16px;
                    }
                    @media print {
                        .print-student {
                            break-inside: avoid;
                        }
                    }
                </style>
            </head>
            <body>
                <h2>Attendance Report - ${dateString} ${timeString}</h2>
        `;

        selectedStudents.forEach(student => {
            const name = student.getAttribute('data-name');
            const reg = student.getAttribute('data-reg');
            const imgSrc = student.getAttribute('data-img');
            const fullImgSrc = `${baseUrl}${imgSrc}`;
            printContent += `
                <div class="print-student">
                    <img src="${fullImgSrc}" alt="${name}">
                    <p>${name} (Reg: ${reg})</p>
                </div>
            `;
        });

        printContent += `</body></html>`;

        const printWindow = window.open('', '_blank');
        printWindow.document.write(printContent);
        printWindow.document.close();

        // Wait for the print window to fully render before printing
        printWindow.onload = () => {
            printWindow.print();
        };
    }).catch(err => {
        console.error("Error preloading images:", err);
        alert("Failed to load some images. Please try again.");
    });
}