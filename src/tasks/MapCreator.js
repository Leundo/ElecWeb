import { equipmentMapConfiguration } from '../utils/Configuration';
import { zip } from '../utils/Knife';

/**
 * 
 * @param {QsFile} qsFile qsFile
 * @return {object}
 */
const createEquipmentMap = (qsFile) => {
    let equipmentMap = {};
    for (const [taipu, name] of equipmentMapConfiguration.entries()) {
        const section = qsFile.getSection(name);
        const idIndex = section.getIndex('id');
        const equipmentNameIndex = section.getIndex('name');
        for (let number = 0; number < section.columns[idIndex].length; number++) {
            equipmentMap[section.columns[idIndex][number]] = {
                name: section.columns[equipmentNameIndex][number],
                taipu: taipu,
                number: number
            }
        }
    }
    return equipmentMap;
}

const contNoMap = {
    '2542281989650645103': '0',
    '2542281989650645169': '1',
}


export {
    createEquipmentMap,
    contNoMap,
};