var variable_content = '<tr><th class="scene_desc" colspan="3">数据</th></tr><tr><td class="symbol"><img src="variable_P.svg" /></td><td>素数表，如果表中 P[i] 为 1，说明 i 为素数。</td><td class="code">P</td></tr>';
var formula_content = '<tr><th class="scene_desc" colspan="3">初始化</th></tr><tr><td class="symbol"><img src="formula_ini.svg" /></td><td>将大于等于 2 的数作为候选素数，进行初始化</td><td class="code"></td></tr><tr><th class="scene_desc" colspan="3">删除 2 的倍数</th></tr><tr><td class="symbol"><img src="formula_s.svg" /></td><td>将 2 的倍数作为合数</td><td class="code">P[j] &larr; 0</td></tr><tr><th class="scene_desc" colspan="3">删除奇数素数的倍数</th></tr><tr><td class="symbol"><img src="formula_decision.svg" /></td><td>剩下的数仍作为素数</td><td class="code">i</td></tr><tr><td class="symbol"><img src="formula_s.svg" /></td><td>已删除的素数的倍数作为合数</td><td class="code">P[j] &larr; 0</td></tr><tr><td class="symbol"><img src="formula_valid.svg" /></td><td>确定素数表</td><td class="code">区间[0, i*i]</td></tr><tr><th class="scene_desc" colspan="3">输出素数列表</th></tr><tr><td class="symbol"><img src="formula_prime.svg" /></td><td>列举素数</td><td class="code"></td></tr>';