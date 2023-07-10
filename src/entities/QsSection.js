class QsSection {
    /**
     * 
     *
     * @param {string} name name
     * @param {[[string]]} columns columns
     * @param {[string]} headers headers
     * @param {[string]} descriptions descriptions
     * @return {QsSection}
     */
    constructor(name, columns, headers, descriptions) {
        this.name = name
        this.columns = columns
        this.headers = headers
        this.descriptions = descriptions
    }

    static newFromText(text) {
        let name = '';
        let columns = [];
        let headers = [];
        let descriptions = [];
        for (const [index, line] of text.split('\n').entries()) {
            if (index === 0) {
                name = line.slice(1, -1).replace('/', '-');
            } else if (line.search(/<\/.*>/g) !== -1) {
                break;
            }
            let words = line.split(' ');
            if (words[0] === '@') {
                headers = words.slice(1, -1);
            } else if (words[0] === '//') {
                descriptions = words.slice(1, -1);
                if (columns.length == 0) {
                    columns = descriptions.map((_) => { return [] });
                }
            } else if (words[0] === '#') {
                if (columns.length == 0) {
                    columns = words.slice(1, -1).map((_) => { return [] });
                }
                for (const [postion, item] of words.slice(1, -1).entries()) {
                    columns[postion].push(item);
                }
            }
        }
        return new QsSection(name, columns, headers, descriptions);
    }

    /**
     * 
     * @param {string} header header
     * @return {int}
     */
    getIndex(header) {
        return this.headers.findIndex(($0) => { return $0 === header });
    }

    getDescription(header) {
        return this.descriptions[this.getIndex(header)];
    }

    getColumn(header) {
        return this.columns[this.getIndex(header)];
    }

    getRow(rowNumber) {
        return this.columns.map(($0) => { return $0[rowNumber] });
    }

    getItem(header, rowNumber) {
        return this.columns[this.getIndex(header)][rowNumber];
    }

    get columnCount() {
        return this.headers.length;
    }

    get rowCount() {
        if (this.columns.length === 0) {
            return 0;
        } else {
            return this.columns[0].length;
        }
    }

    /**
     * 
     * @param {[string]} headers headers
     * @param {(string, string) => [string]} preprocess (header, item) => [item]
     * @param {(QsSection, int) => bool} survey 
     * @param {bool} shouldFlattened shouldFlattened
     * @return {[[string]] | [string]}
     */
    getSheet(headers, preprocess, survey, shouldFlattened = true) {
        let sheet = [];
        for (let rowNumber = 0; rowNumber < this.rowCount; rowNumber ++) {
            let row = [];
            if (!survey(this, rowNumber)) {
                continue;
            }
            for (let columnNumber = 0; columnNumber < this.columnCount; columnNumber ++) {
                let header = this.headers[columnNumber];
                if (headers.includes(header)) {
                    row.push(...preprocess(header, this.getItem(header, rowNumber)));
                }
            }
            if (shouldFlattened) {
                sheet.push(...row);
            } else {
                sheet.push(row);
            }
        }
        return sheet;
    }
}

export {
    QsSection,
};