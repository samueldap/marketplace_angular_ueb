public class GraphAdjMatrix {
    private int[][] adjacencyMatrix;
    private int nodes;

    public GraphAdjMatrix(int nodes) {
        this.nodes = nodes;
        adjacencyMatrix = new int[nodes][nodes];
    }

    public void addEdge(int u, int v) {
        adjacencyMatrix[u][v] = 1;
        adjacencyMatrix[v][u] = 1; 
    }

    public void printGraph() {
        System.out.println("Adjacency Matrix:");
        for (int i = 0; i < nodes; i++) {
            for (int j = 0; j < nodes; j++) {
                System.out.print(adjacencyMatrix[i][j] + " ");
            }
            System.out.println();
        }
    }
}
