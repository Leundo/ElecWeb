import { inputSectionStructures, evaluationSectionStructures, controlSectionStructures, chuanlianStructure, rongkangStructure, bianyaStructure, changzhanStructure, xiandianStructure, jiaoxianStructure, fuheStructure, fadianStructure, muxianStructure, celueStrucutre, guzhangStrucutre, sanfaStrucutre } from '../utils/Configuration';
import localEquipmentMap from '../data/EquipmentMap.json';
import { contNoMap } from './MapCreator';


const preprocess = (header, item) => {
    if (header === 'id') {
        let entry = localEquipmentMap[item];
        if (entry === undefined) {
            console.error(`Could not found id ${item}.`)
        } else {
            return [entry['taipu'].toString(), entry['number'].toString()];
        }
    } else if (header === 'eleid') {
        let entry = localEquipmentMap[item];
        if (entry === undefined) {
            console.error(`Could not found eleid ${item}.`)
        } else {
            return [entry['taipu'].toString(), entry['number'].toString()];
        }
    } else if (['name', 'recordid', 'lfcase_no'].includes(header)) {
        return [];
    } else if (header === 'cont_no') {
        let entry = contNoMap[item];
        if (entry === undefined) {
            console.error(`Could not found cont_no ${item}.`)
        } else {
            return [entry];
        }
    } else if (header === 'gen_no') {
    }
    return [item];
}

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

const createInputSheetForOneFile = (qsFile) => {
    let sheet = [];
    for (const structure of inputSectionStructures) {
        let section = qsFile.getSection(structure.name);
        sheet.push(...section.getSheet(structure.keys, preprocess, createSurvey(structure.name), true));
    }
    console.log(sheet.length);
    return sheet;
}

const createEvaluationSheetForOneFile = (qsFile) => {
    let sheet = [];
    for (const structure of evaluationSectionStructures) {
        let section = qsFile.getSection(structure.name);
        sheet.push(...section.getSheet(structure.keys, preprocess, createSurvey(structure.name), true));
    }
    console.log(sheet.length);
    return sheet;
}

const createControlSheetForOneFile = (qsFile) => {
    let sheet = [];
    for (const structure of controlSectionStructures) {
        let section = qsFile.getSection(structure.name);
        sheet.push(...section.getSheet(structure.keys, preprocess, createSurvey(structure.name), true));
    }
    console.log(sheet.length);
    return sheet;
}

const createChuanlianSheetForOneFile = (qsFile) => {
    let sheet = [];
    let section = qsFile.getSection(chuanlianStructure.name);
    sheet.push(...section.getSheet(chuanlianStructure.keys, preprocess, createSurvey(chuanlianStructure.name), true));
    console.log(sheet.length);
    return sheet;
}

const createRongkangSheetForOneFile = (qsFile) => {
    let sheet = [];
    let section = qsFile.getSection(rongkangStructure.name);
    sheet.push(...section.getSheet(rongkangStructure.keys, preprocess, createSurvey(rongkangStructure.name), true));
    console.log(sheet.length);
    return sheet;
}

const createBianyaSheetForOneFile = (qsFile) => {
    let sheet = [];
    let section = qsFile.getSection(bianyaStructure.name);
    sheet.push(...section.getSheet(bianyaStructure.keys, preprocess, createSurvey(bianyaStructure.name), true));
    console.log(sheet.length);
    return sheet;
}

const createXiandianSheetForOneFile = (qsFile) => {
    let sheet = [];
    let section = qsFile.getSection(xiandianStructure.name);
    sheet.push(...section.getSheet(xiandianStructure.keys, preprocess, createSurvey(xiandianStructure.name), true));
    console.log(sheet.length);
    return sheet;
}

const createJiaoxianSheetForOneFile = (qsFile) => {
    let sheet = [];
    let section = qsFile.getSection(jiaoxianStructure.name);
    sheet.push(...section.getSheet(jiaoxianStructure.keys, preprocess, createSurvey(jiaoxianStructure.name), true));
    console.log(sheet.length);
    return sheet;
}

const createChangzhanSheetForOneFile = (qsFile) => {
    let sheet = [];
    let section = qsFile.getSection(changzhanStructure.name);
    sheet.push(...section.getSheet(changzhanStructure.keys, preprocess, createSurvey(changzhanStructure.name), true));
    console.log(sheet.length);
    return sheet;
}

const createFuheSheetForOneFile = (qsFile) => {
    let sheet = [];
    let section = qsFile.getSection(fuheStructure.name);
    sheet.push(...section.getSheet(fuheStructure.keys, preprocess, createSurvey(fuheStructure.name), true));
    console.log(sheet.length);
    return sheet;
}

const createFadianSheetForOneFile = (qsFile) => {
    let sheet = [];
    let section = qsFile.getSection(fadianStructure.name);
    sheet.push(...section.getSheet(fadianStructure.keys, preprocess, createSurvey(fadianStructure.name), true));
    console.log(sheet.length);
    return sheet;
}

const createMuxianSheetForOneFile = (qsFile) => {
    let sheet = [];
    let section = qsFile.getSection(muxianStructure.name);
    sheet.push(...section.getSheet(muxianStructure.keys, preprocess, createSurvey(muxianStructure.name), true));
    console.log(sheet.length);
    return sheet;
}

const createCelueSheetForOneFile = (qsFile) => {
    let sheet = [];
    let section = qsFile.getSection(celueStrucutre.name);
    sheet.push(...section.getSheet(celueStrucutre.keys, preprocess, createSurvey(celueStrucutre.name), true));
    console.log(sheet.length);
    return sheet;
}

const createGuzhangSheetForOneFile = (qsFile) => {
    let sheet = [];
    let section = qsFile.getSection(guzhangStrucutre.name);
    sheet.push(...section.getSheet(guzhangStrucutre.keys, preprocess, createSurvey(guzhangStrucutre.name), true));
    console.log(sheet.length);
    return sheet;
}

const createSanfaSheetForOneFile = (qsFile) => {
    let sheet = [];
    let section = qsFile.getSection(sanfaStrucutre.name);
    sheet.push(...section.getSheet(sanfaStrucutre.keys, preprocess, createSurvey(sanfaStrucutre.name), true));
    console.log(sheet.length);
    return sheet;
}

export {
    createInputSheetForOneFile,
    createEvaluationSheetForOneFile,
    createControlSheetForOneFile,

    createGuzhangSheetForOneFile,
    createCelueSheetForOneFile,
    createSanfaSheetForOneFile,
    createChuanlianSheetForOneFile,
    createRongkangSheetForOneFile,
    createBianyaSheetForOneFile,
    createXiandianSheetForOneFile,
    createJiaoxianSheetForOneFile,
    createFuheSheetForOneFile,
    createFadianSheetForOneFile,
    createMuxianSheetForOneFile,
    createChangzhanSheetForOneFile,
};