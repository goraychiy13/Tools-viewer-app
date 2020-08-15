import { Form, Input, Layout, Table } from "antd";
import { LabeledValue } from "antd/lib/select";
import axios from "axios";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { getSiteCaption } from "../utils/utils";
import { Tool } from "../models/tool.model";
import { toolTypes } from "../data/tool-types.data";

const { Content } = Layout;

// import { connect, useDispatch } from "react-redux";
// import { getRepositories, } from "../Redux/Redux-Saga/saga-repositories-page"
// import { handleChange, getRepositories } from "../Redux/Reducers/repositories-page-reducer";
// import { handleChange, getRepositories } from "../Redux/Reducers/repositoiresPageReducer"

// interface TagNamesProps {
//     repositoryData: StateNewRepositoryData[];
//     getRepositories: (organizationName: string) => void;
// }

interface ToolsState { 
    tools: Tool[], 
    filteredTools: Tool[],
    query: string;
}

const { Search } = Input;

export const ToolsPage: FunctionComponent = (props) => {

    const refSearch = useRef<any>(null);
    
    let [stateToolsData, setStateTools] = useState<ToolsState>({
        tools: [],
        filteredTools: [],
        query: ''
    });

    let [stateSortedInfo, setStateSortedInfo] = useState<any>({
        sortedInfo: []
    });

    const columns = [
        {
            title: "Tool name",
            dataIndex: "name",
            key: "name",
            sorter: function(a: Tool, b: Tool){
                if(a.name < b.name) { return -1; }
                if(a.name > b.name) { return 1; }
                return 0;
            },
            sortOrder: stateSortedInfo.sortedInfo.columnKey === 'name' && 
            stateSortedInfo.sortedInfo.order,
            ellipsis: true
        },
        {
            title: "Used on",
            dataIndex: "sites",
            key: "sites",
            ellipsis: true,
            render: (siteNumber: number) => (
                getSiteCaption(siteNumber)
            )
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
            ellipsis: true,
            render: (type: string) => (
                <span className="type">{toolTypes[type]}</span>
            )
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            ellipsis: true,
            render: (status: string) => 
                status === 'enable' ? (<div className="status status-on">ON</div>) :
                status === 'disable' ? (<div className="status status-off">OFF</div>) :
                <div><img src="images/lock.jpg" alt=""/></div>
        }
    ];

    const handleChange = (pagination: any, filters: any, sorter: any) => {
        setStateSortedInfo({
            sortedInfo: sorter
        });
    };

    const getTagNames = async () => {
        const options = {
            headers: {
                "Accept": "application/json"
            }
        }
        axios.get('https://jsoneditoronline.herokuapp.com/v1/docs/a60440dc240e45afa65fa68a060af624', options)
            .then(
                (response: any) => {
                    const tools: Tool[] = JSON.parse(response.data.data.replace(/(?:\r\n|\r|\n)/g, ''));
                    setStateTools({
                        ...stateToolsData,
                        tools: tools.map((tool: Tool) => {
                            return {
                                ...tool,
                                key: tool.id
                            }
                        }),
                        filteredTools: tools.map((tool: Tool) => {
                            return {
                                ...tool,
                                key: tool.id
                            }
                        })
                    })
                }
            ).catch(
                (error: any) => {
                    // console.log(error)
                    // warning();
                }
            )

    }
    // const onChange = (pagination: number, filters: any, sorter: any, extra: any) => {
    //     console.log('params', pagination, filters, sorter, extra);
    // }
    useEffect(() => {
        getTagNames();
    }, [])

    return (
        <Layout className="layout">
            <Form
                ref={refSearch}
                initialValues={{
                    SearchInput: ''
                }}
            >
                <Content style={{ padding: '10px 10px' }}>
                    <Form.Item
                        name={'SearchInput'}
                    >
                        <Search
                            className={stateToolsData.query !== '' ? 'empty-search' : ''}
                            onKeyUpCapture={(e: any) => {
                                const query: string = e.target.value;
                                setStateTools({
                                    ...stateToolsData,
                                    filteredTools: stateToolsData.tools.filter(
                                        (tool: Tool) => tool.name.toLowerCase().includes(query)
                                    ),
                                    query: query
                                })
                                // props.getRepositories.call(Repositories, await refSearch.current?.getFieldsValue().SearchInput);
                            }}
                        />
                    </Form.Item>
                </Content>
                
                <Content style={{ padding: '10px 10px' }}>
                {
                    <Table
                        pagination={false}
                        loading={stateToolsData.tools?.length ? false : true}
                        columns={columns} dataSource={stateToolsData.filteredTools}
                        onChange={handleChange}
                        rowKey="key"
                    />
                }
                </Content>
            </Form>
        </Layout>
    )
}

// let mapStateToProps = (state: any) => {
//     return {
//         repositoryData: state.repositoriesPage?.repositoryData,
//         sortedInfo: state.repositoriesPage?.sortedInfo,
//         notFoundError: state.repositoriesPage?.notFoundError
//     }
// }

// export const RepositoriesContainer = connect(mapStateToProps,
//     { getRepositories, handleChange })(Repositories)