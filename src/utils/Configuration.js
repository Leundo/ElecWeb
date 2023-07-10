const sectionNamesWhichNeedToNaturalConnect = ['基于故障算例结果::西北'];

const displayedSectionStructures = [
    {
        name: '基于故障算例结果::西北',
        keys: ['recordid', 'stcase_no', 'lfcase_no', 'cont_no', 'cont_des', 'sysmar', 'actnote', 'tsamar', 'asamar', 'vsamar', 'vsasmar', 'vsadmar', 'fsamar', 'dampmar', 'dampmarclr', 'dampfreq', 'dampamp', 'dampdamp', 'dampphase', 'dampgennum', 'ssamar', 'ovldmar', 'ssavmar'],
        abbreviation: '故障算例',
    },
    {
        name: '控制策略搜索结果::西北',
        keys: ['lfcase_no', 'cont_no', 'appno', 'decitype', 'deci_load', 'decip', 'deciq', 'cont_des', 'deci_des', 'eletype', 'eleid', 'elename', 'dc_limit', 'dc_improved', 'dc_reduced', 'ctrltype'],
        abbreviation: '策略搜索',
    },
    {
        name: '第三道防线低频低压减载装置动作表::西北',
        keys: ['turnnum', 'cont_no', 'cutloadp', 'cutloadq', 'eletype'],
        abbreviation: '第三减载',
    },
    {
        name: '第三道防线发电机保护动作表::西北',
        keys: ['cont_no', 'valueunit', 'gen_no', 'gen_name', 'gencutp', 'gencutq', 'eletype', 'cont_des'],
        abbreviation: '第三发电',
    },
    {
        name: '串联补偿器表::西北',
        keys: ['id', 'name', 'status', 'pi', 'qi', 'pj', 'qj'],
        abbreviation: '串联补偿',
    },
    {
        name: '并联电容-电抗器表::西北',
        keys: ['id', 'name', 'status', 'q', 'i_a_value', 'i_b_value', 'i_c_value'],
        abbreviation: '电容电抗',
    },
    {
        name: '变压器表::西北',
        keys: ['id', 'name', 'status'],
        abbreviation: '变压器',
    },
    {
        name: '交流线段端点表::西北',
        keys: ['id', 'name', 'aclnseg_id', 'status', 'open_flag', 'p', 'q', 'i', 'v'],
        abbreviation: '线段端点',
    },
    {
        name: '交流线段表::西北',
        keys: ['id', 'name', 'status'],
        abbreviation: '交流线段',
    },
    {
        name: 'T交流线路表::西北',
        keys: ['id', 'name'],
        abbreviation: 'T交流',
    },
    {
        name: '负荷表::西北',
        keys: ['id', 'name', 'status', 'p', 'q', 'i'],
        abbreviation: '负荷',
    },
    {
        name: '发电机组表::西北',
        keys: ['id', 'name', 'status', 'kvnom', 'mvarate', 'p', 'q', 'i', 'v'],
        abbreviation: '发电机组',
    },
    {
        name: '母线表::西北',
        keys: ['id', 'name', 'status', 'v', 'ang', 'p_load', 'q_load'],
        abbreviation: '母线',
    },
    {
        name: '厂站表::西北',
        keys: ['id', 'name'],
        abbreviation: '厂站',
    },
];

const equipmentMapConfiguration = ['串联补偿器表::西北', '并联电容-电抗器表::西北', '变压器表::西北', '交流线段端点表::西北', '交流线段表::西北', 'T交流线路表::西北', '负荷表::西北', '发电机组表::西北', '母线表::西北', '厂站表::西北'];

const inputSectionStructures = [
    {
        name: '串联补偿器表::西北',
        keys: ['status', 'pi', 'qi', 'pj', 'qj'],
    },
    {
        name: '并联电容-电抗器表::西北',
        keys: ['status', 'q', 'i_a_value', 'i_b_value', 'i_c_value'],
    },
    {
        name: '变压器表::西北',
        keys: ['status'],
    },
    {
        name: '交流线段端点表::西北',
        keys: ['aclnseg_id', 'status', 'open_flag', 'p', 'q', 'i', 'v'],
    },
    {
        name: '交流线段表::西北',
        keys: ['status'],
    },
    {
        name: 'T交流线路表::西北',
        keys: [],
    },
    {
        name: '负荷表::西北',
        keys: ['status', 'p', 'q', 'i'],
    },
    {
        name: '发电机组表::西北',
        keys: ['status', 'kvnom', 'mvarate', 'p', 'q', 'i', 'v'],
    },
    {
        name: '母线表::西北',
        keys: ['status', 'v', 'ang', 'p_load', 'q_load'],
    },
];

const evaluationSectionStructures = [
    {
        name: '基于故障算例结果::西北',
        keys: ['recordid', 'stcase_no', 'lfcase_no', 'cont_no', 'sysmar', 'tsamar', 'asamar', 'vsamar', 'vsasmar', 'vsadmar', 'fsamar', 'dampmar', 'dampmarclr', 'dampfreq', 'dampamp', 'dampdamp', 'dampphase', 'dampgennum', 'ssamar', 'ovldmar', 'ssavmar'],
    },
]

const controlSectionStructures = [
    {
        name: '控制策略搜索结果::西北',
        keys: ['cont_no', 'decip', 'deciq', 'eleid', 'dc_limit', 'dc_improved', 'dc_reduced', 'ctrltype'],
    },
]

const chuanlianStructure = {
    name: '串联补偿器表::西北',
    keys: ['id', 'status', 'pi', 'qi', 'pj', 'qj'],
};

const rongkangStructure = {
    name: '并联电容-电抗器表::西北',
    keys: ['id', 'status', 'q', 'i_a_value', 'i_b_value', 'i_c_value'],
};

const bianyaStructure = {
    name: '变压器表::西北',
    keys: ['id', 'status'],
};

const xiandianStructure = {
    name: '交流线段端点表::西北',
    keys: ['id', 'aclnseg_id', 'status', 'open_flag', 'p', 'q', 'i', 'v'],
};

const jiaoxianStructure = {
    name: '交流线段表::西北',
    keys: ['id', 'status'],
}

const fuheStructure = {
    name: '负荷表::西北',
    keys: ['id', 'status', 'p', 'q', 'i'],
}

const fadianStructure = {
    name: '发电机组表::西北',
    keys: ['id', 'status', 'kvnom', 'mvarate', 'p', 'q', 'i', 'v'],
}

const muxianStructure = {
    name: '母线表::西北',
    keys: ['id', 'status', 'v', 'ang', 'p_load', 'q_load'],
}

const changzhanStructure = {
    name: '厂站表::西北',
    keys: ['id'],
};

const celueStrucutre = {
    name: '控制策略搜索结果::西北',
    keys: ['cont_no', 'eleid'],
}

const guzhangStrucutre = {
    name: '基于故障算例结果::西北',
    keys: ['sysmar', 'tsamar', 'asamar', 'vsamar', 'vsasmar', 'vsadmar', 'fsamar', 'dampmar', 'dampmarclr', 'dampfreq', 'dampamp', 'dampdamp', 'dampphase', 'dampgennum', 'ssamar', 'ovldmar', 'ssavmar'],
}

const sanfaStrucutre = {
    name: '第三道防线发电机保护动作表::西北',
    keys: ['cont_no', 'gen_no'],
}

export {
    sectionNamesWhichNeedToNaturalConnect,
    displayedSectionStructures,
    equipmentMapConfiguration,
    inputSectionStructures,
    evaluationSectionStructures,
    controlSectionStructures,

    celueStrucutre,
    chuanlianStructure,
    rongkangStructure,
    bianyaStructure,
    xiandianStructure,
    jiaoxianStructure,
    fuheStructure,
    fadianStructure,
    muxianStructure,
    changzhanStructure,
    guzhangStrucutre,
    sanfaStrucutre,
};