from .data_stuct import *


def matrix_dijkstra(start_pts, matrix_net):
    matrix = matrix_net.matrix
    pts = matrix_net.pts

    # 初始化
    dis = [MAX_INF] * pts  # 初始化起点到各个点的距离
    flags = [False] * pts  # 是否到过某点
    dis[start_pts] = 0
    flags[start_pts] = True
    for end, value in enumerate(matrix[start_pts]):
        dis[end] = value

    while False in flags:
        min_dist = MAX_INF
        min_index = 0
        # 找到一个最小的，去松弛其他点
        for index, one in enumerate(dis):
            # 使用过该点，跳过
            if flags[index]:
                continue
            # 更新min_dist
            if one < min_dist:
                min_dist = one
                min_index = index
        # 使用最小点去松弛其他点
        flags[min_index] = True
        for inx, one_to_other in enumerate(matrix[min_index]):
            if one_to_other + dis[min_index] < dis[inx]:
                dis[inx] = one_to_other + dis[min_index]


def linear_dijkstra(start_pts, linear_net):
    linear = linear_net.list_array
    pts = linear_net.pts

    # 初始化
    dist = [MAX_INF] * pts
    flags = [False] * pts
    dist[start_pts] = 0
    flags[start_pts] = True
    for one in linear[start_pts]:
        dist[one[0]] = one[1]

    # 寻找最小点松弛其他点
    while False in flags:
        min_dist = MAX_INF  # 目前距离start最小点的距离值
        min_index = 0       # 目前距离start最小点的index

        for index, di in enumerate(dist):
            if flags[index]:
                continue
            if di < min_dist:
                min_dist = di
                min_index = index

        flags[min_index] = True
        for one_to_other in linear[min_index]:  # 每一个由min_index可以到达的点 -> one_to_other[0]
            st_to_end = dist[one_to_other[0]]   # 松弛前的距离值
            if min_dist + one_to_other[1] < st_to_end:
                dist[one_to_other[0]] = min_dist + one_to_other[1]  # 更新
