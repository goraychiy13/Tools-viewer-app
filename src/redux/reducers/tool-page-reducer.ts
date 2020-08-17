import axios from "axios";
import { Tool } from "../../models/tool.model";
import { SET_STATE_TOOLS_DATA, SET_STATE_SORTED_INFO, SET_STATE_FILTERED_TOOLS_DATA, SET_STATE_QUERY } from "./actions"

export interface ToolsState {
    tools: Tool[];
    filteredTools: Tool[];
    query: string;
    sortedInfo: any;
}

let initialState: ToolsState = {
    tools: [],
    filteredTools: [],
    query: '',
    sortedInfo: []
}

const toolPageReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_STATE_TOOLS_DATA:
            return {
                ...state,
                tools: action.payload,
                filteredTools: action.payload
            }
        case SET_STATE_SORTED_INFO:
            return {
                ...state,
                sortedInfo: action.payload
            }
        case SET_STATE_FILTERED_TOOLS_DATA:
            return {
                ...state,
                filteredTools: action.payload
            }
        case SET_STATE_QUERY:
            return {
                ...state,
                query: action.payload
            }
        default:
            return state;
    }
}

const setStateTools = (toolsData: Tool[]) => (
    { type: SET_STATE_TOOLS_DATA, payload: toolsData }
)
const setStateSortedInfo = (pagination: number, filters: any, sorter: any) => (
    { type: SET_STATE_SORTED_INFO, payload: sorter }
)
const setStateQuery = (query: string) => (
    { type: SET_STATE_QUERY, payload: query }
)
const setStateFilteredTools = (toolsData: Tool[]) => (
    { type: SET_STATE_FILTERED_TOOLS_DATA, payload: toolsData }
)

export const handleChange = (pagination: number, filters: any, sorter: any) => (dispatch: any) => {
    dispatch(setStateSortedInfo(pagination, filters, sorter));
};
export const setStateToolsToState = (toolsData: Tool[]) => (dispatch: any) => {
    dispatch(setStateTools(toolsData))
}
export const setStateFilteredToolsToState = (toolsData: Tool[]) => (dispatch: any) => {
    dispatch(setStateFilteredTools(toolsData))
}
export const setStateQueryToState = (query: string) => (dispatch: any) => {
    dispatch(setStateQuery(query));
}
export const getTagNames = () => (dispatch: any) => {
    const options = {
        headers: {
            "Accept": "application/json"
        }
    }
    axios.get('https://jsoneditoronline.herokuapp.com/v1/docs/a60440dc240e45afa65fa68a060af624', options)
        .then(
            (response: any) => {
                const tools: Tool[] = JSON.parse(response.data.data.replace(/(?:\r\n|\r|\n)/g, ''));
                dispatch(setStateTools(tools.map((tool: Tool) => {
                    return {
                        ...tool,
                        key: tool.id
                    }
                })));
            }
        ).catch(
            (error: any) => {
                console.log(error)
            }
        )
}

export default toolPageReducer