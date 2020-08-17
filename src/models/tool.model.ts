export interface Tool {
    id: number;
    name: string;
    sites: number;
    type: string;
    status: string;
}

export interface ToolsPageProps {
    tools: Tool[];
    filteredTools: Tool[];
    query: string;
    sortedInfo: any;
    handleChange: (pagination: any, filters: any, sorter: any) => void;
    setStateFilteredToolsToState: (toolsData: Tool[]) => void;
    setStateQueryToState: (query: string) => void;
    getTagNames: () => void;
}