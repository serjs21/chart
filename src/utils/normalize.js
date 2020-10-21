export const normalizeData = (data) => {
    return data.map((item, idx) => {
        const name = idx.toString();
        const filteredData = Object.entries(item)
                            .filter(([key, value]) => key.startsWith('segment'))
                            .reduce((sum, [key, value]) => {
                                    sum[key] = value;
                                    return sum;
                                }, {});
        return {name, ...filteredData}
    })
}