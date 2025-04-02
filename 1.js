const tree = [
    {
        id: '1',
        label: '1',
        children: [
            { id: '1-1', label: '1-1' },
            { id: '1-2', label: '1-2' },
            { id: '1-3', label: '1-3' },
        ],
    },
    {
        id: '2',
        label: '2',
        children: [
            { id: '2-1', label: '2-1' },
            { id: '2-2', label: '2-2' },
            { id: '2-3', label: '2-3' },
        ],
    },
]

const flatTree = tree => {
    const res = []
    const arr = []

    tree.forEach(parent => {
        res.push({ id: parent.id, label: parent.label })

        arr.push({ list: parent.children, id: parent.id })
    })

    arr.forEach(li => {
        const { id, list } = li

        res.push(
            ...list.map(child => {
                return {
                    ...child,
                    parentId: id,
                }
            })
        )
    })

    return res
}

const flat = flatTree(tree)

console.log(flat)
