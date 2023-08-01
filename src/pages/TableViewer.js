import React from 'react';
import '../styles/TableViewer.css';
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Button, Descriptions, Space, Progress, Layout, Alert, Menu, theme } from 'antd';
const { Header, Content, Footer } = Layout;
import { saveAs } from 'file-saver';


import FolderUploader from '../components/FolderUploader';
import { QsFile } from '../entities/QsFile';
import { displayedSectionStructures } from '../utils/Configuration';
import SectionTable from '../components/SectionTable';
import { createEquipmentMap } from '../tasks/MapCreator';
import { createInputSheetForOneFile, createEvaluationSheetForOneFile, createControlSheetForOneFile, createChuanlianSheetForOneFile, createRongkangSheetForOneFile, createBianyaSheetForOneFile, createChangzhanSheetForOneFile, createXiandianSheetForOneFile, createJiaoxianSheetForOneFile, createFuheSheetForOneFile, createFadianSheetForOneFile, createMuxianSheetForOneFile, createCelueSheetForOneFile, createGuzhangSheetForOneFile } from '../tasks/SheetCreator';
import { createExcelForOneFile, startingCreatingCelueExcelForOneFileByLine, continuingCreatingCelueExcelForOneFileByLine, startingCreatingGuzhangExcelForOneFileByLine, continuingCreatingGuzhangExcelForOneFileByLine, startingCreatingSanfaExcelForOneFileByLine, continuingCreatingSanfaExcelForOneFileByLine } from '../tasks/ExcelCreator';

export default function TableViewer(props) {
    const [files, setFiles] = useState([]);
    const [fileInfoList, setFileInfoList] = useState([]);

    const [selectedFilename, setSelectedFilename] = useState('无');
    const [qsFile, setQsFile] = useState(null);
    const [progressPercent, setProgressPercent] = useState(0);
    const [tabNumber, setTabNumber] = useState(0);

    const folderUploaderRef = useRef(null);

    useEffect(() => {

    }, []);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const handleUploadingFiles = (files, fileInfoList) => {
        setFiles(files);
        setFileInfoList(fileInfoList);
    }

    const handleSelcetingFile = (filename) => {
        let file = [...files].find(($0) => {
            return $0.name === filename
        });
        let reader = new FileReader();
        reader.readAsText(file, 'gb18030');
        reader.onload = (event) => {
            let newQsFile = QsFile.newFromText(event.target.result);
            setQsFile(newQsFile);
            setSelectedFilename(filename);
            // console.log(newQsFile);
        };
    }

    const handleUploadingButtonClick = (event) => {
        folderUploaderRef.current.clickInput();
    }

    const handleExportingEquipmentMap = (event) => {
        if (qsFile !== null) {
            let equipmentMap = createEquipmentMap(qsFile);
            // https://yottabrain.org/blog/javascript/how-to-convert-string-to-blob/
            const blob = new Blob([JSON.stringify(equipmentMap, null, 2)], { type: 'application/json' });
            saveAs(blob, 'EquipmentMap.json');
        }
    }

    const handleExportingInputFeatureForOneFile = (event) => {
        if (qsFile !== null) {
            let sheet = createInputSheetForOneFile(qsFile);
            const blob = new Blob([sheet.join(' ')], { type: 'plain/text' });
            saveAs(blob, `${selectedFilename.split('.').slice(0, -1).join('.')}_InputFeature.txt`);
        }
    }

    const handleExportingEvaluationLabelForOneFile = (event) => {
        if (qsFile !== null) {
            let sheet = createEvaluationSheetForOneFile(qsFile);
            const blob = new Blob([sheet.join(' ')], { type: 'plain/text' });
            saveAs(blob, `${selectedFilename.split('.').slice(0, -1).join('.')}_EvaluationLabel.txt`);
        }
    }

    const handleExportingControlLabelForOneFile = async (event) => {
        if (qsFile !== null) {
            let sheet = createControlSheetForOneFile(qsFile);
            const blob = new Blob([sheet.join(' ')], { type: 'plain/text' });
            saveAs(blob, `${selectedFilename.split('.').slice(0, -1).join('.')}_EvaluationLabel.txt`);
        }
    }

    const handleExportingExcelForAllFiles = async (event) => {
        setProgressPercent(0);
        for (const [index, file] of [...files].entries()) {
            let qsFile = await QsFile.newFromFile(file);
            const buffer = await createExcelForOneFile(qsFile).xlsx.writeBuffer();
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, `${index}_${file.name.split('.').slice(0, -1).join('.')}.xlsx`);
            setProgressPercent((index * 100 / files.length).toFixed(2));
        }
    }

    const handleExportingCelueExcelForAllFilesByLine = async (event) => {
        setProgressPercent(0);
        let starter = startingCreatingCelueExcelForOneFileByLine();
        for (const [index, file] of [...files].entries()) {
            starter = await continuingCreatingCelueExcelForOneFileByLine(starter, file);
            setProgressPercent((index * 100 / files.length).toFixed(2));
        }

        const buffer = await starter.workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, `Celue.xlsx`);
    }

    const handleExportingGuzhangExcelForAllFilesByLine = async (event) => {
        setProgressPercent(0);
        let starter = startingCreatingGuzhangExcelForOneFileByLine();
        for (const [index, file] of [...files].entries()) {
            starter = await continuingCreatingGuzhangExcelForOneFileByLine(starter, file);
            setProgressPercent((index * 100 / files.length).toFixed(2));
        }

        const buffer = await starter.workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, `Guzhang.xlsx`);
    }

    const handleExportingSanfaExcelForAllFilesByLine = async (event) => {
        setProgressPercent(0);
        let starter = startingCreatingSanfaExcelForOneFileByLine();
        for (const [index, file] of [...files].entries()) {
            starter = await continuingCreatingSanfaExcelForOneFileByLine(starter, file);
            setProgressPercent((index * 100 / files.length).toFixed(2));
        }

        const buffer = await starter.workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, `Sanfa.xlsx`);
    }

    const handleCheckingSandongSectionForAllFiles = async (event) => {
        setProgressPercent(0);
        let str = '';
        for (const [index, file] of [...files].entries()) {
            let qsFile = await QsFile.newFromFile(file);
            let section = qsFile.getSection('第三道防线低频低压减载装置动作表::西北');
            console.log(section.rowCount);
            if (section.rowCount !== 0) {
                console.log(file.name);
                str += `${file.name}\n`;
            }
            setProgressPercent((index * 100 / files.length).toFixed(2));
        }
        if (str.length > 0) {
            const blob = new Blob([str], { type: 'plain/text' });
            saveAs(blob, `SandongFilenames.txt`);
        }
    }

    const handleExportingInputFeatureForAllFiles = async (event) => {
        setProgressPercent(0);
        let str = '';
        for (const [index, file] of [...files].entries()) {
            let qsFile = await QsFile.newFromFile(file);
            let sheet = createInputSheetForOneFile(qsFile);
            str += `${sheet.join(' ')}\n`;
            setProgressPercent((index * 100 / files.length).toFixed(2));
        }
        const blob = new Blob([str], { type: 'plain/text' });
        saveAs(blob, `InputFeature.txt`);
    }

    const handleExportingEvaluationLabelForAllFiles = async (event) => {
        setProgressPercent(0);
        let str = '';
        for (const [index, file] of [...files].entries()) {
            let qsFile = await QsFile.newFromFile(file);
            let sheet = createEvaluationSheetForOneFile(qsFile);
            str += `${sheet.join(' ')}\n`;
            setProgressPercent((index * 100 / files.length).toFixed(2));
        }
        const blob = new Blob([str], { type: 'plain/text' });
        saveAs(blob, `EvaluationLabel.txt`);
    }

    const handleExportingControlLabelForAllFiles = async (event) => {
        setProgressPercent(0);
        let str = '';
        for (const [index, file] of [...files].entries()) {
            let qsFile = await QsFile.newFromFile(file);
            let sheet = createControlSheetForOneFile(qsFile);
            str += `${sheet.join(' ')}\n`;
            setProgressPercent((index * 100 / files.length).toFixed(2));
        }
        const blob = new Blob([str], { type: 'plain/text' });
        saveAs(blob, `ControlLabel.txt`);
    }

    const handleExportingChuanlianFeatureForAllFiles = async (event) => {
        setProgressPercent(0);
        let str = '';
        for (const [index, file] of [...files].entries()) {
            let qsFile = await QsFile.newFromFile(file);
            let sheet = createChuanlianSheetForOneFile(qsFile);
            str += `${sheet.join(' ')}\n`;
            setProgressPercent((index * 100 / files.length).toFixed(2));
        }
        const blob = new Blob([str], { type: 'plain/text' });
        saveAs(blob, `Chuanlian.txt`);
    }

    const handleExportingRongkangFeatureForAllFiles = async (event) => {
        setProgressPercent(0);
        let str = '';
        for (const [index, file] of [...files].entries()) {
            let qsFile = await QsFile.newFromFile(file);
            let sheet = createRongkangSheetForOneFile(qsFile);
            str += `${sheet.join(' ')}\n`;
            setProgressPercent((index * 100 / files.length).toFixed(2));
        }
        const blob = new Blob([str], { type: 'plain/text' });
        saveAs(blob, `Rongkang.txt`);
    }

    const handleExportingBianyaFeatureForAllFiles = async (event) => {
        setProgressPercent(0);
        let str = '';
        for (const [index, file] of [...files].entries()) {
            let qsFile = await QsFile.newFromFile(file);
            let sheet = createBianyaSheetForOneFile(qsFile);
            str += `${sheet.join(' ')}\n`;
            setProgressPercent((index * 100 / files.length).toFixed(2));
        }
        const blob = new Blob([str], { type: 'plain/text' });
        saveAs(blob, `Bianya.txt`);
    }

    const handleExportingXiandianFeatureForAllFiles = async (event) => {
        setProgressPercent(0);
        let str = '';
        for (const [index, file] of [...files].entries()) {
            let qsFile = await QsFile.newFromFile(file);
            let sheet = createXiandianSheetForOneFile(qsFile);
            str += `${sheet.join(' ')}\n`;
            setProgressPercent((index * 100 / files.length).toFixed(2));
        }
        const blob = new Blob([str], { type: 'plain/text' });
        saveAs(blob, `Xiandian.txt`);
    }

    const handleExportingJiaoxianFeatureForAllFiles = async (event) => {
        setProgressPercent(0);
        let str = '';
        for (const [index, file] of [...files].entries()) {
            let qsFile = await QsFile.newFromFile(file);
            let sheet = createJiaoxianSheetForOneFile(qsFile);
            str += `${sheet.join(' ')}\n`;
            setProgressPercent((index * 100 / files.length).toFixed(2));
        }
        const blob = new Blob([str], { type: 'plain/text' });
        saveAs(blob, `Jiaoxian.txt`);
    }

    const handleExportingFuheFeatureForAllFiles = async (event) => {
        setProgressPercent(0);
        let str = '';
        for (const [index, file] of [...files].entries()) {
            let qsFile = await QsFile.newFromFile(file);
            let sheet = createFuheSheetForOneFile(qsFile);
            str += `${sheet.join(' ')}\n`;
            setProgressPercent((index * 100 / files.length).toFixed(2));
        }
        const blob = new Blob([str], { type: 'plain/text' });
        saveAs(blob, `Fuhe.txt`);
    }

    const handleExportingFadianFeatureForAllFiles = async (event) => {
        setProgressPercent(0);
        let str = '';
        for (const [index, file] of [...files].entries()) {
            let qsFile = await QsFile.newFromFile(file);
            let sheet = createFadianSheetForOneFile(qsFile);
            str += `${sheet.join(' ')}\n`;
            setProgressPercent((index * 100 / files.length).toFixed(2));
        }
        const blob = new Blob([str], { type: 'plain/text' });
        saveAs(blob, `Fadian.txt`);
    }

    const handleExportingMuxianFeatureForAllFiles = async (event) => {
        setProgressPercent(0);
        let str = '';
        for (const [index, file] of [...files].entries()) {
            let qsFile = await QsFile.newFromFile(file);
            let sheet = createMuxianSheetForOneFile(qsFile);
            str += `${sheet.join(' ')}\n`;
            setProgressPercent((index * 100 / files.length).toFixed(2));
        }
        const blob = new Blob([str], { type: 'plain/text' });
        saveAs(blob, `Muxian.txt`);
    }

    const handleExportingChangzhanFeatureForAllFiles = async (event) => {
        setProgressPercent(0);
        let str = '';
        for (const [index, file] of [...files].entries()) {
            let qsFile = await QsFile.newFromFile(file);
            let sheet = createChangzhanSheetForOneFile(qsFile);
            str += `${sheet.join(' ')}\n`;
            setProgressPercent((index * 100 / files.length).toFixed(2));
        }
        const blob = new Blob([str], { type: 'plain/text' });
        saveAs(blob, `Changzhan.txt`);
    }

    const handleExportingAllForAllFiles = async (event) => {
        await handleExportingGuzhangFeatureForAllFiles()
        await handleExportingCelueFeatureForAllFiles()
        await handleExportingChuanlianFeatureForAllFiles()
        await handleExportingRongkangFeatureForAllFiles()
        await handleExportingBianyaFeatureForAllFiles()
        await handleExportingXiandianFeatureForAllFiles()
        await handleExportingJiaoxianFeatureForAllFiles()
        await handleExportingFuheFeatureForAllFiles()
        await handleExportingFadianFeatureForAllFiles()
        await handleExportingMuxianFeatureForAllFiles()
        await handleExportingChangzhanFeatureForAllFiles()
    }

    const handleExportingGuzhangFeatureForAllFiles = async (event) => {
        setProgressPercent(0);
        let str = '';
        for (const [index, file] of [...files].entries()) {
            let qsFile = await QsFile.newFromFile(file);
            let sheet = createGuzhangSheetForOneFile(qsFile);
            str += `${sheet.join(' ')}\n`;
            setProgressPercent((index * 100 / files.length).toFixed(2));
        }
        const blob = new Blob([str], { type: 'plain/text' });
        saveAs(blob, `Guzhang.txt`);
    }

    const handleExportingCelueFeatureForAllFiles = async (event) => {
        setProgressPercent(0);
        let str = '';
        for (const [index, file] of [...files].entries()) {
            let qsFile = await QsFile.newFromFile(file);
            let sheet = createCelueSheetForOneFile(qsFile);
            str += `${sheet.join(' ')}\n`;
            setProgressPercent((index * 100 / files.length).toFixed(2));
        }
        const blob = new Blob([str], { type: 'plain/text' });
        saveAs(blob, `Celue.txt`);
    }

    const renderSectionTable = () => {
        if (qsFile !== null) {
            let structure = displayedSectionStructures[tabNumber - 1];
            return (
                <SectionTable
                    key={structure.name}
                    keys={structure.keys}
                    section={qsFile.getSection(structure.name)}
                />
            );
        } else {
            return (
                <Alert
                    message='未选择数据'
                    description='请在主页上传数据目录后，选择需要展示的数据文件。'
                    type='error'
                />
            );
        }
    }

    const renderAllSectionTable = () => {
        if (qsFile !== null) {
            return displayedSectionStructures.map((structure) => {
                return (
                    <SectionTable
                        key={structure.name}
                        keys={structure.keys}
                        section={qsFile.getSection(structure.name)}
                    />
                );
            });
        } else {
            return null;
        }
    }

    const renderMenu = () => {
        return (
            <Menu
                theme='dark'
                mode='horizontal'
                defaultSelectedKeys={['1']}
                items={new Array(displayedSectionStructures.length + 1).fill(null).map((_, index) => {
                    const key = index + 1;
                    return {
                        key,
                        label: index === 0 ? '主页' : `${displayedSectionStructures[index - 1].abbreviation}`,
                        onClick: () => { setTabNumber(index) }
                    };
                })}
            />
        );
    }

    const renderContent = () => {
        if (tabNumber === 0) {
            return (
                <div>
                    <FolderUploader
                        handleUploadingFiles={handleUploadingFiles}
                        handleSelcetingFile={handleSelcetingFile}
                        onRef={folderUploaderRef}
                        fileInfoList={fileInfoList}
                    />

                    <Descriptions title='数据集信息' bordered>
                        <Descriptions.Item label='样本数量'>{files.length}</Descriptions.Item>
                        <Descriptions.Item label='展示样本'>{selectedFilename}</Descriptions.Item>
                        <Descriptions.Item label='输入'>
                            <Button onClick={handleUploadingButtonClick}>
                                打开
                            </Button>
                        </Descriptions.Item>
                        <Descriptions.Item label='单样本动作' span={3}>
                            <Space>
                                <Button onClick={handleExportingEquipmentMap}>
                                    导出设备映射
                                </Button>
                                <Button onClick={handleExportingInputFeatureForOneFile}>
                                    导出输入特征
                                </Button>
                                <Button onClick={handleExportingEvaluationLabelForOneFile}>
                                    导出评估标签
                                </Button>
                                <Button onClick={handleExportingControlLabelForOneFile}>
                                    导出控制标签
                                </Button>
                            </Space>
                        </Descriptions.Item>
                        <Descriptions.Item label='数据集动作' span={3}>
                            <Space>
                                <Button onClick={handleExportingAllForAllFiles}>
                                    导出全部
                                </Button>
                                <Button onClick={handleExportingExcelForAllFiles}>
                                    导出全部表格
                                </Button>
                                <Button onClick={handleCheckingSandongSectionForAllFiles}>
                                    检查三动表
                                </Button>
                                <Button onClick={handleExportingInputFeatureForAllFiles}>
                                    导出全部输入特征
                                </Button>
                                <Button onClick={handleExportingEvaluationLabelForAllFiles}>
                                    导出全部评估标签
                                </Button>
                                <Button onClick={handleExportingControlLabelForAllFiles}>
                                    导出全部控制标签
                                </Button>
                            </Space>
                        </Descriptions.Item>
                        <Descriptions.Item label='行表动作' span={3}>
                            <Button onClick={handleExportingGuzhangExcelForAllFilesByLine}>
                                导出故障表
                            </Button>
                            <Button onClick={handleExportingCelueExcelForAllFilesByLine}>
                                导出策略表
                            </Button>
                            <Button onClick={handleExportingSanfaExcelForAllFilesByLine}>
                                导出第三发电表
                            </Button>
                        </Descriptions.Item>
                        <Descriptions.Item label='数据表导出动作' span={3}>
                            <Space>
                                <Button onClick={handleExportingGuzhangFeatureForAllFiles}>
                                    故障
                                </Button>
                                <Button onClick={handleExportingCelueFeatureForAllFiles}>
                                    策略
                                </Button>
                                <Button onClick={handleExportingChuanlianFeatureForAllFiles}>
                                    串联
                                </Button>
                                <Button onClick={handleExportingRongkangFeatureForAllFiles}>
                                    容抗
                                </Button>
                                <Button onClick={handleExportingBianyaFeatureForAllFiles}>
                                    变压
                                </Button>
                                <Button onClick={handleExportingXiandianFeatureForAllFiles}>
                                    线点
                                </Button>
                                <Button onClick={handleExportingJiaoxianFeatureForAllFiles}>
                                    交线
                                </Button>
                                <Button onClick={handleExportingFuheFeatureForAllFiles}>
                                    负荷
                                </Button>
                                <Button onClick={handleExportingFadianFeatureForAllFiles}>
                                    发电
                                </Button>
                                <Button onClick={handleExportingMuxianFeatureForAllFiles}>
                                    母线
                                </Button>
                                <Button onClick={handleExportingChangzhanFeatureForAllFiles}>
                                    场站
                                </Button>
                            </Space>
                        </Descriptions.Item>
                        <Descriptions.Item label='动作进度' span={3}>
                            <Progress percent={progressPercent} />
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            );
        } else {
            return renderSectionTable();
        }
    }

    return (
        <div className='table-viewer'>
            <Layout className='layout'>
                <Header
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    {renderMenu()}
                </Header>
                <Content
                    style={{
                        padding: '0 50px',
                    }}
                >
                    {renderContent()}
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >

                </Footer>
            </Layout>
        </div >
    );
};