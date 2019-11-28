function Hook(hook) {
    this.next = null;
    this.data = hook;
    this.prev = null
}

export function DoublyLinkedList(headNode, tailNode) {
    const head = Symbol('head');
    const tail = Symbol('tail');

    this[head] = headNode;
    this[tail] = tailNode;
    this.getCurrent = () => {
        let current = this[head];
        while (!current.data[0]) {
            if (current.next) {
                current = current.next
            } else return null
        }
        return current
    }
}

export const prepareHooksForSteppers = (array) => {

    let listsNodes = [];
    array.forEach((hook) => {
        listsNodes.push(new Hook(hook))
    });
    listsNodes.forEach((node, ind) => {
        node.prev = ind !== 0 ? listsNodes[ind - 1] : null;
        node.next = ind !== listsNodes.length - 1 ? listsNodes[ind + 1] : null;
    });

    return new DoublyLinkedList(listsNodes[0], listsNodes[listsNodes.length - 1])
};