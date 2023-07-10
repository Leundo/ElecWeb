import { displayedSectionStructures } from '../utils/Configuration';
import ExcelJS from 'exceljs';


const createSurvey = (structureName) => {
    if (structureName === '控制策略搜索结果::西北') {
        return (section, rowNumber) => {
            if (section.getItem('appno', rowNumber) === '1' && section.getItem('eletype', rowNumber) === '1') {
                return true;
            }
            return false;
        };
    } else if (structureName === '基于故障算例结果::西北') {
        return (section, rowNumber) => {
            if (section.getItem('recordid', rowNumber) === '2581688486390136835' || section.getItem('recordid', rowNumber) === '2581688486390136836') {
                return true;
            }
            return false;
        };
    }
    return (section, rowNumber) => { return true; };
}

const createRows = (qsSection, keys, survey) => {
    return [...Array(qsSection.rowCount).keys()].reduce((accumulator, currentRowNumber) => {
        if (survey(qsSection, currentRowNumber)) {
            return [
                ...accumulator,
                keys.map((key) => {
                    return qsSection.getItem(key, currentRowNumber);
                }),
            ];
        }
        return [...accumulator];
    }, []);
}

const createExcelForOneFile = (qsFile) => {
    let workbook = new ExcelJS.Workbook();
    workbook.creator = 'Leundo';
    for (const structure of displayedSectionStructures) {
        let sheet = workbook.addWorksheet(structure.name.replace('::', '-'));
        let section = qsFile.getSection(structure.name);
        sheet.columns = structure.keys.map(($0) => {
            return { header: $0, key: $0, width: 30, style: { font: { size: 18 } } };
        });
        sheet.addRow(structure.keys.map(($0) => {
            return section.getDescription($0);
        }));
        sheet.addRows(createRows(section, structure.keys, createSurvey(structure.name)));
    }
    return workbook;
}


export {
    createExcelForOneFile
};