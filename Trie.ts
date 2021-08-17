interface TrieNode {
    done: boolean;
    nodes: TrieNode[];
}

class Trie {
    private static readonly NUM_KEYS = 256
    private masterNode: TrieNode
    constructor() {
        this.masterNode = this.createNode(false)
    }
    private createNode(done: boolean): TrieNode {
        return { done, nodes: new Array(Trie.NUM_KEYS) }
    }
    private checkKey(char: number) {
        if (char < 0 || char > Trie.NUM_KEYS) {
            throw new RangeError('Character code out of range')
        } 
    }
    public insert(value: string) {
        this.insertRec(this.masterNode, value)
    }
    private insertRec(node: TrieNode, value: string) {
        if (!value.length) {
            node.done = true
            return
        }
        const key = value.charCodeAt(0)
        this.checkKey(key)
        if (node.nodes[key] === undefined) {
            node.nodes[key] = this.createNode(false)
        }
        this.insertRec(node.nodes[key], value.substr(1))
    }
    public search(value: string): boolean {
        return this.searchRec(this.masterNode, value)
    }
    private searchRec(node: TrieNode, value: string): boolean {
        if (!value.length) {
            return node.done
        }
        const key = value.charCodeAt(0)
        this.checkKey(key)
        if (node.nodes[key] === undefined) {
            return false
        }
        return this.searchRec(node.nodes[key], value.substr(1))
    }
}
