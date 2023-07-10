import { QsSection } from './QsSection';
import { zip, isScalarArraysEqual } from '../utils/Knife';

import { sectionNamesWhichNeedToNaturalConnect } from '../utils/Configuration';


class QsFile {

    constructor(sections) {
        this.sections = sections
    }

    static newFromText(text) {
        const regex = /^<[^!]*?>[\s\S]*?<\/.*>$/gm;
        const matchedTexts = [...text.matchAll(regex)];
        let sections = matchedTexts.map(($0) => { return QsSection.newFromText($0[0]) })
        let qsFile = new QsFile(sections);
        for (const name of sectionNamesWhichNeedToNaturalConnect) {
            qsFile.naturalConnect(name);
        }
        return qsFile;
    }

    static async newFromFile(file) {
        let reader = new FileReader();
        reader.readAsText(file, 'gb18030');
        const promise = new Promise((resolve, reject) => {
            reader.onload = (event) => {
                resolve(QsFile.newFromText(event.target.result));
            };
        });
        return await promise;
    }

    getSection(name) {
        return this.sections.find(($0) => { return $0.name === name });
    }

    drop(names) {
        this.sections = this.sections.filter((section) => { return !names.includes(section.name) });
    }

    naturalConnect(name) {
        let cached_sections = [];
        for (const section of this.sections) {
            if (section.name === name) {
                cached_sections.push(section);
            }
        }
        let cached_headers = [];
        let cached_descriptions = [];
        let cached_columns = [];
        for (const section of cached_sections) {
            for (const [header, description, column] of zip(section.headers, section.descriptions, section.columns)) {
                if (!cached_headers.includes(header)) {
                    cached_headers.push(header);
                    cached_descriptions.push(description);
                    cached_columns.push(column);
                } else {
                    let index = cached_headers.findIndex(($0) => {return $0 === header});
                    if (!isScalarArraysEqual(cached_columns[index], column)) {
                        console.error(`${header} is not equal!`);
                    }
                }
            }
        }
        this.drop([name]);
        let newSection = new QsSection(name, cached_columns, cached_headers, cached_descriptions);
        this.sections.push(newSection);
        return newSection;
    }
}

export {
    QsFile,
};