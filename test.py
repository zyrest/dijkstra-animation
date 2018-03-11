# print(float('inf') < 999999999999999999999999999999)
#
# my_list = [[float('inf')] * 3] * 4
# print(my_list)
#
# my_list[0][0] = 11
# print(my_list)


def test_matrix_network():
    Maxx = float("inf")
    from algorithm.data_stuct import MatrixDirectNetwork, Edge

    netwk = MatrixDirectNetwork(5)
    e = Edge(2, 2, 999999)
    netwk.add_edit_edge(e)

    e.start = 3
    e.end = 4
    e.value = 88
    netwk.add_edit_edge(e)

    netwk.show()
    print()

    e.start = 2
    e.end = 2
    e.value = Maxx
    netwk.delete_edge(e)
    netwk.show()


def test_list():
    a = [list() for i in range(12)]

    a[0].append("nihao")
    a[1].append(9642)

    a[8].append('bullshit')

    a[10].append((1, 3, 6))
    a[10].append("blablabla")

    print(a[10][0][6])


if __name__ == '__main__':
    flags = [False] * 11
    flags[0] = True
    for index, value in enumerate(flags):
        print('{}: is {}'.format(index, value))
    # test_matrix_network()
