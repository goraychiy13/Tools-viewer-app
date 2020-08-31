import { Form, Input, Layout, Table } from "antd";
import React, { useEffect, FunctionComponent, useRef } from "react";
import { connect } from "react-redux";
import { toolTypes } from "../data/tool-types.data";
import { Tool, ToolsPageProps } from "../models/tool.model";
import { getTagNames, handleChange, setStateFilteredToolsToState, setStateQueryToState, setStateToolsToState } from "../redux/reducers/tool-page-reducer";
import store from "../redux/redux-store";
import { getSiteCaption } from "../utils/utils";

const { Content } = Layout;
const { Search } = Input;

export const ToolsPage: FunctionComponent<ToolsPageProps> = (props) => {

    const columns = [
        {
            title: "Tool name",
            dataIndex: "name",
            key: "name",
            sorter: function (a: Tool, b: Tool) {
                if (a.name < b.name) { return -1; }
                if (a.name > b.name) { return 1; }
                return 0;
            },
            sortOrder: props.sortedInfo?.columnKey === 'name' &&
                props.sortedInfo.order,
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
                        <div><img src="images/lock.jpg" alt="" /></div>
        }
    ];

    // const InitialPropA= useRef();
    // useEffect(() => {
    //     props.getTagNames();
    // }, [props.getTagNames(), InitialPropA]);

    useEffect(() => {
        props.getTagNames();
    }, [])

    return (
        <Layout className="layout">
            <Form
                // ref={refSearch}
                initialValues={{
                    SearchInput: ''
                }}
            >
                <Content style={{ padding: '10px 10px' }}>
                    <Form.Item
                        name={'SearchInput'}
                    >
                        <Search
                            className={props.query !== '' ? 'empty-search' : ''}
                            onKeyUpCapture={(e: any) => {
                                const query: string = e.target.value;
                                props.setStateFilteredToolsToState(
                                    store.getState().toolPage.tools?.filter(
                                        (tool: Tool) => tool.name.toLowerCase().includes(query)
                                    )
                                )
                                props.setStateQueryToState(query);
                            }}
                        />
                    </Form.Item>
                </Content>
                <Content style={{ padding: '10px 10px' }}>
                    {
                        <Table
                            pagination={false}
                            loading={props.tools?.length ? false : true}
                            columns={columns}
                            dataSource={props.filteredTools}
                            onChange={props.handleChange}
                            rowKey="key"
                        />
                    }
                </Content>
            </Form>
        </Layout>
    )
}

let mapStateToProps = (state: any) => {
    return {
        tools: state.toolPage?.tools,
        filteredTools: state.toolPage?.filteredTools,
        query: state.toolPage?.query,
        sortedInfo: state.toolPage?.sortedInfo,
    }
}

export const ToolsPageContainer = connect(mapStateToProps,
    { handleChange, setStateToolsToState, setStateQueryToState, getTagNames, setStateFilteredToolsToState })(ToolsPage)