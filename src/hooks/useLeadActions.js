import { useCallback } from "react";

export function useLeadActions(setData, updateFilter) {

    const onToggleLeadActive = useCallback((row) => {
        setData((prev) => {
            const index = prev.findIndex((item) => item.id === row.id);
            if (index === -1) return prev;
            const newData = [...prev];
            newData[index] = { ...newData[index], Reject: !newData[index].Reject };
            return newData;
        });
    }, []);

    const onDeleteLead = useCallback((row) => {
        setData((prevData) => prevData.filter((item) => item.id !== row.id));
    }, []);

    const onEditLead = useCallback((row, updatedData) => {
        setData((prevData) =>
            prevData.map((item) =>
                item.id === row.id ? { ...item, ...updatedData } : item
            )
        );
    }, []);

    return {
        onToggleLeadActive,
        onDeleteLead,
        onEditLead,
    };
}
