var variable_content = '<tr><th class="scene_desc" colspan="3">数据</th></tr><tr><td class="symbol"><img src="variable_dist.svg" /></td><td>连接 T 中节点的边的权重最小值</td><td class="code">dist</td></tr><tr><td class="symbol"><img src="variable_parent.svg" /></td><td>在最小生成树中的父节点</td><td class="code">parent</td></tr><tr><td class="symbol"><img src="variable_weight.svg" /></td><td>节点之间的距离</td><td class="code">weight</td></tr>';
var formula_content = '<tr><th class="scene_desc" colspan="3">起点的确定和初始化</th></tr><tr><td class="symbol"><img src="formula_source.svg" /></td><td>选择任意节点作为起点，将其初始化为 0</td><td class="code"></td></tr><tr><td class="symbol"><img src="formula_others.svg" /></td><td>将其他节点的 dist 初始化为大值</td><td class="code"></td></tr><tr><th class="scene_desc" colspan="3">最小生成树的构建</th></tr><tr><td class="symbol"><img src="formula_select.svg" /></td><td>寻找 dist 最小的节点</td><td class="code"># find minimum</td></tr><tr><td class="symbol"><img src="formula_u.svg" /></td><td>指向权重最小的节点</td><td class="code">u</td></tr><tr><td class="symbol"><img src="formula_v.svg" /></td><td>更新节点的 dist 和 parent</td><td class="code">dist[v] &larr; weight[u][v]<br>parent[v] &larr; u</td></tr><tr><td class="symbol"><img src="formula_edges.svg" /></td><td>表示最小生成树的临时边</td><td class="code">(v, parent[v])</td></tr><tr><td class="symbol"><img src="formula_finished.svg" /></td><td>扩展最小生成树的范围</td><td class="code">将 u 加入 T</td></tr><tr><th class="scene_desc" colspan="3">最小生成树的输出</th></tr><tr><td class="symbol"><img src="formula_all.svg" /></td><td>从父节点信息开始构建最小生成树</td><td class="code"></td></tr>';
