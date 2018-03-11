from abc import ABCMeta, abstractclassmethod

MAX_INF = float('inf')


class Edge:
    def __init__(self, start, end, value=0):
        self.start = start
        self.end = end
        self.value = value

    def set_value(self, value):
        self.value = value


class DirectNetwork(metaclass=ABCMeta):

    @abstractclassmethod
    def add_edit_edge(self, edge):
        pass

    @abstractclassmethod
    def delete_edge(self, edge):
        pass

    @abstractclassmethod
    def is_edge_exist(self, edge):
        pass

    @abstractclassmethod
    def get_edge_value(self, edge):
        pass


class MatrixDirectNetwork(DirectNetwork):

    def __init__(self, n):
        self.pts = n
        self.matrix = [([MAX_INF] * n) for i in range(n)]
        for i in range(n):
            self.matrix[i][i] = 0

    def add_edit_edge(self, edge):
        start = edge.start - 1
        end = edge.end - 1
        value = edge.value

        if not self.__is_edge_valid(edge):
            print("请输入正确的起始点！")
            return

        if value < 0:
            print("请确保边的值为正数")
            return

        self.matrix[start][end] = value

    def delete_edge(self, edge):
        if not self.is_edge_exist(edge):
            print("该边不存在，无需删除")
            return

        if not self.__is_edge_valid(edge):
            print("请输入正确的起始点！")
            return

        start = edge.start - 1
        end = edge.end - 1
        self.matrix[start][end] = MAX_INF

    def is_edge_exist(self, edge):
        start = edge.start - 1
        end = edge.end - 1

        return self.matrix[start][end] != MAX_INF

    def get_edge_value(self, edge):
        if not self.is_edge_exist(edge):
            print("该边不存在，无法获得value")
            return

        if not self.__is_edge_valid(edge):
            print("请输入正确的起始点！")
            return

        start = edge.start - 1
        end = edge.end - 1
        return self.matrix[start][end]

    def __is_edge_valid(self, edge):
        start = edge.start - 1
        end = edge.end - 1

        return 0 <= start < self.pts and 0 <= end < self.pts

    def show(self):
        for row in self.matrix:
            for one in row:
                print("%-7s" % one, end=" ")
            print()


class ListDirectNetwork(DirectNetwork):

    def __init__(self, n):
        self.pts = n
        self.list_array = [list() for i in range(n)]

    def add_edit_edge(self, edge):
        start = edge.start - 1
        end = edge.end - 1
        value = edge.value

        self.list_array[start].append((end, value))

    def delete_edge(self, edge):
        start = edge.start - 1
        end = edge.end - 1

        for index, one_list in enumerate(self.list_array[start]):
            if one_list[0] == end:
                self.list_array[start].remove(self.list_array[start][index])

    def is_edge_exist(self, edge):
        start = edge.start - 1
        end = edge.end - 1

        for one_list in self.list_array[start]:
            if one_list[0] == end:
                return True

        return False

    def get_edge_value(self, edge):
        if not self.is_edge_exist(edge):
            print("边不存在，请确认后")
            return

        start = edge.start - 1
        end = edge.end - 1

        for one_list in self.list_array[start]:
            if one_list[0] == end:
                return one_list[1]
