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

    // Preload and compress images
    const imagePromises = [];
    const compressedImages = {};
    selectedStudents.forEach(student => {
        const imgSrc = student.getAttribute('data-img');
        const fullImgSrc = `${baseUrl}${imgSrc}`;
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = fullImgSrc;
        imagePromises.push(
            new Promise((resolve, reject) => {
                img.onload = () => {
                    // Compress image using canvas
                    const canvas = document.createElement('canvas');
                    const size = 200; // Increased target size (width/height)
                    canvas.width = size;
                    canvas.height = size;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, size, size);
                    // Use JPEG compression, higher quality 0.85
                    const dataUrl = canvas.toDataURL('image/jpeg', 1);
                    compressedImages[imgSrc] = dataUrl;
                    resolve();
                };
                img.onerror = () => {
                    console.error(`Failed to load image: ${fullImgSrc}`);
                    resolve(); // Resolve even on error to continue
                };
            })
        );
    });

    // Wait for all images to load and compress before generating the print content
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
                        width: 200px;
                        height: 200px;
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
            const compressedSrc = compressedImages[imgSrc] || '';
            printContent += `
                <div class="print-student">
                    <img src="${compressedSrc}" alt="${name}">
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
            // Save as file after print
            const now = new Date();
            const pad = n => n.toString().padStart(2, '0');
            const dateStr = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`;
            const timeStr = `${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
            const filename = `students attendance - ${dateStr} ${timeStr}.html`;
            // Create a blob and trigger download
            const blob = new Blob([printContent], {type: 'text/html'});
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
    }).catch(err => {
        console.error("Error preloading images:", err);
        alert("Failed to load some images. Please try again.");
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Make student card body clickable to toggle attendance
    document.querySelectorAll('.student-card .card-body').forEach(function(cardBody) {
        cardBody.addEventListener('click', function(e) {
            // Prevent toggling if the actual checkbox was clicked
            if (e.target.classList.contains('attendance')) return;
            const checkbox = cardBody.querySelector('.attendance');
            if (checkbox) {
                checkbox.checked = !checkbox.checked;
                // Optionally, trigger change event if you have listeners
                checkbox.dispatchEvent(new Event('change'));
            }
        });
    });
});
