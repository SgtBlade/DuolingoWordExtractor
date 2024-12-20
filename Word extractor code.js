function exportToCSV(data, filename) {
    const csvContent = [["Native", "Translation"], ...data].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function extractWords() {
    const listItems = document.querySelectorAll('.fs-unmask section:nth-of-type(2) ul li');
    const extractedData = [];

    listItems.forEach(item => {
        const native = item.querySelector('h3')?.textContent.trim();
        const translation = item.querySelector('p')?.textContent.trim().replaceAll(',', '/');

        if (native && translation) {
            extractedData.push([native, translation]);
        }else {
            console.log(`Error on ${native, translation}`)
        }
    });

    return extractedData;
}

const wordsData = extractWords();
exportToCSV(wordsData, "Duo_words.csv");
