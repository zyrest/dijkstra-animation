# print(float('inf') < 999999999999999999999999999999)
#
# my_list = [[float('inf')] * 3] * 4
# print(my_list)
#
# my_list[0][0] = 11
# print(my_list)

from algorithm.data_stuct import *
from algorithm import dijkstra


def test_matrix_network():
    Maxx = float("inf")
    netwk = MatrixDirectNetwork(5)

    e = Edge(2, 3, 999999)
    netwk.add_edit_edge(e)

    e.start = 3
    e.end = 4
    e.value = 88
    netwk.add_edit_edge(e)

    netwk.show()
    print()

    e.start = 2
    e.end = 3
    e.value = Maxx
    netwk.delete_edge(e)
    netwk.show()


def test_list():
    netwk = ListDirectNetwork(5)

    e = Edge(2, 2, 999999)
    netwk.add_edit_edge(e)

    e = Edge(3, 2, 555)
    netwk.add_edit_edge(e)

    e = Edge(3, 2)
    print(netwk.get_edge_value(e))
    netwk.show()


def test_dijkstra():
    netwk = MatrixDirectNetwork(5)

    e = Edge(1, 2, 1)
    netwk.add_edit_edge(e)

    e = Edge(1, 5, 13)
    netwk.add_edit_edge(e)

    e = Edge(2, 3, 20)
    netwk.add_edit_edge(e)

    e = Edge(2, 5, 99)
    netwk.add_edit_edge(e)

    e = Edge(3, 1, 9)
    netwk.add_edit_edge(e)

    e = Edge(3, 4, 3)
    netwk.add_edit_edge(e)

    e = Edge(5, 3, 10)
    netwk.add_edit_edge(e)

    dijkstra.matrix_dijkstra(1, netwk)


if __name__ == '__main__':
    test_dijkstra()
    # test_matrix_network()
