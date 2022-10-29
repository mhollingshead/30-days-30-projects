let canvas = document.createElement('canvas');
let keywords = [];

const readFileAsText = file => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader);
        reader.readAsText(file);
    });
}

const readFileAsDataURL = file => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader);
        reader.readAsDataURL(file);
    });
};

const renderKeywords = () => {
    // Clear the current keyword table
    const table = document.querySelector('#keyword-table');
    table.innerHTML = '';
    // Filter the keywords using the POS filters, and only show keywords that appear more than once
    const filteredKeywords = keywords.filter(w => w.pos.reduce((acc, pos) => acc || posFilter[pos], false) && w.words.count > 1);
    // Sort the keywords by occurance
    const sortedKeywords = filteredKeywords.sort((a, b) => b.words.count - a.words.count);
    // Render each keyword in the keyword table
    sortedKeywords.forEach(keyword => {
        // Each keyword has a row with general information about the keyword
        const info = document.createElement('tr');
        info.innerHTML = `
            <td class="keyword">${keyword.word}</td>
            <td class="pos">${keyword.pos.map(pos => posMap[pos].abbr).join(', ')}</td>
            <td>
                <span class="count">${keyword.words.count}</span>
                <span class="percent">(${(keyword.words.percent * 100).toFixed(2)}%)</span>
            </td>
            <td>
                <span class="count">${keyword.sentences.count}</span>
                <span class="percent">(${(keyword.sentences.percent * 100).toFixed(2)}%)</span>
            </td>
            <td>
                <span class="count">${keyword.paragraphs.count}</span>
                <span class="percent">(${(keyword.paragraphs.percent * 100).toFixed(2)}%)</span>
            </td>
            <td>
                <div class="graph">
                    ${[
                        { percent: keyword.words.percent, color: '#3366cc' }, 
                        { percent: keyword.sentences.percent, color: '#dc3912' }, 
                        { percent: keyword.paragraphs.percent, color: '#ff9900' }
                    ].sort((a, b) => b.percent - a.percent).reduce((acc, stat) => acc + `
                        <div class="bar" style="width:${stat.percent * 100}%;background-color: ${stat.color}"></div>
                    `, '')}
                </div>
            </td>
        `;
        // Add the caret programmatically so that we can rotate it
        const caretCell = document.createElement('td');
        caretCell.innerHTML = '<img class="icon" src="assets/svg/caret-down.svg" />';
        info.appendChild(caretCell);
        // Add the information row to the table
        table.appendChild(info);
        // Each keyword has a second row that shows the sentences that include it for context
        const context = document.createElement('tr');
        context.className = 'context hidden';
        context.innerHTML = `
            <td colspan="7">
                <ul>
                    ${keyword.sentences.list.reduce((acc, s) => {
                        return acc + `<li>${s.replaceAll(
                            new RegExp(keyword.word, 'gi'), 
                            `<mark class="highlight">$&</mark>`
                        )}</li>`
                    }, '')}
                </ul>
            </td>
        `;
        // Add the context row to the table
        table.appendChild(context);
        // Toggle context visibility on info row click
        info.addEventListener('click', () => {
            caretCell.querySelector('img').classList.toggle('rotate180');
            context.classList.toggle('hidden');
        });
    });
    // After the results are rendered, show them and hide the progress bar (if necessary)
    setTimeout(() => {
        if (!document.querySelector('.upload').classList.contains('hidden')) {
            document.querySelector('.upload').classList.toggle('hidden');
            document.querySelector('.progress').style.width = '0%';
            document.querySelector('.results').classList.toggle('hidden');
        }
    }, 500);
}

const analyzeKeywords = ({ paragraphs, sentences, words }) => {
    // Update the progress bar
    document.querySelector('.progress-heading').innerHTML = 'Analyzing Keywords...';
    document.querySelector('.progress').style.width = '100%';
    // Create a dictionary for all unique words
    const uniqueWords = {};
    // Populate our word dictionary
    words.forEach(word => {
        // Keep track of all possible POS for each word
        if (uniqueWords[word.word] && !uniqueWords[word.word].pos.includes(word.pos)) {
            uniqueWords[word.word].pos.push(word.pos);
        } else {
            uniqueWords[word.word] = { word: word.word, pos: [word.pos] }
        }
    });
    // Generate the stats for each keyword
    const keywordData = Object.values(uniqueWords).map(({ word, pos }) => {
        // Count how many times the word is present in the text
        const wordsCount = words.reduce((acc, w) => acc + (w.word === word), 0);
        // Count how many paragraphs contain the word
        const paragraphsCount = paragraphs.reduce((acc, p) => acc + getWords(p).includes(word), 0);
        // Get the sentences that include the word
        const sentenceList = sentences.filter(s => getWords(s).includes(word));
        // Count how many sentences include the word
        const sentencesCount = sentenceList.length;
        // Return all relevant information
        return {
            word: word,
            pos: pos,
            words: { count: wordsCount, percent: wordsCount / words.length },
            paragraphs: { count: paragraphsCount, percent: paragraphsCount / paragraphs.length },
            sentences: { count: sentencesCount, percent: sentencesCount / sentences.length, list: sentenceList }
        };
    });
    // Update the keyword list and render the keyword table
    keywords = keywordData;
    renderKeywords();
};

const readPdf = file => {
    // Read the file as a data URL
    readFileAsDataURL(file).then(pdfURL => {
        // Set the pdfjs worker source
        pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerPath;
        // Wrap the pdf rendering and ocr text recognition in an async function
        (async () => {
            // Initialize the pdf with pdfjs using the data URL
            const pdf = await pdfjsLib.getDocument({ url: pdfURL }).promise;
            // Get the total number of pages and update the progress bar
            const pages = pdf.numPages;
            document.querySelector('.upload').classList.toggle('hidden');
            document.querySelector('.progress-heading').innerHTML = 'Extracting keywords...';
            document.querySelector('#total-pages').innerHTML = pages;
            // Initialize our data object to store the text, paragraphs, sentences, and words
            const data = { text: '', paragraphs: [] };
            // Loop through each page of the pdf
            for (let i = 1; i <= pages; i++) {
                // Update the progress bar with the current page
                document.querySelector('#current-page').innerHTML = i;
                // Get the current page of the pdf
                const page = await pdf.getPage(i);
                // Get viewport width / height information to prepare the canvas
                const viewport = page.getViewport({ scale: 1 });
                const width = viewport.width;
                const height = viewport.height;
                canvas.width = width * pixelRatio;
                canvas.height = height * pixelRatio;
                canvas.style.width = `${width}px`;
                canvas.style.height = `${height}px`;
                const ctx = canvas.getContext('2d');
                ctx.scale(pixelRatio, pixelRatio);
                // Render the current page of the pdf in the canvas element
                const renderContext = { canvasContext: ctx, viewport: viewport };
                await page.render(renderContext).promise;
                // Send the canvas to tesseract.js to recognize the text
                const result = await Tesseract.recognize(canvas);
                // Format the paragraphs returned by the ocr
                const paragraphs = result.paragraphs.map(p => {
                    return p.text
                        // If any paragraphs contain double newlines, they most-likely contain
                        // multiple paragraphs, so temporarily replace it with a unique string
                        .replaceAll('\n\n', '<p-break>')
                        // Replace the single line-breaks with spaces
                        .replaceAll('\n', ' ')
                        // Replace the unique string with a linebreak
                        .replaceAll('<p-break>', '\n')
                });
                // Add the paragraphs to the total text
                data.text += paragraphs.join('\n');
                // Push the paragraphs to the paragraph array
                data.paragraphs.push(...paragraphs);
                // Update the progress bar
                document.querySelector('.progress').style.width = `${i / pages * 100}%`;
            }

            // Use winkNLP to subsection the text into sentences and words / their pos
            const { sentences, words } = subsection(data.text);
            // Add the subsectioned data to our data object
            data.sentences = sentences;
            data.words = words;
            // Analyze the keywords
            analyzeKeywords(data);
        })()
    });
};

const readTxt = file => {
    // Show the progress bar
    document.querySelector('.upload').classList.toggle('hidden');
    // Read the .txt file
    readFileAsText(file).then(text => {
        // Update the progress bar
        document.querySelector('.progress').style.width = `100%`;
        // Split the text by paragraph
        const paragraphs = text.split('\n').filter(p => p.trim() !== '');
        // Create the data object, adding the subsectioned text
        const data = {
            text: text,
            paragraphs: paragraphs,
            ...subsection(text)
        }
        // Analyze the keywords
        analyzeKeywords(data);
    });
}

const handleFileSubmit = () => {
    // Check for a file
    const file = document.querySelector('#file').files[0];
    if (!file) return;
    // Hide the results section
    document.querySelector('.results').classList = 'results hidden';
    // Determine the type of file that was uploaded (.pdf or .txt)
    // and handle accordingly
    if (file.type === 'application/pdf') {
        readPdf(file);
    } else if (file.type === 'text/plain') {
        readTxt(file);
    }
};

const handleTextSubmit = () => {
    // Check for text in the textarea
    const text = document.querySelector('#text').value;
    if (!text) return;
    // Hide the results section
    document.querySelector('.results').classList = 'results hidden';
    // Temporarily show the progress bar while we analyze the data
    document.querySelector('.upload').classList.toggle('hidden');
    document.querySelector('.progress').style.width = `100%`;
    // Split the text by paragraph
    const paragraphs = text.split('\n').filter(p => p.trim() !== '');
    // Create the data object, adding the subsectioned text
    const data = {
        text: text,
        paragraphs: paragraphs,
        ...subsection(text)
    }
    // Analyze the keywords
    analyzeKeywords(data);
}

// Add the POS text boxes in order to filter keywords by parts of speech
Object.entries(posMap).forEach(([pos, posInfo]) => {
    document.querySelector('.pos-filter').innerHTML += `
        <label title="${posInfo.full}">
            <input 
                type="checkbox" 
                id="${pos}" ${posFilter[pos] ? 'checked' : ''}
                onchange="posFilter[this.id] = this.checked; renderKeywords();"
            />
            ${posInfo.abbr}
        </label>
    `;
});
// Add listeners to the form submission buttons
document.querySelector('#file-submit').addEventListener('click', handleFileSubmit);
document.querySelector('#text-submit').addEventListener('click', handleTextSubmit);